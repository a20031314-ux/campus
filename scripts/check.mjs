// 게시·빌드 전 스크립트 문법 검사(MAIN §0-7). 문법이 깨지면 화면 전체가 멈춘다.
import { readFileSync } from "node:fs";
const s = readFileSync(new URL("../src/app.html", import.meta.url), "utf8");
const i = s.indexOf("<script>\n(function"), j = s.lastIndexOf("</script>");
if (i < 0 || j < 0) { console.error("본문 스크립트를 찾지 못함"); process.exit(1); }
try { new Function(s.slice(i + 8, j)); console.log("문법 OK"); } catch (e) { console.error("문법 오류:", e.message); process.exit(1); }
