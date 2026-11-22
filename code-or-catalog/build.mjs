// Builds article.html from article.md: the prose goes through marked, and each figure table
// becomes a <figure>; the comparisons become interactive widgets (two answers side by side,
// with a choice of request, of answer and of the two implementations compared).
// Usage: node build.mjs <repo-root>     (the repo supplies `marked`)
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = process.argv[2];
const { marked } = createRequire(path.resolve(repo, "package.json"))("marked");

const IMPLS = [
	{ key: "baseline", label: "Free-hand cells", long: "Free-hand cells, as they were" },
	{ key: "self-made", label: "Kit", long: "Cells with our kit" },
	{ key: "self-composed", label: "Kit, taught", long: "Kit, taught the composition" },
	{ key: "a2ui", label: "A2UI", long: "A2UI surface" },
];
const REQUESTS = [
	{ key: "runway", label: "Runway", ask: "We have $480k in the bank, burn $38k a month, and revenue is $12k a month growing 8% month over month. When do we run out of money, and what changes if growth is 5% or 12%?" },
	{ key: "support-kpis", label: "Support desk", ask: "I run the support desk. This week: tickets opened 412 (last week 380), closed 398 (371), median first reply 2.4 h (3.1 h), CSAT 91% (88%), backlog 57 (43). Mon–Fri opened: 96, 88, 79, 81, 68. Give me something I can glance at every morning." },
	{ key: "compound-interest", label: "Compound interest", ask: "I teach a finance class for 16-year-olds and they don't get compound interest. Make something they can play with in class." },
	{ key: "survey", label: "Survey", ask: "Our onboarding survey, 212 answers, 1 = strongly disagree to 5 = strongly agree. “Setup was easy”: 1:9, 2:21, 3:38, 4:88, 5:56. “Docs answered my questions”: 1:31, 2:52, 3:61, 4:47, 5:21. “I would recommend us”: 1:6, 2:14, 3:40, 4:79, 5:73. Summarise this for my team meeting." },
];
const ATTEMPTS = ["1st", "2nd", "3rd"].map((label, i) => ({ key: String(i + 1), label }));

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

/**
 * A comparison widget over the individual answers. `sides` names what each side picks for
 * itself ("impl", or "request" and "attempt"); every other dimension is shared by both.
 */
const compare = (id, config, caption) => `<figure class="wide compare" id="${id}" data-config="${esc(
	JSON.stringify({ impls: IMPLS, requests: REQUESTS, attempts: ATTEMPTS, ...config }),
)}">
<div class="shared"></div>
<div class="pair">
  <div class="col" data-side="left"><div class="pick"></div><div class="frame"><img alt=""></div></div>
  <div class="col" data-side="right"><div class="pick"></div><div class="frame"><img alt=""></div></div>
</div>
<figcaption>${caption}</figcaption>
</figure>`;

const image = (src, alt, caption, wide = true) =>
	`<figure class="${wide ? "wide" : ""}"><img src="${src}" alt="${esc(alt)}" loading="lazy"><figcaption>${caption}</figcaption></figure>`;

// One entry per figure table in article.md, in order. `c` is that table's caption.
const figures = [
	(c) => image("images/fig-1-canvas.png", "A Piary document: the request as text, and the drawn answer in place under it", c, false),
	() =>
		compare("fig-2", {
			sides: ["request", "attempt"], fixed: { impl: "baseline" },
			left: { request: "support-kpis", attempt: "1" }, right: { request: "compound-interest", attempt: "1" },
		}, `<b>Figure 2. Free-hand answers, two at a time.</b> Every answer here was drawn by the same agent on the same day, as code it wrote for the occasion. Each is reasonable on its own; next to each other they share no palette, no type and no layout. Pick any two of the twelve with the buttons over each side. Most rendered like these, and 3 of our 18 showed a failing cell instead. The data in all our test requests is invented.`),
	(c) => image("images/fig-3-pairwise.png", "Blind pairwise preference across all comparisons", c),
	() =>
		compare("fig-4", {
			sides: ["impl"], left: { impl: "self-made" }, right: { impl: "a2ui" }, shared: { request: "survey", attempt: "1" },
		}, `<b>Figure 4. The same request, two ways of drawing.</b> Asked to summarise a survey, the kit drew a table; the A2UI answer opens with a headline, shows the figures that matter, charts the spread and closes with a takeaway. Change the request, or look at another of its three answers, and the A2UI side keeps that shape, which is what the judge meant by one design language.`),
	() =>
		compare("fig-5", {
			sides: ["impl"], left: { impl: "self-composed" }, right: { impl: "a2ui" }, shared: { request: "support-kpis", attempt: "1" },
		}, `<b>Figure 5. Before and after the teaching.</b> Once taught the composition, the kit adds a headline that states the finding and a takeaway, and when it renders it is hard to tell from A2UI. Set the left side to “Kit” to see what the teaching changed. Set the request to “Runway” or “Survey” to see where the taught kit broke.`),
	(c) => image("images/fig-6-broken-answers.png", "Number of answers that showed a failing cell, by way of drawing", c),
	(c) => image("images/fig-7-check-before-draw.png", "Diagram: free-hand code fails in front of the reader, a description is checked before it is drawn", c),
	(c) => image("images/fig-8-guide-cuts.png", "Guide size across the cutting steps", c),
];

let n = 0;
const md = readFileSync(path.join(here, "article.md"), "utf8").replace(/<table>[\s\S]*?<\/table>\n/g, (table) => {
	const caption = /<sub>([\s\S]*?)<\/sub>/.exec(table)?.[1] ?? "";
	return `\n${figures[n++](caption)}\n`;
});
if (n !== figures.length) throw new Error(`expected ${figures.length} figures, found ${n}`);

const body = marked.parse(md).replace(/<p><em>(Divergenz\.[^<]*)<\/em><\/p>/, '<p class="byline">$1</p>');

const css = `
:root{--ink:#16181d;--ink2:#5b6068;--line:#e3e4e8;--paper:#fff;--wash:#f5f6f8;--accent:#2563eb}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--paper);color:var(--ink);font:19px/1.65 "Iowan Old Style",Charter,"Palatino Linotype",Georgia,serif}
main{max-width:720px;margin:0 auto;padding:72px 24px 120px}
h1,h2,h3,figcaption,.byline{font-family:-apple-system,BlinkMacSystemFont,"Inter","Segoe UI",Helvetica,Arial,sans-serif}
h1{font-size:44px;line-height:1.1;letter-spacing:-.02em;margin:0 0 16px;font-weight:700}
h2{font-size:27px;line-height:1.2;letter-spacing:-.01em;margin:64px 0 14px;font-weight:700}
.byline{color:var(--ink2);font-size:15px;margin:0 0 40px}
p,ul,ol{margin:0 0 20px}
li{margin-bottom:8px}
a{color:var(--accent);text-decoration-thickness:1px;text-underline-offset:3px}
code{font:.82em/1.4 ui-monospace,"SF Mono",Menlo,monospace;background:var(--wash);padding:2px 5px;border-radius:4px}
pre{background:var(--wash);border:1px solid var(--line);border-radius:10px;padding:16px 18px;overflow:auto;margin:0 0 24px}
pre code{background:none;padding:0;font-size:14px}
figure{margin:36px 0}
figure.wide{--w:min(1040px,calc(100vw - 32px));width:var(--w);margin-left:calc(50% - var(--w) / 2)}
figure>img{display:block;width:100%;border:1px solid var(--line);border-radius:12px;background:#fff}
figcaption{font-size:14.5px;line-height:1.5;color:var(--ink2);margin-top:12px;max-width:720px}
figure.wide figcaption{margin-left:auto;margin-right:auto}
figcaption b{color:var(--ink)}
h2+figure{margin-top:24px}

.shared{display:flex;flex-wrap:wrap;gap:10px 28px;align-items:flex-end;margin-bottom:12px}
.shared:empty{display:none}
.ask{flex-basis:100%;font:14.5px/1.5 -apple-system,BlinkMacSystemFont,"Inter","Segoe UI",Helvetica,Arial,sans-serif;color:var(--ink);background:var(--wash);border-radius:10px;padding:10px 14px;margin:2px 0 0}
.pair{display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start}
.col{min-width:0}
.pick{display:flex;flex-wrap:wrap;gap:10px 20px;align-items:flex-end;margin-bottom:10px}
.frame{border:1px solid var(--line);border-radius:12px;overflow:hidden;background:#fff}
.frame img{display:block;width:100%;height:auto}
.group{display:grid;gap:4px;min-width:0;font:13.5px/1.3 -apple-system,BlinkMacSystemFont,"Inter","Segoe UI",Helvetica,Arial,sans-serif}
.group>span{color:var(--ink2);font-weight:600;font-size:12px}
.group>span small{font-weight:400;font-size:12px}
.seg{display:inline-flex;flex-wrap:wrap;background:var(--wash);border:1px solid var(--line);border-radius:9px;padding:2px;justify-self:start}
.seg button{font:inherit;color:var(--ink2);background:none;border:0;border-radius:7px;padding:5px 11px;cursor:pointer;white-space:nowrap}
.seg button:hover{color:var(--ink)}
.seg button[aria-pressed=true]{background:var(--ink);color:#fff;font-weight:600}
.seg button:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
@media (max-width:640px){.pair{grid-template-columns:1fr;gap:24px}}
@media print{.seg button:not([aria-pressed=true]){display:none}}
@media (max-width:640px){body{font-size:17.5px}h1{font-size:34px}main{padding-top:40px}}
`;

const js = `
const DIMS = {
	request: { title: "Request" },
	attempt: { title: "Answer", note: "each request was answered three times" },
	impl: { title: "Drawn with" },
};
for (const fig of document.querySelectorAll("figure.compare")) {
	const cfg = JSON.parse(fig.dataset.config);
	const lists = { request: cfg.requests, attempt: cfg.attempts, impl: cfg.impls };
	// What both sides share, and what each side picks for itself.
	const state = { shared: { ...cfg.fixed, ...cfg.shared }, left: { ...cfg.left }, right: { ...cfg.right } };
	const shared = fig.querySelector(".shared");
	const cols = { left: fig.querySelector("[data-side=left]"), right: fig.querySelector("[data-side=right]") };
	const syncs = [];
	const pick = (side) => ({ ...state.shared, ...state[side] });
	const same = () => cfg.sides.every((d) => state.left[d] === state.right[d]);

	// Two sides showing the same answer compare nothing: the side that was not touched moves on
	// to the next option of the last thing a side picks.
	const keepApart = (touched) => {
		if (!same()) return;
		const other = touched === "left" ? "right" : "left";
		const dim = cfg.sides[cfg.sides.length - 1];
		const keys = lists[dim].map((o) => o.key);
		state[other][dim] = keys[(keys.indexOf(state[other][dim]) + 1) % keys.length];
	};

	const group = (dim, label, get, set) => {
		const g = document.createElement("div");
		g.className = "group";
		const title = DIMS[dim].title + (DIMS[dim].note ? " <small>· " + DIMS[dim].note + "</small>" : "");
		g.innerHTML = "<span>" + title + "</span>";
		const seg = document.createElement("div");
		seg.className = "seg";
		seg.setAttribute("role", "group");
		seg.setAttribute("aria-label", label);
		for (const o of lists[dim]) {
			const b = document.createElement("button");
			b.type = "button";
			b.textContent = o.label;
			b.addEventListener("click", () => { set(o.key); render(); });
			seg.append(b);
			syncs.push(() => b.setAttribute("aria-pressed", String(get() === o.key)));
		}
		g.append(seg);
		return g;
	};

	for (const d of Object.keys(DIMS)) {
		if (cfg.sides.includes(d) || (cfg.fixed && d in cfg.fixed)) continue;
		shared.append(group(d, DIMS[d].title, () => state.shared[d], (k) => (state.shared[d] = k)));
	}
	const ask = document.createElement("p");
	ask.className = "ask";
	if (shared.children.length) shared.append(ask);
	for (const side of ["left", "right"]) {
		for (const d of cfg.sides) {
			cols[side].querySelector(".pick").append(
				group(d, (side === "left" ? "Left: " : "Right: ") + DIMS[d].title, () => state[side][d], (k) => { state[side][d] = k; keepApart(side); }));
		}
	}

	function render() {
		for (const side of ["left", "right"]) {
			const p = pick(side);
			const impl = cfg.impls.find((o) => o.key === p.impl);
			const request = cfg.requests.find((o) => o.key === p.request);
			const answer = cfg.attempts.find((o) => o.key === p.attempt);
			const img = cols[side].querySelector("img");
			img.src = "images/answers/" + p.request + "--r" + p.attempt + "--" + p.impl + ".png";
			img.alt = impl.long + ": the " + answer.label + " answer to the " + request.label.toLowerCase() + " request";
		}
		ask.textContent = cfg.requests.find((o) => o.key === pick("left").request).ask;
		for (const sync of syncs) sync();
	}
	render();
}
`;

const title = /^# (.+)$/m.exec(md)[1];
writeFileSync(
	path.join(here, "article.html"),
	`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<style>${css}</style>
</head>
<body>
<main>
${body}
</main>
<script>${js}</script>
</body>
</html>
`,
);
console.log(`article.html written, ${n} figures`);
