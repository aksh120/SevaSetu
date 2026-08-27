# AI provider  -  free alternatives to the paid OpenAI API

The Notice Translator (`app/api/translate/route.ts`) speaks the **OpenAI-compatible
chat-completions format**, which nearly every major provider now exposes. Switching
provider is pure configuration  -  three env vars, no code change:

| Env var | Purpose | Default if unset |
|---|---|---|
| `OPENAI_API_KEY` | Secret key from the provider |  -  (translator reports "not configured") |
| `OPENAI_BASE_URL` | Provider's OpenAI-compatible endpoint | OpenAI's own API |
| `OPENAI_MODEL` | Model ID the provider expects | `gpt-4o-mini` |

## Privacy first: who trains on your data?

| Provider | Free tier | Trains on your prompts? |
|---|---|---|
| **Groq** ✅ recommended | 1,000–14,400 req/day, no card | **No  -  contractually prohibited**, free and paid alike; no retention by default |
| **Cerebras** | Free allowance has shifted toward $5 credits | No (terms exclude training on Service Content), but free tier is less sustainable now |
| **GitHub Models** | Lowest limits, uses existing GitHub PAT | GA traffic not used for training  -  verify current terms |
| **Google AI Studio (Gemini)** | Biggest quota (1,000–1,500 req/day) | **Yes, may train on free-tier prompts** (paid tier does not) |
| **Mistral free tier** | Generous | **Yes, free-tier data may be used for training** |
| **OpenRouter `:free` models** | ~50 req/day | Typically yes  -  free endpoints are usually training pipelines |

**Bottom line: if "never trains on my data" is the requirement, use Groq.**

## Recommended: Groq (verified Aug 2026)

- **No training, by contract:** Groq's data policy and Customer Data Processing
  Addendum state Groq "is not permitted to use Inputs or Outputs to train or
  fine-tune any AI model" unless you explicitly grant permission  -  and the policy
  is identical on the free tier (console.groq.com/docs/your-data).
- **No retention by default:** inference inputs/outputs aren't kept; only up-to-30-day
  troubleshooting/abuse logs, and self-serve Zero Data Retention exists in Data Controls.
- **Free tier, no credit card:** 1,000 req/day on `openai/gpt-oss-120b` and
  `qwen/qwen3.6-27b` (the two models this project uses), 30 req/min.
  Note: Groq retired the old `llama-3.x-*` model IDs in 2026  -  the current catalog
  is gpt-oss / qwen / compound families (console.groq.com/docs/models).
- **Degradation chain built in:** primary (JSON mode) → fallback (JSON mode) →
  primary plain-text → fallback plain-text with JSON extraction. Covers models
  whose thinking modes break strict JSON validation (e.g. Qwen on some inputs).
- **Key:** https://console.groq.com/keys

```env
OPENAI_BASE_URL=https://api.groq.com/openai/v1
OPENAI_MODEL=openai/gpt-oss-120b
OPENAI_FALLBACK_MODEL=qwen/qwen3.6-27b
OPENAI_API_KEY=...
```

## The rest, for completeness

- **Cerebras** (`https://api.cerebras.ai/v1`, llama-3.3-70b): no-training terms, very
  fast  -  but the free allowance moved to $5 credits in 2026, so it's no longer the
  sustainable free pick.
- **GitHub Models** (`https://models.github.ai/inference`, `openai/gpt-4o-mini`):
  free with a GitHub PAT, no new account; tightest rate limits. Reasonable fallback.
- **Google AI Studio** (`https://generativelanguage.googleapis.com/v1beta/openai/`,
  `gemini-2.0-flash`): biggest free quota and strongest model, but free-tier prompts
  may train Google's models  -  only acceptable if pasted notices are non-sensitive.
- **Mistral / OpenRouter free**: generous but train on free-tier data  -  avoid for
  this requirement.

## Sustainability note for the demo

A judge demo makes single-digit translator calls. Groq's free tier covers the entire
hackathon weekend many hundreds of times over, and the pre-loaded example notice
guarantees a reliable demo even if a daily cap is ever hit  -  the honest "not
configured / try again" fallbacks from Phase 3 cover the rest.
