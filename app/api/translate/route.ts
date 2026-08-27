import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";

const MAX_INPUT_LENGTH = 8000;

const DEFAULT_DEADLINE = "No deadline stated  -  but don’t leave it too long";

const SYSTEM_PROMPT = `You help first-time NGO founders in India understand government notices.

The user pastes the text of a notice (often legal or bureaucratic English). Translate it into plain, simple English for someone with no legal background.

Return STRICT JSON with exactly these three string fields and nothing else:
{
  "means": "1-2 sentences: what this notice actually means for their NGO",
  "do_next": "one concrete next action, starting with a verb",
  "deadline": "the deadline stated in the notice, quoted plainly"
}

Rules:
- Plain active-voice English. If a technical term is unavoidable, explain it in parentheses once.
- Respond in the same language the notice is written in (English notices get English output, Hindi notices get Hindi output).
- Never invent facts not present in the notice.
- If no deadline appears in the notice, set "deadline" to: "${DEFAULT_DEADLINE}"  -  translated into the notice's language if it is not English.`;

interface TranslationResult {
  means: string;
  do_next: string;
  deadline: string;
}

function parseResult(raw: string, strict: boolean): TranslationResult {
  const parsed = extractJson(raw, strict) as Partial<TranslationResult>;
  const result: TranslationResult = {
    means: typeof parsed.means === "string" && parsed.means.trim() ? parsed.means.trim() : "",
    do_next:
      typeof parsed.do_next === "string" && parsed.do_next.trim() ? parsed.do_next.trim() : "",
    deadline:
      typeof parsed.deadline === "string" && parsed.deadline.trim()
        ? parsed.deadline.trim()
        : DEFAULT_DEADLINE,
  };
  if (!result.means || !result.do_next) {
    throw new Error("model returned incomplete translation");
  }
  return result;
}

function extractJson(raw: string, strict: boolean): unknown {
  try {
    return JSON.parse(raw);
  } catch {
    if (strict) throw new Error("model output was not valid JSON");
    // Plain-text mode: models may wrap the JSON in prose or code fences.
    const cleaned = raw.replace(/```(?:json)?/gi, "");
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start === -1 || end === -1 || end <= start) {
      throw new Error("no JSON object found in model output");
    }
    return JSON.parse(cleaned.slice(start, end + 1));
  }
}

async function callModel(
  client: OpenAI,
  model: string,
  text: string,
  jsonMode: boolean
): Promise<TranslationResult> {
  const completion = await client.chat.completions.create({
    model,
    temperature: 0.2,
    ...(jsonMode ? { response_format: { type: "json_object" as const } } : {}),
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: text },
    ],
  });
  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error("empty completion");
  return parseResult(raw, jsonMode);
}

function badRequest(code: string) {
  return NextResponse.json({ error: code }, { status: 400 });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return badRequest("invalid_json");
  }

  const text =
    typeof (body as { text?: unknown })?.text === "string"
      ? ((body as { text: string }).text.trim())
      : "";
  if (!text) return badRequest("empty_text");
  if (text.length > MAX_INPUT_LENGTH) return badRequest("too_long");

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  // Provider-agnostic: any OpenAI-compatible endpoint works (OpenAI, Groq,
  // Cerebras, GitHub Models, Google's compat layer)  -  set OPENAI_BASE_URL +
  // OPENAI_MODEL to switch. Default: OpenAI itself.
  const baseURL = process.env.OPENAI_BASE_URL || undefined;
  const primaryModel = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const fallbackModel = process.env.OPENAI_FALLBACK_MODEL || undefined;

  try {
    const client = new OpenAI({ apiKey, baseURL });
    // Degradation chain: strict JSON on the primary model, then the fallback
    // model, then plain-text generation with JSON extraction  -  covers models
    // whose thinking modes break strict JSON validation (e.g. Qwen on Groq).
    const attempts: { model: string; jsonMode: boolean }[] = [
      { model: primaryModel, jsonMode: true },
      ...(fallbackModel && fallbackModel !== primaryModel
        ? [{ model: fallbackModel, jsonMode: true }]
        : []),
      { model: primaryModel, jsonMode: false },
      ...(fallbackModel && fallbackModel !== primaryModel
        ? [{ model: fallbackModel, jsonMode: false }]
        : []),
    ];

    let result: TranslationResult | undefined;
    let lastError: unknown;
    for (const attempt of attempts) {
      try {
        result = await callModel(client, attempt.model, text, attempt.jsonMode);
        break;
      } catch (err) {
        lastError = err;
        console.error(
          `[translator] attempt model="${attempt.model}" jsonMode=${attempt.jsonMode} failed:`,
          err instanceof Error ? err.message.slice(0, 160) : "unknown"
        );
      }
    }
    if (!result) throw lastError instanceof Error ? lastError : new Error("all attempts failed");
    return NextResponse.json(result);
  } catch (error) {
    console.error(
      "[translator] upstream call failed:",
      error instanceof Error ? `${error.name}: ${error.message.slice(0, 200)}` : "unknown error"
    );
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}
