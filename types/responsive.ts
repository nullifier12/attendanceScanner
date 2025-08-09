import { Dimensions, Platform } from "react-native";

// Screen dimensions
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } =
  Dimensions.get("window");

// Device type detection
export const isIOS = Platform.OS === "ios";
export const isAndroid = Platform.OS === "android";
export const isTablet = SCREEN_WIDTH >= 768;

// Responsive breakpoints
export const BREAKPOINTS = {
  xs: 320,
  sm: 375,
  md: 414,
  lg: 768,
  xl: 1024,
} as const;

// Responsive spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// Responsive font sizes
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

// Responsive border radius
export const BORDER_RADIUS = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

// Responsive utility functions
export const getResponsiveValue = <T>(mobile: T, tablet: T, desktop?: T): T => {
  if (isTablet) {
    return desktop || tablet;
  }
  return mobile;
};

export const getResponsiveSpacing = (size: keyof typeof SPACING): number => {
  return SPACING[size];
};

export const getResponsiveFontSize = (
  size: keyof typeof FONT_SIZES
): number => {
  return FONT_SIZES[size];
};

export const getResponsiveBorderRadius = (
  size: keyof typeof BORDER_RADIUS
): number => {
  return BORDER_RADIUS[size];
};

// iOS-specific dimensions
export const IOS_DIMENSIONS = {
  statusBarHeight: isIOS ? 44 : 0,
  homeIndicatorHeight: isIOS ? 34 : 0,
  notchHeight: isIOS ? 30 : 0,
} as const;

// Responsive layout types
export interface ResponsiveStyle {
  mobile?: any;
  tablet?: any;
  desktop?: any;
}

export interface IOSStyle {
  ios?: any;
  android?: any;
}

// Screen orientation types
export type ScreenOrientation = "portrait" | "landscape";

// Device size types
export type DeviceSize = "small" | "medium" | "large" | "xlarge";

// Responsive hook return type
export interface ResponsiveInfo {
  isIOS: boolean;
  isAndroid: boolean;
  isTablet: boolean;
  screenWidth: number;
  screenHeight: number;
  deviceSize: DeviceSize;
  orientation: ScreenOrientation;
}
