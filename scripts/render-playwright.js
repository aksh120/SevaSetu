const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function render() {
  let executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  if (!fs.existsSync(executablePath)) {
    executablePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
  }

  console.log('Launching browser from:', executablePath);
  const browser = await chromium.launch({
    executablePath,
    headless: true,
  });

  const page = await browser.newPage({
    viewport: { width: 1024, height: 1024 },
    deviceScaleFactor: 2,
  });

  const htmlPath1 = 'file:///' + path.resolve(__dirname, 'render-logo.html').replace(/\\/g, '/');
  console.log('Loading:', htmlPath1);
  await page.goto(htmlPath1, { waitUntil: 'networkidle' });
  await page.screenshot({
    path: path.resolve(__dirname, '../public/logo.png'),
    omitBackground: true,
  });
  console.log('Saved public/logo.png');

  const htmlPath2 = 'file:///' + path.resolve(__dirname, 'render-logo-text.html').replace(/\\/g, '/');
  console.log('Loading:', htmlPath2);
  await page.goto(htmlPath2, { waitUntil: 'networkidle' });
  await page.screenshot({
    path: path.resolve(__dirname, '../public/logo-with-tagline.png'),
    omitBackground: true,
  });
  console.log('Saved public/logo-with-tagline.png');

  // Also render a transparent background version
  const htmlPath3 = 'file:///' + path.resolve(__dirname, 'render-logo-transparent.html').replace(/\\/g, '/');
  if (fs.existsSync(path.resolve(__dirname, 'render-logo-transparent.html'))) {
    await page.goto(htmlPath3, { waitUntil: 'networkidle' });
    await page.screenshot({
      path: path.resolve(__dirname, '../public/logo-mark-transparent.png'),
      omitBackground: true,
    });
    console.log('Saved public/logo-mark-transparent.png');
  }

  await browser.close();
}

render().catch(err => {
  console.error(err);
  process.exit(1);
});
