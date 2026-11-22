// Builds article.html from article.md: the prose goes through marked, and each figure table
// becomes a <figure>; the comparisons become interactive widgets (a divider to drag, and a
// choice of the builds compared). The page reads its figures from images/ beside it; with
// --inline every image is written into the page, so article.html stands alone as one file.
// Usage: node build.mjs <folder-with-node_modules> [--inline]     (it supplies `marked`)
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = process.argv[2];
const { marked } = createRequire(path.resolve(repo, "package.json"))("marked");

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
const inline = (src) => {
	if (!process.argv.includes("--inline")) return src;
	const bytes = readFileSync(path.join(here, src));
	return `data:${src.endsWith(".svg") ? "image/svg+xml" : "image/png"};base64,${bytes.toString("base64")}`;
};

/** A comparison widget. `config` is read by the page's script from the data attribute. */
const compare = (id, options, left, right, caption) => {
	const config = { options: options.map(({ key, label, long }) => ({ key, label, long })), images: Object.fromEntries(options.map((o) => [o.key, inline(o.src)])), left, right };
	return `<figure class="wide compare" id="${id}" data-config="${esc(JSON.stringify(config))}">
<div class="controls"></div>
<div class="stage" data-mode="slider">
  <div class="layer right"><span class="tag"></span><img alt=""></div>
  <div class="layer left"><span class="tag"></span><img alt=""></div>
  <div class="divider" aria-hidden="true"><span></span></div>
  <input class="range" type="range" min="0" max="100" value="50" step="0.5" aria-label="Position of the divider between the two builds">
</div>
<figcaption>${caption}</figcaption>
</figure>`;
};
const image = (src, alt, caption) => `<figure class="wide"><img src="${inline(src)}" alt="${esc(alt)}"><figcaption>${caption}</figcaption></figure>`;

const TABLES = [
	{ key: "before", label: "Before", long: "Before: cells as typed", src: "images/table-before.png" },
	{ key: "a", label: "A. Editor's parser", long: "A. Cells from the editor's parser", src: "images/table-parser.png" },
	{ key: "b", label: "B. marked", long: "B. Cells drawn by marked", src: "images/table-marked.png" },
	{ key: "c", label: "C. HTML", long: "C. HTML cells", src: "images/table-html.png" },
];
const LIVE = [
	{ key: "before", label: "Before", long: "Before: no change", src: "images/live-before.png" },
	{ key: "a", label: "A. Editor's parser", long: "A. The page draws markdown", src: "images/live-parser.png" },
	{ key: "c", label: "C. HTML + prompt", long: "C. Told to write HTML", src: "images/live-html.png" },
	{ key: "d", label: "D. Prompt only", long: "D. Told to write plain cells", src: "images/live-plain.png" },
];
const FENCES = [
	{ key: "before", label: "Before", long: "Before: fence lines shown", src: "images/fence-before.png" },
	{ key: "after", label: "After", long: "After: fence lines hidden", src: "images/fence-after.png" },
];
const HINT = "Drag the divider, or pick other builds to compare.";

// One entry per figure table in article.md, in order. `c` is that table's caption.
const figures = [
	(c) => compare("fig-1", TABLES.slice(0, 2), "before", "a", `${c} Drag the divider.`),
	(c) => compare("fig-2", TABLES, "before", "c", `${c} ${HINT}`),
	(c) => image("images/eval-compliance.svg", "Bar chart of answers that followed each rule, out of 18: no instruction 0, plain cells 18, HTML first wording 1, HTML final wording 13", c),
	(c) => compare("fig-4", LIVE, "a", "d", `${c} ${HINT}`),
	(c) => compare("fig-5", FENCES, "before", "after", `${c} Drag the divider.`),
];

let n = 0;
const md = readFileSync(path.join(here, "article.md"), "utf8").replace(/<table>[\s\S]*?<\/table>\n/g, (table) => {
	const caption = /<sub>([\s\S]*?)<\/sub>/.exec(table)?.[1] ?? "";
	return `\n${figures[n++](caption)}\n`;
});
if (n !== figures.length) throw new Error(`expected ${figures.length} figures, found ${n}`);

// A link to another article's markdown is a link to its page here.
const body = marked.parse(md).replace(/(href="\.\.\/[\w-]+\/article)\.md"/g, '$1.html"').replace(/<p><em>(Divergenz\.[^<]*)<\/em><\/p>/, '<p class="byline">$1</p>');

const css = `
:root{--ink:#16181d;--ink2:#5b6068;--line:#e3e4e8;--paper:#fff;--wash:#f5f6f8;--accent:#2563eb}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--paper);color:var(--ink);font:19px/1.65 "Iowan Old Style",Charter,"Palatino Linotype",Georgia,serif}
main{max-width:720px;margin:0 auto;padding:72px 24px 120px}
h1,h2,h3,figcaption,.controls,.tag,.byline,table{font-family:-apple-system,BlinkMacSystemFont,"Inter","Segoe UI",Helvetica,Arial,sans-serif}
h1{font-size:44px;line-height:1.1;letter-spacing:-.02em;margin:0 0 16px;font-weight:700}
h2{font-size:27px;line-height:1.2;letter-spacing:-.01em;margin:64px 0 14px;font-weight:700}
.byline{color:var(--ink2);font-size:15px;margin:0 0 40px}
p,ul,ol{margin:0 0 20px}
li{margin-bottom:8px}
a{color:var(--accent);text-decoration-thickness:1px;text-underline-offset:3px}
code{font:.82em/1.4 ui-monospace,"SF Mono",Menlo,monospace;background:var(--wash);padding:2px 5px;border-radius:4px}
main>table{border-collapse:collapse;width:min(1040px,calc(100vw - 32px));margin:28px 0 28px 50%;transform:translateX(-50%);font-size:15px;line-height:1.45;display:block;overflow-x:auto}
main>table th,main>table td{border-bottom:1px solid var(--line);padding:9px 12px;text-align:left;vertical-align:top}
main>table th{font-weight:600;border-bottom:2px solid var(--ink);white-space:nowrap}
main>table td:first-child{font-weight:600;color:var(--ink2)}
figure{margin:36px 0}
figure.wide{width:min(1040px,calc(100vw - 32px));margin-left:50%;transform:translateX(-50%)}
figure>img,.stage{display:block;width:100%;border:1px solid var(--line);border-radius:12px;background:#fff}
figcaption{font-size:14.5px;line-height:1.5;color:var(--ink2);margin-top:12px;max-width:720px}
figure.wide figcaption{margin-left:auto;margin-right:auto}
figcaption b{color:var(--ink)}
h2+figure{margin-top:24px}

.controls{display:flex;flex-wrap:wrap;gap:10px 22px;align-items:center;margin-bottom:12px;font-size:13.5px}
.group{display:flex;align-items:center;gap:8px}
.group>span{color:var(--ink2);font-weight:600;letter-spacing:.02em;text-transform:uppercase;font-size:11.5px}
.seg{display:inline-flex;background:var(--wash);border:1px solid var(--line);border-radius:9px;padding:2px}
.seg button{font:inherit;color:var(--ink2);background:none;border:0;border-radius:7px;padding:5px 11px;cursor:pointer;white-space:nowrap}
.seg button:hover{color:var(--ink)}
.seg button[aria-pressed=true]{background:#fff;color:var(--ink);font-weight:600;box-shadow:0 0 0 1px var(--line),0 1px 2px rgba(0,0,0,.06)}
.seg button:focus-visible,.range:focus-visible~.divider span{outline:2px solid var(--accent);outline-offset:2px}
.group.side-left .seg button[aria-pressed=true]{box-shadow:0 0 0 1.5px var(--ink)}
.group.side-right .seg button[aria-pressed=true]{box-shadow:0 0 0 1.5px var(--accent);color:var(--accent)}

.stage{position:relative;display:grid;overflow:hidden;--pos:50%}
.layer{grid-area:1/1;position:relative;background:#fff;min-width:0}
.layer img{display:block;width:100%;height:auto}
.stage[data-mode=slider] .layer.left{clip-path:inset(0 calc(100% - var(--pos)) 0 0)}
.tag{position:absolute;bottom:10px;z-index:2;font-size:12.5px;font-weight:600;padding:4px 10px;border-radius:999px;color:#fff;background:var(--ink);pointer-events:none}
.layer.left .tag{left:10px}
.layer.right .tag{right:10px;background:var(--accent)}
.divider{position:absolute;top:0;bottom:0;left:var(--pos);width:2px;margin-left:-1px;background:var(--ink);z-index:3;pointer-events:none}
.divider span{position:absolute;top:50%;display:block;width:36px;height:36px;margin:-18px 0 0 -17px;border-radius:50%;background:#fff;border:2px solid var(--ink);box-shadow:0 2px 8px rgba(0,0,0,.18)}
.divider span::before{content:"‹ ›";position:absolute;inset:0;display:grid;place-items:center;font:700 15px/1 -apple-system,Helvetica,sans-serif;color:var(--ink);letter-spacing:1px}
.range{position:absolute;inset:0;width:100%;height:100%;margin:0;opacity:0;cursor:ew-resize;z-index:4;touch-action:pan-y}
.stage[data-mode=side]{grid-template-columns:1fr 1fr;gap:0}
.stage[data-mode=side] .layer{grid-area:auto}
.stage[data-mode=side] .layer.left{order:-1;border-right:1px solid var(--line)}
.stage[data-mode=side] .divider,.stage[data-mode=side] .range{display:none}
.stage[data-mode=side] .tag{position:static;display:inline-block;margin:10px 0 6px 10px}
@media (max-width:640px){body{font-size:17.5px}h1{font-size:34px}main{padding-top:40px}}
@media print{.controls,.divider,.range{display:none}.stage{grid-template-columns:1fr 1fr}.stage .layer{grid-area:auto;clip-path:none!important}}
`;

const js = `
for (const fig of document.querySelectorAll("figure.compare")) {
	const cfg = JSON.parse(fig.dataset.config);
	const state = { left: cfg.left, right: cfg.right, mode: "slider" };
	const stage = fig.querySelector(".stage");
	const controls = fig.querySelector(".controls");
	const range = fig.querySelector(".range");
	const side = { left: fig.querySelector(".layer.left"), right: fig.querySelector(".layer.right") };

	const group = (title, cls, options, key) => {
		const g = document.createElement("div");
		g.className = "group " + cls;
		g.innerHTML = "<span>" + title + "</span>";
		const seg = document.createElement("div");
		seg.className = "seg";
		seg.setAttribute("role", "group");
		seg.setAttribute("aria-label", title);
		for (const o of options) {
			const b = document.createElement("button");
			b.type = "button";
			b.textContent = o.label;
			b.dataset.key = o.key;
			b.addEventListener("click", () => { state[key] = o.key; render(); });
			seg.append(b);
		}
		g.append(seg);
		controls.append(g);
		return () => { for (const b of seg.children) b.setAttribute("aria-pressed", String(b.dataset.key === state[key])); };
	};

	const syncs = [];
	if (cfg.options.length > 2) {
		syncs.push(group("Left", "side-left", cfg.options, "left"));
		syncs.push(group("Right", "side-right", cfg.options, "right"));
	}
	syncs.push(group("View", "", [{ key: "slider", label: "Slider" }, { key: "side", label: "Side by side" }], "mode"));

	function render() {
		for (const which of ["left", "right"]) {
			const option = cfg.options.find((o) => o.key === state[which]);
			const img = side[which].querySelector("img");
			img.src = cfg.images[option.key];
			img.alt = option.long;
			side[which].querySelector(".tag").textContent = option.long;
		}
		stage.dataset.mode = state.mode;
		for (const sync of syncs) sync();
	}
	range.addEventListener("input", () => stage.style.setProperty("--pos", range.value + "%"));
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
