import * as FileSystem from 'expo-file-system/legacy';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  userId?: string;
  screen?: string;
  action?: string;
}

class Logger {
  private logLevel: LogLevel;
  private maxLogSize: number;
  private logFileName: string;
  private isInitialized: boolean = false;

  constructor() {
    this.logLevel = LogLevel.DEBUG;
    this.maxLogSize = 1000; // Maximum number of log entries to keep
    this.logFileName = 'app-logs.json';
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      // Create logs directory if it doesn't exist
      const logsDir = `${FileSystem.documentDirectory}logs/`;
      const dirInfo = await FileSystem.getInfoAsync(logsDir);
      
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(logsDir, { intermediates: true });
      }
      
      this.isInitialized = true;
      this.info('Logger initialized successfully');
    } catch (error) {
      console.error('Failed to initialize logger:', error);
    }
  }

  private getLogFilePath(): string {
    return `${FileSystem.documentDirectory}logs/${this.logFileName}`;
  }

  private async readLogs(): Promise<LogEntry[]> {
    try {
      const filePath = this.getLogFilePath();
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      
      if (!fileInfo.exists) {
        return [];
      }
      
      const content = await FileSystem.readAsStringAsync(filePath);
      return JSON.parse(content);
    } catch (error) {
      console.error('Error reading logs:', error);
      return [];
    }
  }

  private async writeLogs(logs: LogEntry[]): Promise<void> {
    try {
      const filePath = this.getLogFilePath();
      await FileSystem.writeAsStringAsync(filePath, JSON.stringify(logs, null, 2));
    } catch (error) {
      console.error('Error writing logs:', error);
    }
  }

  private async addLogEntry(entry: LogEntry): Promise<void> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const logs = await this.readLogs();
      logs.push(entry);
      
      // Keep only the latest logs based on maxLogSize
      if (logs.length > this.maxLogSize) {
        logs.splice(0, logs.length - this.maxLogSize);
      }
      
      await this.writeLogs(logs);
    } catch (error) {
      console.error('Error adding log entry:', error);
    }
  }

  private formatMessage(level: LogLevel, message: string, data?: any, context?: { userId?: string; screen?: string; action?: string }): string {
    const timestamp = new Date().toISOString();
    const levelName = LogLevel[level];
    const contextInfo = context ? ` [${context.userId || 'N/A'}|${context.screen || 'N/A'}|${context.action || 'N/A'}]` : '';
    
    let formattedMessage = `[${timestamp}] ${levelName}${contextInfo}: ${message}`;
    
    if (data) {
      formattedMessage += ` | Data: ${JSON.stringify(data)}`;
    }
    
    return formattedMessage;
  }

  private async log(level: LogLevel, message: string, data?: any, context?: { userId?: string; screen?: string; action?: string }): Promise<void> {
    if (level < this.logLevel) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      userId: context?.userId,
      screen: context?.screen,
      action: context?.action
    };

    // Console output
    const formattedMessage = this.formatMessage(level, message, data, context);
    
    switch (level) {
      case LogLevel.DEBUG:
        console.debug(formattedMessage);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage);
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage);
        break;
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        console.error(formattedMessage);
        break;
    }

    // File logging
    await this.addLogEntry(entry);
  }

  debug(message: string, data?: any, context?: { userId?: string; screen?: string; action?: string }): Promise<void> {
    return this.log(LogLevel.DEBUG, message, data, context);
  }

  info(message: string, data?: any, context?: { userId?: string; screen?: string; action?: string }): Promise<void> {
    return this.log(LogLevel.INFO, message, data, context);
  }

  warn(message: string, data?: any, context?: { userId?: string; screen?: string; action?: string }): Promise<void> {
    return this.log(LogLevel.WARN, message, data, context);
  }

  error(message: string, data?: any, context?: { userId?: string; screen?: string; action?: string }): Promise<void> {
    return this.log(LogLevel.ERROR, message, data, context);
  }

  fatal(message: string, data?: any, context?: { userId?: string; screen?: string; action?: string }): Promise<void> {
    return this.log(LogLevel.FATAL, message, data, context);
  }

  // API request logging
  logApiRequest(url: string, method: string, data?: any, userId?: string): Promise<void> {
    return this.info(`API Request: ${method} ${url}`, data, { userId, action: 'API_REQUEST' });
  }

  logApiResponse(url: string, method: string, status: number, data?: any, userId?: string): Promise<void> {
    const level = status >= 400 ? LogLevel.ERROR : LogLevel.INFO;
    const message = `API Response: ${method} ${url} - ${status}`;
    return this.log(level, message, data, { userId, action: 'API_RESPONSE' });
  }

  // User action logging
  logUserAction(action: string, data?: any, userId?: string, screen?: string): Promise<void> {
    return this.info(`User Action: ${action}`, data, { userId, screen, action });
  }

  // Error logging with stack trace
  logError(error: Error, context?: { userId?: string; screen?: string; action?: string }): Promise<void> {
    return this.error(error.message, {
      stack: error.stack,
      name: error.name
    }, context);
  }

  // Get logs for debugging
  async getLogs(limit?: number): Promise<LogEntry[]> {
    const logs = await this.readLogs();
    return limit ? logs.slice(-limit) : logs;
  }

  // Clear logs
  async clearLogs(): Promise<void> {
    try {
      const filePath = this.getLogFilePath();
      await FileSystem.deleteAsync(filePath);
      this.info('Logs cleared');
    } catch (error) {
      console.error('Error clearing logs:', error);
    }
  }

  // Export logs
  async exportLogs(): Promise<string> {
    const logs = await this.readLogs();
    return JSON.stringify(logs, null, 2);
  }

  // Set log level
  setLogLevel(level: LogLevel): void {
    this.logLevel = level;
    this.info(`Log level set to ${LogLevel[level]}`);
  }

  // Get current log level
  getLogLevel(): LogLevel {
    return this.logLevel;
  }
}

// Create singleton instance
export const logger = new Logger();

// Initialize logger when module is imported
logger.initialize().catch(console.error);

export default logger; 