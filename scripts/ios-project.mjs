/**
 * iOS 프로젝트 고정 값(여러 번 돌려도 같은 결과). `npm run build:ios`가 부른다.
 * - 번들 ID: 환경 변수 IOS_BUNDLE_ID(GitHub 변수) 또는 capacitor.config.json의 appId
 * - 암호화 신고: 표준 HTTPS만 → ITSAppUsesNonExemptEncryption=false (TestFlight 질문 생략)
 * 빌드 번호는 워크플로가 xcodebuild에 CURRENT_PROJECT_VERSION으로 넘긴다.
 */
import { readFileSync, writeFileSync } from "node:fs";
const cfg = JSON.parse(readFileSync(new URL("../capacitor.config.json", import.meta.url), "utf8"));
const bundle = (process.env.IOS_BUNDLE_ID || cfg.appId).trim();
const pbxUrl = new URL("../ios/App/App.xcodeproj/project.pbxproj", import.meta.url);
let pbx = readFileSync(pbxUrl, "utf8");
pbx = pbx.replace(/PRODUCT_BUNDLE_IDENTIFIER = [^;]+;/g, `PRODUCT_BUNDLE_IDENTIFIER = ${bundle};`);
writeFileSync(pbxUrl, pbx);
const plistUrl = new URL("../ios/App/App/Info.plist", import.meta.url);
let plist = readFileSync(plistUrl, "utf8");
if (!plist.includes("ITSAppUsesNonExemptEncryption")) plist = plist.replace("<dict>", "<dict>\n\t<key>ITSAppUsesNonExemptEncryption</key>\n\t<false/>");
writeFileSync(plistUrl, plist);
console.log("iOS 설정:", bundle);
