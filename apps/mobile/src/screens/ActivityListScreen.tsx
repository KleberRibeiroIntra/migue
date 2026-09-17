import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { activitiesApi } from '../api/activitiesApi';
import { useAuth } from '../hooks/useAuth';
import { AppStackParamList } from '../navigation/types';
import { Activity } from '../types';

type Props = NativeStackScreenProps<AppStackParamList, 'ActivityList'>;

export function ActivityListScreen({ navigation }: Props) {
  const { token } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const load = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await activitiesApi.list(token);
      setActivities(data);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Projects')}>
          <Text style={styles.headerLink}>Projects</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.headerLink}>Profile</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          data={activities}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No activities yet.</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('ActivityDetails', { activityId: item.id })}
            >
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemStatus}>{item.status}</Text>
            </TouchableOpacity>
          )}
        />
      )}

      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('CreateActivity')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    padding: 16,
  },
  headerLink: { color: '#2563eb', fontWeight: '600' },
  loading: { marginTop: 32 },
  list: { padding: 16, gap: 8 },
  empty: { textAlign: 'center', marginTop: 32, color: '#666' },
  item: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    marginBottom: 8,
  },
  itemTitle: { fontSize: 16, fontWeight: '600' },
  itemStatus: { color: '#666', marginTop: 4 },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabText: { color: '#fff', fontSize: 28, lineHeight: 30 },
});
