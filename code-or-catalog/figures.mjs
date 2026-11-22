// Renders the article's charts and its one diagram to PNG with Playwright's Chromium.
// Usage: node figures.mjs <repo-root> <out-dir>
import { createRequire } from "node:module";
import path from "node:path";

const [repo, out] = process.argv.slice(2);
const require = createRequire(path.resolve(repo, "package.json"));
const { chromium } = require("@playwright/test");

const INK = "#0b0b0b";
const INK2 = "#52514e";
const GRID = "#e4e3df";
const SURFACE = "#fcfcfb";
const BLUE = "#2a78d6";
const ORANGE = "#eb6834";
const TIE = "#c9c8c2";

const page = (body, width) => `<!doctype html><meta charset="utf-8"><style>
*{box-sizing:border-box}
body{margin:0;background:${SURFACE};font:15px/1.4 -apple-system,"Inter","Helvetica Neue",Arial,sans-serif;color:${INK}}
#fig{width:${width}px;padding:20px 32px 22px}
h1{font-size:20px;margin:0 0 4px;font-weight:650}
.sub{color:${INK2};margin:0 0 20px}
.note{color:${INK2};font-size:13px;margin:16px 0 0}
.legend{display:flex;gap:18px;margin:0 0 14px;color:${INK2};font-size:13px}
.legend i{display:inline-block;width:11px;height:11px;border-radius:3px;margin-right:6px;vertical-align:-1px}
</style><div id="fig">${body}</div>`;

// ---- Chart A: blind pairwise preference -------------------------------------------------
function pairwise() {
	const rows = [
		{ label: "A2UI vs cells as they were", sub: "18 pairs", a: 14, t: 1, b: 3 },
		{ label: "A2UI vs the kit", sub: "18 pairs", a: 16, t: 0, b: 2 },
		{ label: "A2UI vs the kit, taught the composition", sub: "18 pairs", a: 11, t: 3, b: 4, gap: true },
		{ label: "… where the kit's answer rendered", sub: "12 pairs", a: 5, t: 3, b: 4, indent: true },
		{ label: "… where the kit's answer broke", sub: "6 pairs", a: 6, t: 0, b: 0, indent: true },
	];
	const unit = 36; // px per pair
	const seg = (n, color, ink) =>
		n === 0
			? ""
			: `<div style="width:${n * unit - 2}px;margin-right:2px;background:${color};color:${ink};height:30px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-weight:650;font-size:14px">${n}</div>`;
	const body = rows
		.map(
			(r) => `<div style="display:flex;align-items:center;margin-top:${r.gap ? 22 : 10}px">
<div style="width:330px;padding-left:${r.indent ? 18 : 0}px"><div style="${r.indent ? `color:${INK2}` : "font-weight:550"}">${r.label}</div><div style="color:${INK2};font-size:12px">${r.sub}</div></div>
<div style="display:flex;position:relative;width:${18 * unit}px">${seg(r.a, BLUE, "#fff")}${seg(r.t, TIE, INK)}${seg(r.b, ORANGE, "#fff")}</div></div>`,
		)
		.join("");
	// The pre-registered threshold: 14 of 18 decisive wins.
	const rule = `<div style="position:absolute;left:${330 + 14 * unit - 1}px;top:0;bottom:0;border-left:1.5px dashed ${INK2}"></div>
<div style="position:absolute;left:${330 + 14 * unit + 8}px;top:-4px;font-size:12px;color:${INK2};width:120px;line-height:1.25">14 of 18: the rule<br>written beforehand</div>`;
	return page(
		`<div class="legend"><span><i style="background:${BLUE}"></i>A2UI preferred</span><span><i style="background:${TIE}"></i>Tie</span><span><i style="background:${ORANGE}"></i>The other side preferred</span></div>
<div style="position:relative;padding-top:34px">${rule}${body}</div>`,
		1060,
	);
}

// ---- Chart B: answers that showed a failing cell ---------------------------------------
function broken() {
	const rows = [
		["Cells as they were", 3],
		["Cells with the kit", 1],
		["Cells with the kit, taught the composition", 6],
		["A2UI surface", 0],
	];
	const unit = 30;
	const body = rows
		.map(
			([label, n]) => `<div style="display:flex;align-items:center;margin-top:12px">
<div style="width:330px;font-weight:550">${label}</div>
<div style="width:${18 * unit}px;display:flex;align-items:center">
<div style="width:${Math.max(n * unit, 2)}px;height:26px;background:${n ? BLUE : INK2};border-radius:${n ? "0 4px 4px 0" : 0}"></div>
<div style="margin-left:10px;font-weight:650">${n}<span style="font-weight:400;color:${INK2}"> of 18</span></div></div></div>`,
		)
		.join("");
	return page(
		`<div style="border-left:1.5px solid ${INK}; padding:2px 0 12px; margin-left:330px; position:relative"><div style="margin-left:-330px">${body}</div></div>`,
		1000,
	);
}

// ---- Chart C: the guide, cut one measured step at a time -------------------------------
function guide() {
	const pts = [
		["Start", 5609],
		["Cuts 1–5", 5074],
		["Step 6", 4657],
		["Step 7", 4441],
		["Step 8", 4313],
		["Step 9", 4267],
		["Final", 4478],
	];
	const W = 940, H = 380, L = 70, R = 30, T = 30, B = 46;
	const lo = 3000, hi = 6000;
	const x = (i) => L + (i * (W - L - R)) / (pts.length - 1);
	const y = (v) => T + ((hi - v) * (H - T - B)) / (hi - lo);
	const ticks = [3000, 4000, 5000, 6000];
	const grid = ticks
		.map(
			(t) =>
				`<line x1="${L}" x2="${W - R}" y1="${y(t)}" y2="${y(t)}" stroke="${GRID}"/><text x="${L - 10}" y="${y(t) + 4}" text-anchor="end" font-size="12" fill="${INK2}">${t.toLocaleString("en-US")}</text>`,
		)
		.join("");
	const line = pts.map(([, v], i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
	const dots = pts
		.map(
			([name, v], i) =>
				`<circle cx="${x(i)}" cy="${y(v)}" r="5" fill="${BLUE}" stroke="${SURFACE}" stroke-width="2"/>
<text x="${x(i)}" y="${y(v) - 12}" text-anchor="middle" font-size="13" font-weight="650" fill="${INK}">${v.toLocaleString("en-US")}</text>
<text x="${x(i)}" y="${H - 18}" text-anchor="middle" font-size="12" fill="${INK2}">${name}</text>`,
		)
		.join("");
	const target = `<line x1="${L}" x2="${W - R}" y1="${y(3600)}" y2="${y(3600)}" stroke="${INK2}" stroke-dasharray="5 4" stroke-width="1.5"/>
<text x="${W - R}" y="${y(3600) + 17}" text-anchor="end" font-size="12" fill="${INK2}">3,600: the target we set, and did not reach</text>`;
	return page(
		`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${grid}${target}<path d="${line}" fill="none" stroke="${BLUE}" stroke-width="2"/>${dots}</svg>`,
		1004,
	);
}

// ---- Diagram: where a mistake is caught -------------------------------------------------
function flow() {
	const box = (t, s, extra = "") =>
		`<div style="border:1.5px solid ${INK};border-radius:10px;padding:10px 14px;background:#fff;width:190px;${extra}"><div style="font-weight:650">${t}</div><div style="font-size:12.5px;color:${INK2};line-height:1.3">${s}</div></div>`;
	const arrow = (label = "") =>
		`<div style="flex:1;min-width:46px;text-align:center;font-size:12px;color:${INK2};position:relative;top:-9px">${label}<div style="border-top:1.5px solid ${INK};position:relative;margin-top:${label ? 2 : 20}px"><span style="position:absolute;right:-1px;top:-5.5px;border-left:8px solid ${INK};border-top:4.5px solid transparent;border-bottom:4.5px solid transparent"></span></div></div>`;
	const lane = (title, sub, inner) =>
		`<div style="margin-top:22px"><div style="font-weight:650;font-size:16px">${title}</div><div style="height:12px"></div><div style="display:flex;align-items:center">${inner}</div></div>`;
	const bad = `width:220px;border-color:${ORANGE};background:#fdf1ec;`;
	const good = `border-color:${BLUE};background:#eef4fc;`;
	return page(
		`${lane(
	"Free drawing: the agent writes code",
	"A cell is JavaScript. Nothing checks it until the page compiles and runs it.",
	box("Agent", "writes a cell: code, colours, layout") +
		arrow("code") +
		box("Document", "the cell is stored as written") +
		arrow() +
		box("Page runs it", "in the reader's window") +
		arrow("if it fails") +
		box("The reader sees the error", "in the real app the agent is then told, and gets up to three tries to repair it", bad),
)}
${lane(
	"A2UI: the agent sends a description",
	"A surface is data: which components, in what order, with which figures. No colour, no style, no code.",
	box("Agent", "describes a surface from the catalog") +
		arrow("JSON") +
		box("Check", "same catalog and validator the page draws with", good) +
		arrow("if it passes") +
		box("Document", "the description is stored") +
		arrow() +
		box("Page draws it", "with the app's own components and type"),
)}`,
		1090,
	);
}

const figures = { "fig-3-pairwise": pairwise(), "fig-7-check-before-draw": flow(), "fig-6-broken-answers": broken(), "fig-8-guide-cuts": guide() };
const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 1300, height: 900 } });
for (const [name, html] of Object.entries(figures)) {
	const p = await ctx.newPage();
	await p.setContent(html);
	await p.locator("#fig").screenshot({ path: path.join(out, `${name}.png`) });
	await p.close();
}
await browser.close();
