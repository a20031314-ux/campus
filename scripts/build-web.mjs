/**
 * src/app.html(프로토타입과 같은 원본) → www/index.html(앱 웹뷰가 읽는 완성 문서).
 * - 문서 머리(문자셋·뷰포트·안전 영역·[hidden] 규칙)를 붙인다.
 * - SheetJS는 CDN 대신 www/vendor로 복사해 오프라인에서도 엑셀 읽기가 되게 한다.
 * - 강의 데이터(src/data/*.json)는 www에 그대로 복사(앱 안에 들어감, 공개 서버에 올리지 않음).
 */
import { cpSync, mkdirSync, readFileSync, writeFileSync, rmSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const www = path.join(root, "www");
rmSync(www, { recursive: true, force: true });
mkdirSync(path.join(www, "vendor"), { recursive: true });
let body = readFileSync(path.join(root, "src", "app.html"), "utf8");
const CDN = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
if (!body.includes(CDN)) throw new Error("SheetJS CDN 줄을 찾지 못했습니다");
body = body.replace(CDN, "vendor/xlsx.full.min.js");
cpSync(path.join(root, "node_modules", "xlsx", "dist", "xlsx.full.min.js"), path.join(www, "vendor", "xlsx.full.min.js"));
const head = `<!doctype html><html lang="ko"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="format-detection" content="telephone=no">
<style>[hidden]{display:none!important}html{-webkit-text-size-adjust:100%}html{padding-top:env(safe-area-inset-top,0px)}body{margin:0}</style>
</head><body>
`;
writeFileSync(path.join(www, "index.html"), head + body + "\n</body></html>\n");
for (const f of readdirSync(path.join(root, "src", "data"))) cpSync(path.join(root, "src", "data", f), path.join(www, f));
console.log("www 준비 완료:", readdirSync(www).join(", "));
