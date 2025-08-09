import { useResponsive } from '@/hooks/useResponsive';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Platform, View, type ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  useSafeArea?: boolean;
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
};

export function ThemedView({ 
  style, 
  lightColor, 
  darkColor, 
  useSafeArea = false,
  edges = ['top', 'bottom', 'left', 'right'],
  ...otherProps 
}: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const { isIOS, isTablet } = useResponsive();

  const responsiveStyle = {
    backgroundColor,
    paddingHorizontal: isTablet ? 32 : 20,
    paddingVertical: isTablet ? 24 : 16,
    ...Platform.select({
      ios: {
        // iOS-specific styles
      },
      android: {
        // Android-specific styles
      },
    }),
  };

  if (useSafeArea) {
    return (
      <SafeAreaView 
        style={[responsiveStyle, style]} 
        edges={edges}
        {...otherProps}
      />
    );
  }

  return <View style={[responsiveStyle, style]} {...otherProps} />;
}
