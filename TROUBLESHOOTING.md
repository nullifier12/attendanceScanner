# White Screen Issue Troubleshooting Guide

## Problem Description
The app works fine in development (Expo) but shows a white screen after login in production builds.

## Common Causes & Solutions

### 1. **API URL Configuration Issue**
**Problem**: The API URL might not be accessible in production builds.

**Solution**:
- Check if `http://192.168.1.100:5000` is accessible from the device
- Update `app.config.js` to use a publicly accessible URL
- Add environment variable support:

```javascript
// app.config.js
extra: {
  apiUrl: process.env.API_URL || "https://your-production-api.com"
}
```

### 2. **Network Security Issues**
**Problem**: Android blocks cleartext HTTP traffic in production.

**Solution**:
- Already configured in `app.config.js` with `usesCleartextTraffic: true`
- Consider using HTTPS instead of HTTP
- Add network security config if needed

### 3. **JSON Parsing Errors**
**Problem**: Invalid JSON data from API causing crashes.

**Solution**:
- Added error handling in `userinfo/userinfo.tsx`
- Check API response format
- Validate data before parsing

### 4. **Navigation Issues**
**Problem**: Router navigation failing silently.

**Solution**:
- Added error boundaries in `_layout.tsx`
- Added fallback navigation
- Enhanced error logging

### 5. **Memory Issues**
**Problem**: Large data objects causing memory problems.

**Solution**:
- Added memory usage logging
- Optimize data handling
- Consider pagination for large datasets

## Debugging Steps

### Step 1: Check Logs
1. Build and install the app
2. Try to login
3. Use the Debug Panel (🐛 button in development)
4. Check the logs for errors

### Step 2: Test API Connectivity
1. Open Debug Panel
2. Tap "Test API Connection"
3. Verify API is accessible

### Step 3: Check App State
1. In Debug Panel, check "App Info"
2. Verify API URL is correct
3. Check if running in production mode

### Step 4: Monitor Navigation
1. Watch logs during login process
2. Check if navigation events are logged
3. Look for any error messages

## Quick Fixes to Try

### Fix 1: Update API URL
```javascript
// app.config.js
extra: {
  apiUrl: "https://your-actual-api-url.com" // Use your real API URL
}
```

### Fix 2: Add Error Boundary
Already implemented in `_layout.tsx`

### Fix 3: Add Loading States
Already implemented in `userinfo/userinfo.tsx`

### Fix 4: Test with Different API
```javascript
// Temporarily test with a public API
extra: {
  apiUrl: "https://jsonplaceholder.typicode.com"
}
```

## Production Build Commands

### Android
```bash
eas build --platform android --profile production
```

### iOS
```bash
eas build --platform ios --profile production
```

## Testing Checklist

- [ ] API is accessible from device
- [ ] Login API returns valid JSON
- [ ] Navigation works in development
- [ ] No console errors in development
- [ ] Error boundaries catch any crashes
- [ ] Loading states show properly
- [ ] Debug panel shows relevant info

## Common Error Messages to Look For

1. **"Network request failed"** - API connectivity issue
2. **"JSON Parse error"** - Invalid API response
3. **"Navigation failed"** - Router issue
4. **"Component error"** - React component crash

## Next Steps

1. Build the app with these changes
2. Test login flow
3. Check logs using Debug Panel
4. Share any error messages found
5. Update API URL if needed

## Emergency Fallback

If the issue persists, add this to any screen to show errors:

```javascript
import { Alert } from 'react-native';

// Add this to catch any unhandled errors
if (__DEV__) {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    Alert.alert('Error', args.join(' '));
    originalConsoleError.apply(console, args);
  };
}
``` 