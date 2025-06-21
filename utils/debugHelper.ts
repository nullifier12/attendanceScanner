import Constants from 'expo-constants';
import { Alert } from 'react-native';
import { logger } from './logger';

export const debugHelper = {
  // Log app initialization
  logAppStart: () => {
    logger.info('App starting...', {
      platform: Constants.platform,
      isDevice: Constants.isDevice,
      apiUrl: Constants.expoConfig?.extra?.apiUrl,
      version: Constants.expoConfig?.version,
      buildNumber: Constants.expoConfig?.ios?.buildNumber || Constants.expoConfig?.android?.versionCode
    });
  },

  // Log navigation events
  logNavigation: (from: string, to: string, params?: any) => {
    logger.info(`Navigation: ${from} → ${to}`, params, { action: 'NAVIGATION' });
  },

  // Log authentication state
  logAuthState: (session: any, isLoading: boolean) => {
    logger.info('Auth state changed', { 
      hasSession: !!session, 
      isLoading,
      userId: session?.user?.id 
    }, { action: 'AUTH_STATE' });
  },

  // Log API calls
  logApiCall: async (url: string, method: string, data?: any) => {
    try {
      logger.info(`API Call: ${method} ${url}`, data, { action: 'API_CALL' });
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: data ? JSON.stringify(data) : undefined,
      });

      const responseData = await response.json();
      
      logger.info(`API Response: ${method} ${url}`, {
        status: response.status,
        data: responseData
      }, { action: 'API_RESPONSE' });

      return { response, data: responseData };
    } catch (error) {
      logger.error(`API Error: ${method} ${url}`, { error: (error as Error).message }, { action: 'API_ERROR' });
      throw error;
    }
  },

  // Show error alert in development
  showErrorAlert: (title: string, message: string, error?: any) => {
    if (__DEV__) {
      Alert.alert(
        `[DEBUG] ${title}`,
        `${message}\n\n${error ? JSON.stringify(error, null, 2) : ''}`,
        [{ text: 'OK' }]
      );
    }
    logger.error(`[DEBUG] ${title}: ${message}`, error, { action: 'DEBUG_ALERT' });
  },

  // Check if API URL is accessible
  checkApiConnectivity: async () => {
    const apiUrl = Constants.expoConfig?.extra?.apiUrl;
    if (!apiUrl) {
      logger.error('API URL not configured');
      return false;
    }

    try {
      const response = await fetch(`${apiUrl}/api/health`, { 
        method: 'GET'
      });
      
      logger.info('API connectivity check', { 
        url: apiUrl, 
        status: response.status 
      });
      
      return response.ok;
    } catch (error) {
      logger.error('API connectivity failed', { 
        url: apiUrl, 
        error: (error as Error).message 
      });
      return false;
    }
  },

  // Log component lifecycle
  logComponentLifecycle: (componentName: string, phase: 'mount' | 'unmount' | 'update') => {
    logger.debug(`Component ${componentName} ${phase}`, {}, { action: 'COMPONENT_LIFECYCLE' });
  },

  // Log memory usage (if available)
  logMemoryUsage: () => {
    if (__DEV__) {
      const memoryInfo = (global as any).performance?.memory;
      if (memoryInfo) {
        logger.info('Memory usage', {
          used: Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024) + 'MB',
          total: Math.round(memoryInfo.totalJSHeapSize / 1024 / 1024) + 'MB',
          limit: Math.round(memoryInfo.jsHeapSizeLimit / 1024 / 1024) + 'MB'
        });
      }
    }
  }
}; 