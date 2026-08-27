import { chromium, devices } from "playwright";

const SHOTS = process.env.SHOTS_DIR ?? "C:\\Users\\User\\AppData\\Local\\Temp\\opencode\\setuseva-shots";
const BASE = process.env.BASE_URL ?? "http://localhost:3111";

async function main() {
  const b = await chromium.launch();
  const d = await b.newContext({ viewport: { width: 1280, height: 800 } });
  const dp = await d.newPage();
  await dp.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await dp.screenshot({ path: `${SHOTS}/new-landing-desktop.png`, fullPage: true });

  const m = await b.newContext({ ...devices["iPhone 13"] });
  const mp = await m.newPage();
  await mp.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await mp.screenshot({ path: `${SHOTS}/new-landing-mobile.png`, fullPage: true });
  await b.close();
  console.log("shots done");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
