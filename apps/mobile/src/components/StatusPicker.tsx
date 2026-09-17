import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ACTIVITY_STATUSES, ActivityStatus } from '../types';

interface StatusPickerProps {
  value: ActivityStatus;
  onChange: (status: ActivityStatus) => void;
}

export function StatusPicker({ value, onChange }: StatusPickerProps) {
  return (
    <View style={styles.row}>
      {ACTIVITY_STATUSES.map((status) => (
        <TouchableOpacity
          key={status}
          style={[styles.option, status === value && styles.optionSelected]}
          onPress={() => onChange(status)}
        >
          <Text style={[styles.optionText, status === value && styles.optionTextSelected]}>
            {status}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  option: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  optionSelected: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  optionText: {
    color: '#333',
    fontSize: 13,
  },
  optionTextSelected: {
    color: '#fff',
  },
});
