// Renderiza um HTML local em PNG. Uso: node scripts/dev/render-html.mjs <arquivo.html> <saida.png> [largura]
import { chromium } from "@playwright/test";
const [, , file, out, w = "1400"] = process.argv;
const b = await chromium.launch(process.env.HTTPS_PROXY ? { proxy: { server: process.env.HTTPS_PROXY } } : {});
const p = await (await b.newContext({ viewport: { width: Number(w), height: 400 } })).newPage();
await p.goto("file://" + file, { waitUntil: "networkidle" });
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: out, fullPage: true });
await b.close();
