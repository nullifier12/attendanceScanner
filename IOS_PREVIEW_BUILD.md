# iOS Preview Build Guide

## 🍎 iOS Preview Build Setup

This guide will help you create iOS preview builds for testing your HR APP on iOS devices.

## 📋 Prerequisites

1. **EAS CLI Installed**
   ```bash
   npm install -g @expo/eas-cli
   ```

2. **EAS Account Setup**
   ```bash
   eas login
   ```

3. **Apple Developer Account** (for device builds)
   - Free Apple ID for simulator builds
   - Paid Apple Developer Account for device builds

## 🚀 Build Commands

### Quick Commands (Added to package.json)

```bash
# Build iOS preview for devices
npm run build:ios-preview

# Build iOS preview for simulator
npm run build:ios-simulator

# Build Android preview
npm run build:android-preview

# Build both platforms
npm run build:preview
```

### Manual Commands

```bash
# iOS Device Build (IPA file)
eas build --platform ios --profile preview

# iOS Simulator Build
eas build --platform ios --profile preview-simulator

# Android Build
eas build --platform android --profile preview
```

## 📱 Build Types

### 1. **iOS Device Build** (`preview`)
- **Output**: `.ipa` file
- **Use Case**: Install on physical iOS devices
- **Requirements**: Apple Developer Account
- **Distribution**: Internal (TestFlight or direct install)

### 2. **iOS Simulator Build** (`preview-simulator`)
- **Output**: `.tar.gz` file
- **Use Case**: Test on iOS Simulator
- **Requirements**: Xcode and iOS Simulator
- **Distribution**: Internal

## 🔧 Configuration Files

### EAS Configuration (`eas.json`)
```json
{
  "build": {
    "preview": {
      "ios": {
        "buildType": "archive",
        "distribution": "internal"
      }
    },
    "preview-simulator": {
      "ios": {
        "buildType": "simulator",
        "distribution": "internal"
      }
    }
  }
}
```

### App Configuration (`app.json`)
```json
{
  "ios": {
    "bundleIdentifier": "com.attScnnr.ios",
    "supportsTablet": true
  }
}
```

## 📥 Installing Preview Builds

### iOS Device Installation

1. **Download the IPA file** from EAS Build
2. **Install via TestFlight** (recommended):
   - Upload to App Store Connect
   - Invite testers via TestFlight
   - Testers install via TestFlight app

3. **Direct Installation** (advanced):
   - Use tools like AltStore or Sideloadly
   - Requires device UDID registration

### iOS Simulator Installation

1. **Download the .tar.gz file** from EAS Build
2. **Extract the file**:
   ```bash
   tar -xzf your-app-simulator.tar.gz
   ```
3. **Open iOS Simulator**
4. **Drag and drop** the `.app` file to simulator

## 🧪 Testing Your Preview Build

### Features to Test

1. **Payslip Download**:
   - Generate payslip PDF
   - Test iOS share sheet
   - Verify folder selection
   - Check file saving

2. **Responsive Design**:
   - Test on different iPhone sizes
   - Test on iPad (tablet mode)
   - Verify modal layouts

3. **Request Modals**:
   - Test all modal types (Leave, OT, OB, Dispute)
   - Verify custom picker functionality
   - Check compact layout

4. **General Functionality**:
   - Navigation between screens
   - Form submissions
   - Data display

## 🔍 Troubleshooting

### Common Issues

1. **Build Fails**:
   - Check EAS CLI version: `eas --version`
   - Verify Apple Developer account setup
   - Check bundle identifier uniqueness

2. **Installation Issues**:
   - Ensure device UDID is registered (for device builds)
   - Check TestFlight setup
   - Verify iOS version compatibility

3. **App Crashes**:
   - Check console logs
   - Verify all dependencies are included
   - Test on different iOS versions

### Useful Commands

```bash
# Check build status
eas build:list

# View build logs
eas build:view

# Cancel a build
eas build:cancel

# Update EAS CLI
npm install -g @expo/eas-cli@latest
```

## 📊 Build Monitoring

### EAS Dashboard
- Visit: https://expo.dev
- Navigate to your project
- View build history and status
- Download build artifacts

### Build Notifications
- Email notifications for build completion
- Slack/Discord integration available
- Webhook support for CI/CD

## 🎯 Best Practices

1. **Version Management**:
   - Increment version in `app.json` before builds
   - Use semantic versioning
   - Document changes in release notes

2. **Testing Strategy**:
   - Test on multiple iOS versions
   - Test on different device sizes
   - Use TestFlight for beta testing

3. **Build Optimization**:
   - Use simulator builds for quick testing
   - Use device builds for final validation
   - Monitor build times and costs

## 📞 Support

If you encounter issues:

1. **Check EAS Documentation**: https://docs.expo.dev/build/introduction/
2. **Expo Forums**: https://forums.expo.dev/
3. **GitHub Issues**: Report bugs in the Expo repository

---

**Happy Building! 🚀** 