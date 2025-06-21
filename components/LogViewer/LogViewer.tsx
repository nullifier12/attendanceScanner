import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { LogEntry, logger, LogLevel } from '../../utils/logger';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

interface LogViewerProps {
  visible: boolean;
  onClose: () => void;
}

export const LogViewer: React.FC<LogViewerProps> = ({ visible, onClose }) => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const recentLogs = await logger.getLogs(100); // Get last 100 logs
      setLogs(recentLogs.reverse()); // Show newest first
    } catch (error) {
      console.error('Error loading logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      loadLogs();
    }
  }, [visible]);

  const getLogLevelColor = (level: LogLevel) => {
    switch (level) {
      case LogLevel.DEBUG: return '#6c757d';
      case LogLevel.INFO: return '#17a2b8';
      case LogLevel.WARN: return '#ffc107';
      case LogLevel.ERROR: return '#dc3545';
      case LogLevel.FATAL: return '#721c24';
      default: return '#000';
    }
  };

  const getLogLevelName = (level: LogLevel) => {
    return LogLevel[level];
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const clearLogs = async () => {
    Alert.alert(
      'Clear Logs',
      'Are you sure you want to clear all logs?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            await logger.clearLogs();
            loadLogs();
          }
        }
      ]
    );
  };

  const exportLogs = async () => {
    try {
      const logData = await logger.exportLogs();
      await Share.share({
        message: logData,
        title: 'App Logs'
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to export logs');
    }
  };

  if (!visible) return null;

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <ThemedText style={{ fontSize: 20, fontWeight: 'bold' }}>App Logs</ThemedText>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity
            onPress={exportLogs}
            style={{
              backgroundColor: '#007bff',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 4
            }}
          >
            <Text style={{ color: 'white', fontSize: 12 }}>Export</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={clearLogs}
            style={{
              backgroundColor: '#dc3545',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 4
            }}
          >
            <Text style={{ color: 'white', fontSize: 12 }}>Clear</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onClose}
            style={{
              backgroundColor: '#6c757d',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 4
            }}
          >
            <Text style={{ color: 'white', fontSize: 12 }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={loadLogs}
        style={{
          backgroundColor: '#28a745',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 4,
          alignSelf: 'flex-start',
          marginBottom: 16
        }}
      >
        <Text style={{ color: 'white', fontSize: 12 }}>Refresh</Text>
      </TouchableOpacity>

      {loading ? (
        <ThemedText>Loading logs...</ThemedText>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          {logs.length === 0 ? (
            <ThemedText>No logs found</ThemedText>
          ) : (
            logs.map((log, index) => (
              <View key={index} style={{ marginBottom: 12, padding: 8, backgroundColor: '#f8f9fa', borderRadius: 4 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <View
                    style={{
                      backgroundColor: getLogLevelColor(log.level),
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderRadius: 3,
                      marginRight: 8
                    }}
                  >
                    <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                      {getLogLevelName(log.level)}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 10, color: '#6c757d' }}>
                    {formatTimestamp(log.timestamp)}
                  </Text>
                </View>
                
                <Text style={{ fontSize: 12, marginBottom: 4 }}>{log.message}</Text>
                
                {log.userId && (
                  <Text style={{ fontSize: 10, color: '#6c757d' }}>
                    User: {log.userId} | Screen: {log.screen || 'N/A'} | Action: {log.action || 'N/A'}
                  </Text>
                )}
                
                {log.data && (
                  <Text style={{ fontSize: 10, color: '#495057', marginTop: 4 }}>
                    Data: {JSON.stringify(log.data, null, 2)}
                  </Text>
                )}
              </View>
            ))
          )}
        </ScrollView>
      )}
    </ThemedView>
  );
}; 