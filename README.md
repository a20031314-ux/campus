# campus — 수강로드 (내 폰 테스트 단계)

앱 이름은 `src/app.html`의 `APP_NAME`과 `capacitor.config.json`의 `appName` 두 곳(바꿀 수 있음).
바꿀 수 없는 ID: `com.yourname.campus`.

## 구조
- `src/app.html` — 화면 원본(프로토타입과 같은 파일). 고친 뒤 `npm run check`로 문법 검사
- `src/data/` — 서울대 2026-2 강의·과거 학기 요약. **앱 안에만 들어가고 공개 서버에 올리지 않는다**
- `scripts/build-web.mjs` — `www/` 만들기(엑셀 라이브러리도 앱 안에 넣어 오프라인 동작)
- `android/`, `ios/` — Capacitor 8 네이티브 프로젝트

## 안드로이드 (내 폰에 바로)
1. main에 올리면 Actions "Android: 테스트 APK"가 자동으로 돈다(약 5~10분)
2. 그 실행 화면 아래 Artifacts → `sugangroad-test-apk` 받기 → 폰에서 zip 열고 APK 설치
   (처음 한 번 '출처를 알 수 없는 앱 설치' 허용)
3. 새 버전도 같은 방법으로 덮어 설치 — 테스트 서명 키가 고정이라 기록(내 정보·이력)이 유지됨
- 스토어 출시용 서명 키는 따로 만든다(이 키는 테스트 전용)

## 아이폰 (TestFlight 내부 테스트 — 심사 없이 내 폰에만)
한 번만 준비(사람이):
1. developer.apple.com → Identifiers → ＋ App IDs → Bundle ID `com.yourname.campus`
2. App Store Connect → 앱 ＋ → iOS, 이름 `수강로드`, 번들 ID 위 값, SKU `campus-ios`
3. 이 저장소 Settings → Environments → `ios` 만들기
   - secrets: `ASC_KEY_ID`, `ASC_ISSUER_ID`, `ASC_KEY_P8` — LanguageBank에서 쓰는 App Store Connect API 키와 같은 값(같은 팀)
   - variables: `APPLE_TEAM_ID`, `IOS_BUNDLE_ID` = `com.yourname.campus`
4. Actions → "iOS: TestFlight" → Run workflow (20~30분 + 처리 10~30분)
5. App Store Connect → 앱 → TestFlight → 내부 테스트 그룹에 본인 추가 → 아이폰 TestFlight 앱에서 설치
