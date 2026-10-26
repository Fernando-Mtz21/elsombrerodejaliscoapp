# AngularBaseTemplate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Mobile apps (Capacitor)

The Android (`android/`) and iOS (`ios/`) native projects are committed. SDKs, build output and the copied web assets are not: each machine installs its own SDKs and generates them.

### Android (Windows or macOS)

1. Install [Android Studio](https://developer.android.com/studio). It bundles the JDK. Install Android SDK 35 from the SDK Manager.
2. Open the `android/` folder in Android Studio once so it writes `android/local.properties` (`sdk.dir`). Alternatively, set `ANDROID_HOME`.
3. `npm ci`, then `npm run build:android`. This builds Angular and copies it into the native project.
4. Run it with `npx cap run android`, or build an APK with `cd android && ./gradlew assembleDebug` (output: `android/app/build/outputs/apk/debug/`).
5. Release: create `android/keystore.properties` with `storeFile`, `storePassword`, `keyAlias` and `keyPassword` (it is gitignored, and so is the keystore). Then run `./gradlew bundleRelease` (output: `android/app/build/outputs/bundle/release/`).
6. Push notifications: put the Firebase `google-services.json` in `android/app/`.

### iOS (macOS only)

1. Install Xcode and CocoaPods (`brew install cocoapods`).
2. `npm ci`, then `npm run build:ios`. This builds Angular, copies it and runs `pod install`.
3. `npm run open:ios`, pick a signing team in Xcode, then use Product → Archive for a release.
4. Push notifications: enable the Push Notifications capability, upload the APNs key to Firebase and add `GoogleService-Info.plist` to `ios/App/App/`.

### App icon and splash screen

They are generated from `src/assets/img/logo.png`. After changing the logo, run `npm run assets:generate`. To change the background color, edit `BACKGROUND` in `scripts/prepare-icon.mjs`.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
