# Ruang Meeting App

Clean React Native (CLI) app for meeting room reservations.

## Requirements

- Node 18+
- Java 11+ and Android SDK (for Android)
- Xcode (for iOS, optional on macOS)

## Install

```bash
npm install
```

## Run (Android)

```bash
npm run android
```

## Run (iOS)

```bash
npm run ios
```

## Tech

- React Native 0.71
- React Navigation (native-stack)
- Async Storage (@react-native-async-storage/async-storage)
- Date/Time Picker (@react-native-community/datetimepicker)
- Vector Icons (react-native-vector-icons)

## Fonts

Poppins is bundled locally via `assets/fonts` and linked with `react-native-asset`.

## Project Structure

```
src/
  components/       # Reusable UI (e.g., BookingModal, AlertBox)
  context/          # AuthContext, BookingContext
  screens/          # Splash, Login, Home, Schedule
  services/         # api.js, auth.js
  theme.js          # colors/spacing/typography
```

## Common tasks

- Clean Android build: `cd android && ./gradlew clean`
- Reset Metro cache: `npx react-native start --reset-cache`

## Notes

- Android targetSdk is set to 33 to avoid Android 14 broadcast restrictions during development.
- Vector icons and Poppins fonts are already configured for Android.

## Troubleshooting

- Build error about `OutputFile`: removed legacy API from `android/app/build.gradle`.
- If icons don't show, run: `npm run android` to rebuild native resources.
