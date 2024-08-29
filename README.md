# Start react-native server
npx react-native start

# Build a Debug APK
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

cd android && ./gradlew assembleDebug

# Build a Release APK
Build for .apk
cd android && ./gradlew assembleRelease && cd ..

## Build for Google Play Store
Build for .aab
(update version code first!)
npx react-native build-android --mode=release