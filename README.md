# Pawdy 모바일 앱 (Capacitor)

`design-system`의 Vite 웹앱을 Capacitor로 감싼 Android/iOS 셸.
웹 번들은 앱에 내장되고, API는 Railway 운영 백엔드(`VITE_API_BASE`)를 호출한다.

## 빌드 & 테스트 (Android)

사전 요구: JDK 17, Android Studio(또는 Android SDK), `ANDROID_HOME` 설정.

```bash
cd App
npm install
npm run build:web        # design-system 빌드(운영 API) → www/ 복사
npx cap sync android     # www/ → 안드로이드 프로젝트 반영
npm run apk              # android/app/build/outputs/apk/debug/app-debug.apk
```

- 로컬 백엔드로 빌드하려면: `node build-web.mjs http://<PC IP>:8000`
- Android Studio로 열기: `npm run open` (에뮬레이터/실기기 실행·디버깅)
- 휴대폰 설치: `adb install -r android/app/build/outputs/apk/debug/app-debug.apk`
  또는 APK 파일을 폰에 복사해 직접 설치(출처를 알 수 없는 앱 허용 필요).

## 주의

- 백엔드 CORS에 앱 오리진(`https://localhost`, `capacitor://localhost`)이 허용돼 있어야 한다 (`backend/app/main.py`).
- 카카오 로그인은 콜백이 웹(frontend_url)으로 리다이렉트되므로 앱 안에서는 완결되지 않는다.
  → QA는 '둘러보기(dev-login)' 사용. 정식 지원은 카카오 SDK/딥링크 작업 필요.
- 릴리스(스토어) 빌드는 서명 키 생성 후 `assembleRelease` — 인앱결제 작업과 함께 진행.
- Windows 한글 사용자 경로 때문에 `android/gradle.properties`에 `android.overridePathCheck=true` 적용됨.
