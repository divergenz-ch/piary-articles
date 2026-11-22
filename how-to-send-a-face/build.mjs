// Builds article.html from article.md: the prose and its tables go through marked, and the page
// carries its own styles, so article.html stands alone as one file with no images.
// Usage: node build.mjs <folder-with-node_modules>     (it supplies `marked`)
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const { marked } = createRequire(path.resolve(process.argv[2], "package.json"))("marked");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

const md = readFileSync(path.join(here, "article.md"), "utf8");
// A link to another article's markdown is a link to its page here.
const body = marked.parse(md).replace(/(href="\.\.\/[\w-]+\/article)\.md"/g, '$1.html"').replace(/<p><em>(Divergenz\.[^<]*)<\/em><\/p>/, '<p class="byline">$1</p>');

const css = `
:root{--ink:#16181d;--ink2:#5b6068;--line:#e3e4e8;--paper:#fff;--wash:#f5f6f8;--accent:#2563eb}
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:var(--paper);color:var(--ink);font:19px/1.65 "Iowan Old Style",Charter,"Palatino Linotype",Georgia,serif}
main{max-width:720px;margin:0 auto;padding:72px 24px 120px}
h1,h2,h3,.byline,table{font-family:-apple-system,BlinkMacSystemFont,"Inter","Segoe UI",Helvetica,Arial,sans-serif}
h1{font-size:44px;line-height:1.1;letter-spacing:-.02em;margin:0 0 16px;font-weight:700}
h2{font-size:27px;line-height:1.2;letter-spacing:-.01em;margin:64px 0 14px;font-weight:700}
h3{font-size:19px;line-height:1.3;margin:36px 0 10px;font-weight:700}
.byline{color:var(--ink2);font-size:15px;margin:0 0 40px}
p,ul,ol{margin:0 0 20px}
li{margin-bottom:8px}
a{color:var(--accent);text-decoration-thickness:1px;text-underline-offset:3px}
code{font:.82em/1.4 ui-monospace,"SF Mono",Menlo,monospace;background:var(--wash);padding:2px 5px;border-radius:4px}
pre{background:var(--wash);border:1px solid var(--line);border-radius:10px;padding:14px 16px;overflow-x:auto;margin:0 0 24px}
pre code{background:none;padding:0;font-size:14px;line-height:1.5;white-space:pre-wrap}
blockquote{margin:0 0 20px;padding:2px 0 2px 18px;border-left:3px solid var(--line);color:var(--ink2)}
main>table{border-collapse:collapse;width:min(1040px,calc(100vw - 32px));margin:28px 0 28px 50%;transform:translateX(-50%);font-size:15px;line-height:1.5;display:block;overflow-x:auto}
main>table th,main>table td{border-bottom:1px solid var(--line);padding:9px 12px;text-align:left;vertical-align:top}
main>table th{font-weight:600;border-bottom:2px solid var(--ink)}
main>table td:first-child{font-weight:600;color:var(--ink2)}
@media (max-width:640px){body{font-size:17.5px}h1{font-size:34px}main{padding-top:40px}}
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
</body>
</html>
`,
);
console.log("article.html written");
