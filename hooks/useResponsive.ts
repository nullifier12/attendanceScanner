import {
    DeviceSize,
    ResponsiveInfo,
    ScreenOrientation,
    getResponsiveBorderRadius,
    getResponsiveFontSize,
    getResponsiveSpacing,
    getResponsiveValue,
    isAndroid,
    isIOS,
    isTablet
} from '@/types/responsive';
import { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';

export const useResponsive = (): ResponsiveInfo => {
  const { width, height } = useWindowDimensions();
  const [deviceSize, setDeviceSize] = useState<DeviceSize>('medium');
  const [orientation, setOrientation] = useState<ScreenOrientation>('portrait');

  useEffect(() => {
    // Determine device size based on screen width
    if (width < 375) {
      setDeviceSize('small');
    } else if (width < 414) {
      setDeviceSize('medium');
    } else if (width < 768) {
      setDeviceSize('large');
    } else {
      setDeviceSize('xlarge');
    }

    // Determine orientation
    setOrientation(width > height ? 'landscape' : 'portrait');
  }, [width, height]);

  return {
    isIOS,
    isAndroid,
    isTablet: isTablet || width >= 768,
    screenWidth: width,
    screenHeight: height,
    deviceSize,
    orientation,
  };
};

// Utility hooks for responsive design
export const useResponsiveValue = <T>(mobile: T, tablet: T, desktop?: T): T => {
  return getResponsiveValue(mobile, tablet, desktop);
};

export const useResponsiveSpacing = (size: keyof typeof import('@/types/responsive').SPACING): number => {
  return getResponsiveSpacing(size);
};

export const useResponsiveFontSize = (size: keyof typeof import('@/types/responsive').FONT_SIZES): number => {
  return getResponsiveFontSize(size);
};

export const useResponsiveBorderRadius = (size: keyof typeof import('@/types/responsive').BORDER_RADIUS): number => {
  return getResponsiveBorderRadius(size);
}; 