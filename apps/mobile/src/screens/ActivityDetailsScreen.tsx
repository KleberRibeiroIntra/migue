import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { activitiesApi } from '../api/activitiesApi';
import { ApiError } from '../api/client';
import { useAuth } from '../hooks/useAuth';
import { AppStackParamList } from '../navigation/types';
import { Activity } from '../types';

type Props = NativeStackScreenProps<AppStackParamList, 'ActivityDetails'>;

export function ActivityDetailsScreen({ route, navigation }: Props) {
  const { token } = useAuth();
  const { activityId } = route.params;
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!token) return;
      setIsLoading(true);
      activitiesApi
        .getById(activityId, token)
        .then(setActivity)
        .finally(() => setIsLoading(false));
    }, [token, activityId]),
  );

  const handleDelete = () => {
    if (!token) return;
    Alert.alert('Delete activity', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await activitiesApi.remove(activityId, token);
            navigation.goBack();
          } catch (error) {
            Alert.alert('Could not delete', error instanceof ApiError ? error.message : 'Unexpected error');
          }
        },
      },
    ]);
  };

  if (isLoading || !activity) {
    return <ActivityIndicator style={styles.loading} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{activity.title}</Text>
      <Text style={styles.status}>{activity.status}</Text>
      {activity.description ? <Text style={styles.description}>{activity.description}</Text> : null}

      {activity.durationMinutes != null && (
        <Text style={styles.meta}>Duration: {activity.durationMinutes} min</Text>
      )}
      {activity.selfScore != null && <Text style={styles.meta}>Self score: {activity.selfScore}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('EditActivity', { activityId })}
      >
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  loading: { marginTop: 32 },
  title: { fontSize: 22, fontWeight: '700' },
  status: { color: '#2563eb', fontWeight: '600', marginTop: 4 },
  description: { marginTop: 12, color: '#333' },
  meta: { marginTop: 8, color: '#666' },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  deleteButton: { backgroundColor: '#dc2626', marginTop: 12 },
  buttonText: { color: '#fff', fontWeight: '600' },
});
