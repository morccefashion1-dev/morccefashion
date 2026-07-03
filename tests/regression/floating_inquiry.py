"""Playwright regression: About 部分对齐 + Inquiry Now 浮动按钮不遮挡底部内容。

Usage:
    BASE_URL=http://localhost:8080 python3 tests/regression/floating_inquiry.py

Screenshots are written next to this file under __screenshots__/.
Exit code is non-zero if the floating "Inquiry Now" FAB overlaps the footer copyright
line at the bottom of the page on any viewport.
"""
import asyncio
import os
from pathlib import Path
from playwright.async_api import async_playwright

BASE_URL = os.environ.get("BASE_URL", "http://localhost:8080")
OUT = Path(__file__).parent / "__screenshots__"
OUT.mkdir(parents=True, exist_ok=True)

VIEWPORTS = [
    ("desktop", 1280, 1800),
    ("mobile", 375, 812),
]


def overlap(a, b) -> bool:
    ax2, ay2 = a["x"] + a["width"], a["y"] + a["height"]
    bx2, by2 = b["x"] + b["width"], b["y"] + b["height"]
    return not (ax2 <= b["x"] or a["x"] >= bx2 or ay2 <= b["y"] or a["y"] >= by2)


async def main() -> int:
    failures: list[str] = []
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True)
        try:
            for name, w, h in VIEWPORTS:
                ctx = await browser.new_context(viewport={"width": w, "height": h})
                page = await ctx.new_page()
                await page.goto(BASE_URL, wait_until="domcontentloaded")

                # About alignment screenshot
                await page.locator("#about").scroll_into_view_if_needed()
                await page.wait_for_timeout(300)
                await page.screenshot(path=str(OUT / f"{name}-about.png"))

                # Bottom-of-page: FAB must not overlap footer copyright
                await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                await page.wait_for_timeout(400)
                await page.screenshot(path=str(OUT / f"{name}-bottom.png"))

                fab = await page.locator('[aria-label="Inquiry"]').bounding_box()
                footer_copy = await page.locator("footer").get_by_text("©").bounding_box()
                print(f"{name}: fab={fab} footer_copy={footer_copy}")
                if fab and footer_copy and overlap(fab, footer_copy):
                    failures.append(f"{name}: FAB overlaps footer copyright line")

                await ctx.close()
        finally:
            await browser.close()

    if failures:
        print("FAIL:\n" + "\n".join(failures))
        return 1
    print("OK — screenshots at", OUT)
    return 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
