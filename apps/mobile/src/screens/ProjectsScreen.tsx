import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator, Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { projectsApi } from '../api/projectsApi';
import { ApiError } from '../api/client';
import { useAuth } from '../hooks/useAuth';
import { AppStackParamList } from '../navigation/types';
import { Project } from '../types';

type Props = NativeStackScreenProps<AppStackParamList, 'Projects'>;

export function ProjectsScreen({ navigation }: Props) {
  const { token } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const load = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await projectsApi.list(token);
      setProjects(data);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );

  const handleCreate = async () => {
    if (!token || !name.trim()) return;
    setIsCreating(true);
    try {
      await projectsApi.create({ name }, token);
      setName('');
      await load();
    } catch (error) {
      Alert.alert('Could not create project', error instanceof ApiError ? error.message : 'Unexpected error');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="New project name"
          value={name}
          onChangeText={setName}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleCreate} disabled={isCreating}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.loading} />
      ) : (
        <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={<Text style={styles.empty}>No projects yet.</Text>}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('ProjectDetails', { projectId: item.id })}
            >
              <Text style={styles.itemTitle}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  form: { flexDirection: 'row', padding: 16, gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  addButtonText: { color: '#fff', fontWeight: '600' },
  loading: { marginTop: 32 },
  list: { paddingHorizontal: 16 },
  empty: { textAlign: 'center', marginTop: 32, color: '#666' },
  item: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e2e2',
    marginBottom: 8,
  },
  itemTitle: { fontSize: 16, fontWeight: '600' },
});
