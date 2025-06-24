import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useNotification } from '../../contexts/NotificationContext';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

const PushTokenDisplay: React.FC = () => {
  const { expoPushToken, error, isLoading, retryRegistration, clearError } = useNotification();

  const copyToClipboard = () => {
    if (expoPushToken) {
      Alert.alert(
        'Push Token',
        expoPushToken,
        [
          { text: 'Copy', onPress: () => console.log('Token copied:', expoPushToken) },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
    }
  };

  const handleRetry = async () => {
    clearError();
    await retryRegistration();
  };

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading push token...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Push Notification Token</ThemedText>
      
      {error ? (
        <View style={styles.errorContainer}>
          <ThemedText style={styles.errorText}>
            Error: {error.message}
          </ThemedText>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <ThemedText style={styles.buttonText}>Retry</ThemedText>
          </TouchableOpacity>
        </View>
      ) : expoPushToken ? (
        <View style={styles.tokenContainer}>
          <Text style={styles.tokenText} numberOfLines={3}>
            {expoPushToken}
          </Text>
          <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
            <ThemedText style={styles.buttonText}>Copy Token</ThemedText>
          </TouchableOpacity>
        </View>
      ) : (
        <ThemedText style={styles.noToken}>No push token available</ThemedText>
      )}
      
      <ThemedText style={styles.instructions}>
        Copy this token and use it at https://expo.dev/notifications to test push notifications
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    margin: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  tokenContainer: {
    marginBottom: 12,
  },
  tokenText: {
    fontSize: 12,
    fontFamily: 'monospace',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    padding: 12,
    borderRadius: 4,
    marginBottom: 8,
    color: Colors.light.text,
  },
  copyButton: {
    backgroundColor: Colors.light.tint,
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  errorContainer: {
    marginBottom: 12,
  },
  errorText: {
    color: '#ff4444',
    marginBottom: 8,
    fontSize: 12,
  },
  retryButton: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noToken: {
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 12,
  },
  instructions: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default PushTokenDisplay; 