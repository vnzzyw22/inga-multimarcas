// Captura de tela para revisão visual. Uso: node scripts/dev/shot.mjs <rota> <largura> <altura> <saida.png> [full] (com `next start -p 3100` rodando)
import { chromium, devices } from "@playwright/test";
const [,, path, w, h, out, full] = process.argv;
const browser = await chromium.launch();
const ctx = await browser.newContext({ ...(Number(w) < 800 ? devices["Pixel 7"] : {}), viewport: { width: Number(w), height: Number(h) } });
const page = await ctx.newPage();
await page.goto("http://localhost:3100" + path, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
const info = await page.evaluate(() => {
  const b = document.querySelector('[aria-label="Abrir menu"]')?.getBoundingClientRect();
  return { sw: document.documentElement.scrollWidth, iw: innerWidth, btn: b && { x: b.x, y: b.y, w: b.width } };
});
console.log(JSON.stringify(info));
await page.screenshot({ path: out, fullPage: full === "full" });
await browser.close();
