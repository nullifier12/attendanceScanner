export default {
  expo: {
    name: "HR APP",
    slug: "ScnnrAttndc",
    version: "1.0.2",
    orientation: "portrait",
    icon: "./assets/Logo.png",
    scheme: "scnnrattndc",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      icon: "./assets/Logo.png"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/Logo.png",
        backgroundColor: "#112866"
      },
      icon: "./assets/Logo.png",
      edgeToEdgeEnabled: true,
      permissions: ["android.permission.CAMERA"],
      package: "com.attScnnr"
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/Logo.png"
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/Logo.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
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
      apiUrl: process.env.API_URL || "http://192.168.1.100:5000"
    }
  }
}; 