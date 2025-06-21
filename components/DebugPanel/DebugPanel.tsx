import Constants from 'expo-constants';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { debugHelper } from '../../utils/debugHelper';
import { logger } from '../../utils/logger';

interface DebugPanelProps {
  visible: boolean;
  onClose: () => void;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ visible, onClose }) => {
  const [logs, setLogs] = useState<any[]>([]);
  const [appInfo, setAppInfo] = useState<any>({});
  const lastVisibleRef = useRef(false);

  useEffect(() => {
    // Only load debug info when panel becomes visible
    if (visible && !lastVisibleRef.current) {
      loadDebugInfo();
    }
    lastVisibleRef.current = visible;
  }, [visible]);

  const loadDebugInfo = async () => {
    try {
      // Get recent logs
      const recentLogs = await logger.getLogs(20);
      setLogs(recentLogs.reverse());

      // Get app info
      setAppInfo({
        platform: Constants.platform,
        isDevice: Constants.isDevice,
        apiUrl: Constants.expoConfig?.extra?.apiUrl,
        version: Constants.expoConfig?.version,
        buildNumber: Constants.expoConfig?.ios?.buildNumber || Constants.expoConfig?.android?.versionCode,
        isDev: __DEV__,
      });
    } catch (error) {
      console.error('Failed to load debug info:', error);
    }
  };

  const testApiConnection = async () => {
    try {
      const isConnected = await debugHelper.checkApiConnectivity();
      Alert.alert(
        'API Test',
        isConnected ? 'API is accessible' : 'API is not accessible',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('API Test Error', (error as Error).message);
    }
  };

  const addTestLog = () => {
    logger.info('Test log from debug panel', { timestamp: new Date().toISOString() });
    loadDebugInfo();
  };

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Debug Panel</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* App Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Info</Text>
          {Object.entries(appInfo).map(([key, value]) => (
            <Text key={key} style={styles.infoText}>
              {key}: {String(value)}
            </Text>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          <TouchableOpacity onPress={testApiConnection} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Test API Connection</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={addTestLog} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Add Test Log</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={loadDebugInfo} style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Logs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Logs ({logs.length})</Text>
          {logs.map((log, index) => (
            <View key={index} style={styles.logEntry}>
              <Text style={styles.logTimestamp}>
                {new Date(log.timestamp).toLocaleTimeString()}
              </Text>
              <Text style={styles.logLevel}>[{log.level}]</Text>
              <Text style={styles.logMessage}>{log.message}</Text>
              {log.data && (
                <Text style={styles.logData}>
                  Data: {JSON.stringify(log.data, null, 2)}
                </Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: 9999,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#112866',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 4,
  },
  actionButton: {
    backgroundColor: '#112866',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  actionButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  logEntry: {
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  logTimestamp: {
    fontSize: 10,
    color: '#888',
  },
  logLevel: {
    fontSize: 10,
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
  logMessage: {
    fontSize: 12,
    color: 'white',
    marginTop: 2,
  },
  logData: {
    fontSize: 10,
    color: '#ccc',
    marginTop: 4,
  },
}); 