import { useThemeColor } from '@/hooks/useThemeColor';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Event = {
  title: string;
  color?: string;
  time?: string;
};

interface EventModalProps {
  visible: boolean;
  onClose: () => void;
  events: Event[];
  day: number | null;
  month: string;
  year: number;
}

const EventModal: React.FC<EventModalProps> = ({ visible, onClose, events, day, month, year }) => {
  // Get theme colors
  const textColor = useThemeColor({}, 'text');
  const backgroundColor = useThemeColor({}, 'background');
  const iconColor = useThemeColor({}, 'icon');

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor }]}>
          <View style={styles.header}>
            <Text style={[styles.modalTitle, { color: textColor }]}>{`${month} ${day}, ${year}`}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close-circle" size={28} color={iconColor} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {events.length > 0 ? (
              <FlatList
                data={events}
                keyExtractor={(item, index) => `${item.title}-${index}`}
                renderItem={({ item }) => (
                  <View style={styles.eventItem}>
                    <View style={[styles.eventDot, { backgroundColor: item.color || '#112866' }]} />
                    <View style={styles.eventTextContainer}>
                      <Text style={[styles.eventText, { color: textColor }]}>{item.title}</Text>
                      {item.time && <Text style={[styles.eventTime, { color: iconColor }]}>{item.time}</Text>}
                    </View>
                  </View>
                )}
              />
            ) : (
              <Text style={[styles.noEventText, { color: iconColor }]}>No event set this day</Text>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '85%',
    borderRadius: 15,
    padding: 20,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  content: {
    minHeight: 100,
    justifyContent: 'center',
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  eventDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  eventTextContainer: {
    flex: 1,
  },
  eventText: {
    fontSize: 16,
    fontWeight: '500',
  },
  eventTime: {
    fontSize: 14,
    marginTop: 4,
  },
  noEventText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default EventModal; 