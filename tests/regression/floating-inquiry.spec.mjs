// Playwright regression: About 部分对齐 + Inquiry Now 浮动按钮不遮挡底部内容
// 运行：BASE_URL=http://localhost:8080 node tests/regression/floating-inquiry.spec.mjs
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const BASE_URL = process.env.BASE_URL || "http://localhost:8080";
const OUT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), "__screenshots__");
mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORTS = [
  { name: "desktop", width: 1280, height: 1800 },
  { name: "mobile", width: 375, height: 812 },
];

function rectsOverlap(a, b) {
  return !(a.right <= b.left || a.left >= b.right || a.bottom <= b.top || a.top >= b.bottom);
}

const failures = [];

const browser = await chromium.launch({ headless: true });
try {
  for (const vp of VIEWPORTS) {
    const context = await browser.new_context
      ? await browser.new_context({ viewport: { width: vp.width, height: vp.height } })
      : await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });

    // Scroll to About and screenshot
    await page.locator("#about").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT_DIR}/${vp.name}-about.png` });

    // Scroll to bottom (footer) and check FAB does not overlap footer text
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT_DIR}/${vp.name}-bottom.png` });

    const fab = await page.locator('[aria-label="Inquiry"]').boundingBox();
    const footerCopy = await page.locator("footer >> text=/©/").boundingBox();

    if (fab && footerCopy && rectsOverlap(fab, footerCopy)) {
      failures.push(`${vp.name}: FAB overlaps footer copyright`);
    }
    console.log(`${vp.name}: fab=${JSON.stringify(fab)} footer=${JSON.stringify(footerCopy)}`);

    await context.close();
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error("FAIL:\n" + failures.join("\n"));
  process.exit(1);
}
console.log("OK — screenshots in", OUT_DIR);
