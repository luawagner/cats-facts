// @ts-check CON PLAYWRAIGHT
import { test, expect } from "@playwright/test";
const CAT_PREFIX_IMG_URL = "https://cataas.com/";
const LOCALHOST_URL = "http://localhost:5173/";

test("app shows random facts and image", async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const text = await page.getByRole("paragraph");
  const image = await page.getByRole("img");

  const textContent = await text.textContent();
  const imageSrc = await image.getAttribute("src");

  await expect(textContent?.length).toBeGreaterThan(0);
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMG_URL)).toBeTruthy();
});
