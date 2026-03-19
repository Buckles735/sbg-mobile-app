# Solar Battery Group — Consumer App V4 (React Native)

Native mobile app built with Expo / React Native. Ready for iOS App Store and Google Play.

## Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli eas-cli`
- Apple Developer Account ($149 AUD/yr) for iOS App Store
- Google Play Console ($35 USD one-off) for Android

## Quick Start

```bash
npm install
npx expo start
```

Scan the QR code with Expo Go on your phone to test immediately.

## Project Structure

```
sbg-mobile-app/
├── App.js                          # Entry point
├── app.json                        # Expo config (bundle IDs, permissions, splash)
├── eas.json                        # EAS Build config (dev/preview/production)
├── assets/                         # Icons, splash screens
├── src/
│   ├── constants/
│   │   ├── theme.js                # Design tokens (colors, spacing, typography)
│   │   └── data.js                 # Demo/mock data
│   ├── hooks/
│   │   └── useCamera.js            # Camera hook (permissions, capture, quality validation)
│   ├── navigation/
│   │   └── AppNavigator.js         # React Navigation (tabs + stack)
│   ├── screens/                    # All 21 screens
│   │   ├── WelcomeScreen.js        # ✅ Fully ported
│   │   ├── PhotoCaptureScreen.js   # ✅ Fully ported (real camera)
│   │   ├── HomeScreen.js           # 🚧 Stub — port next
│   │   ├── QuoteScreen.js          # 🚧 Stub
│   │   ├── ScheduleScreen.js       # 🚧 Stub
│   │   ├── ... (17 more)
│   ├── components/                 # Shared components (coming)
│   ├── services/                   # API, push notifications, payments (coming)
│   └── utils/                      # Helpers (coming)
```

## Build for App Store

### 1. Set up EAS

```bash
npx eas-cli login
npx eas build:configure
```

### 2. Update identifiers in `eas.json`

Replace `YOUR_APPLE_ID`, `YOUR_APP_STORE_CONNECT_APP_ID`, `YOUR_TEAM_ID`.

### 3. Build iOS

```bash
# Development build (for TestFlight)
npx eas build --platform ios --profile preview

# Production build
npx eas build --platform ios --profile production
```

### 4. Submit to App Store

```bash
npx eas submit --platform ios
```

### 5. Build Android

```bash
npx eas build --platform android --profile production
npx eas submit --platform android
```

## Camera (Real iOS/Android)

Uses `expo-camera` with:
- Back-facing camera for all 5 photo steps
- Frame guide overlay with corner markers
- Image quality validation (brightness, sharpness, contrast)
- Auto-resize to 1200px for upload efficiency
- Permission handling with descriptive prompts

## All 21 Screens

| # | Screen | Status | Category |
|---|--------|--------|----------|
| 1 | Welcome | ✅ Ported | Journey |
| 2 | Photo Capture | ✅ Ported (real camera) | Journey |
| 3 | Home Dashboard | 🚧 Stub | Journey |
| 4 | Quote & Upsells | 🚧 Stub | Journey |
| 5 | Scheduling | 🚧 Stub | Journey |
| 6 | Install Day | 🚧 Stub | Journey |
| 7 | Messages | 🚧 Stub | Journey |
| 8 | Learn Hub | 🚧 Stub | Services |
| 9 | Notifications | 🚧 Stub | Services |
| 10 | YouTube & Podcast | 🚧 Stub | Services |
| 11 | Electrify Home | 🚧 Stub | Services |
| 12 | Energy Plan | 🚧 Stub | Services |
| 13 | VPP | 🚧 Stub | Services |
| 14 | Warranty | 🚧 Stub | Services |
| 15 | Payments | 🚧 Stub | Services |
| 16 | Finance/BNPL | 🚧 Stub | Services |
| 17 | Home Maintenance | 🚧 Stub | Services |
| 18 | Support | 🚧 Stub | Services |
| 19 | Post-Install Monitor | 🚧 Stub | Services |
| 20 | Energy Bill | 🚧 Stub | Services |
| 21 | Profile | 🚧 Stub | Services |

## Porting Roadmap

**Phase 1 (current):** Scaffold, navigation, camera, Welcome + Photo Capture fully ported.

**Phase 2:** Home Dashboard, Quote, Schedule, Messages, Install Day — core journey screens.

**Phase 3:** All Services screens (Learn, Notifications, Media, Electrify, Energy Plan, VPP, Warranty, Payments, BNPL, Maintenance, Support, Monitor).

**Phase 4:** Push notifications, SecurePay integration, Brighte/Plenti deep links, offline mode.

**Phase 5:** App Store assets (icon, screenshots, metadata), TestFlight beta, review submission.

## App Store Requirements Checklist

- [ ] Apple Developer Account ($149/yr)
- [ ] App Store Connect app created
- [ ] Bundle ID registered: `com.solarbatterygroup.consumer`
- [ ] App icon (1024x1024, no transparency, no rounded corners)
- [ ] Screenshots: 6.7" (1290x2796), 6.5" (1284x2778), 5.5" (1242x2208)
- [ ] Privacy policy URL
- [ ] App description, keywords, categories
- [ ] Age rating questionnaire
- [ ] TestFlight beta testing (minimum 1 week recommended)
- [ ] Review notes for Apple reviewer

---
Prepared by **Omniex** for **Solar Battery Group** · March 2026
