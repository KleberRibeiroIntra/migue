import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { activitiesApi } from '../api/activitiesApi';
import { ApiError } from '../api/client';
import { StatusPicker } from '../components/StatusPicker';
import { useAuth } from '../hooks/useAuth';
import { AppStackParamList } from '../navigation/types';
import { Activity, ActivityStatus } from '../types';

type Props = NativeStackScreenProps<AppStackParamList, 'EditActivity'>;

export function EditActivityScreen({ route, navigation }: Props) {
  const { token } = useAuth();
  const { activityId } = route.params;
  const [activity, setActivity] = useState<Activity | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<ActivityStatus>('Planned');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!token) return;
    activitiesApi.getById(activityId, token).then((data) => {
      setActivity(data);
      setTitle(data.title);
      setDescription(data.description ?? '');
      setStatus(data.status);
      setIsLoading(false);
    });
  }, [token, activityId]);

  const handleSubmit = async () => {
    if (!token || !activity) return;
    setIsSubmitting(true);
    try {
      await activitiesApi.update(
        activityId,
        {
          projectId: activity.projectId,
          title,
          description: description || null,
          status,
          startedAt: activity.startedAt,
          finishedAt: activity.finishedAt,
          durationMinutes: activity.durationMinutes,
          selfScore: activity.selfScore,
          selfScoreComment: activity.selfScoreComment,
        },
        token,
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert('Could not update activity', error instanceof ApiError ? error.message : 'Unexpected error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator style={styles.loading} />;
  }

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
        <Text style={styles.buttonText}>{isSubmitting ? 'Saving...' : 'Save changes'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  loading: { marginTop: 32 },
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
