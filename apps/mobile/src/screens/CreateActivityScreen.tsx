import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { activitiesApi } from '../api/activitiesApi';
import { ApiError } from '../api/client';
import { StatusPicker } from '../components/StatusPicker';
import { useAuth } from '../hooks/useAuth';
import { AppStackParamList } from '../navigation/types';
import { ActivityStatus } from '../types';

type Props = NativeStackScreenProps<AppStackParamList, 'CreateActivity'>;

export function CreateActivityScreen({ navigation }: Props) {
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ActivityStatus>('Planned');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!token) return;
    if (!title.trim()) {
      Alert.alert('Title is required');
      return;
    }
    setIsSubmitting(true);
    try {
      await activitiesApi.create({ title, description: description || null, status }, token);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Could not create activity', error instanceof ApiError ? error.message : 'Unexpected error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Status</Text>
      <StatusPicker value={status} onChange={setStatus} />

      <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={isSubmitting}>
        <Text style={styles.buttonText}>{isSubmitting ? 'Saving...' : 'Create activity'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: '600', marginBottom: 6, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  multiline: { minHeight: 80, textAlignVertical: 'top' },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: { color: '#fff', fontWeight: '600' },
});
