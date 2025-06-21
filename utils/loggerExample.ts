import { logger } from './logger';

// Example usage of the logger throughout your app

export const logExamples = {
  // Basic logging
  basicLogging: () => {
    logger.debug('Debug message');
    logger.info('Info message');
    logger.warn('Warning message');
    logger.error('Error message');
    logger.fatal('Fatal error message');
  },

  // Logging with context
  loggingWithContext: (userId: string, screen: string) => {
    logger.info('User logged in', { userId }, { userId, screen, action: 'LOGIN' });
    logger.logUserAction('Button pressed', { buttonId: 'submit' }, userId, screen);
  },

  // API logging
  apiLogging: async (url: string, method: string, userId: string) => {
    // Log API request
    await logger.logApiRequest(url, method, { userId }, userId);
    
    try {
      // Simulate API call
      const response = await fetch(url, { method });
      const data = await response.json();
      
      // Log API response
      await logger.logApiResponse(url, method, response.status, data, userId);
      
      return data;
    } catch (error) {
      // Log error
      await logger.logError(error as Error, { userId, action: 'API_CALL' });
      throw error;
    }
  },

  // Error logging
  errorLogging: (error: Error, userId?: string) => {
    logger.logError(error, { userId, action: 'GENERAL_ERROR' });
  },

  // Performance logging
  performanceLogging: (operation: string, duration: number, userId?: string) => {
    logger.info(`Performance: ${operation} took ${duration}ms`, 
      { operation, duration }, 
      { userId, action: 'PERFORMANCE' }
    );
  },

  // User action logging
  userActionLogging: (action: string, data: any, userId: string, screen: string) => {
    logger.logUserAction(action, data, userId, screen);
  }
};

// Example of how to integrate logger in your components
export const useLogger = (userId?: string, screen?: string) => {
  return {
    debug: (message: string, data?: any) => 
      logger.debug(message, data, { userId, screen }),
    
    info: (message: string, data?: any) => 
      logger.info(message, data, { userId, screen }),
    
    warn: (message: string, data?: any) => 
      logger.warn(message, data, { userId, screen }),
    
    error: (message: string, data?: any) => 
      logger.error(message, data, { userId, screen }),
    
    logUserAction: (action: string, data?: any) => 
      logger.logUserAction(action, data, userId, screen),
    
    logError: (error: Error) => 
      logger.logError(error, { userId, screen })
  };
}; 