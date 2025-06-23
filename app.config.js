export default {
  expo: {
    name: "HR APP",
    slug: "ScnnrAttndc",
    version: "1.0.3",
    orientation: "portrait",
    icon: "./assets/images/KCPAPI.png",
    scheme: "scnnrattndc",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      icon: "./assets/images/KCPAPI.png"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/KCPAPI.png",
      },
      icon: "./assets/images/KCPAPI.png",
      edgeToEdgeEnabled: true,
      permissions: ["android.permission.CAMERA"],
      package: "com.attScnnr"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/KCPAPI.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/KCPAPI.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ],
      [
        "expo-build-properties",
        {
          "android": {
            "usesCleartextTraffic": true
          }
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {},
      eas: {
        projectId: "1c6b6f55-f0fb-4ce2-a5a1-a84408dab4bd"
      },
      apiUrl: process.env.API_URL || "http://192.168.100.3:5000",
      mobileKey: process.env.MOBILE_SECRET || "aSuperSecretKeyForMobileAccess!123@"
    }
  }
}; 