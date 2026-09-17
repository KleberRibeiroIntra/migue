import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { projectsApi } from '../api/projectsApi';
import { ApiError } from '../api/client';
import { useAuth } from '../hooks/useAuth';
import { AppStackParamList } from '../navigation/types';
import { Project } from '../types';

type Props = NativeStackScreenProps<AppStackParamList, 'ProjectDetails'>;

export function ProjectDetailsScreen({ route, navigation }: Props) {
  const { token } = useAuth();
  const { projectId } = route.params;
  const [project, setProject] = useState<Project | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!token) return;
    projectsApi.getById(projectId, token).then((data) => {
      setProject(data);
      setName(data.name);
      setDescription(data.description ?? '');
      setIsLoading(false);
    });
  }, [token, projectId]);

  const handleSave = async () => {
    if (!token || !project) return;
    setIsSubmitting(true);
    try {
      await projectsApi.update(
        projectId,
        { name, description: description || null, isActive: project.isActive },
        token,
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert('Could not update project', error instanceof ApiError ? error.message : 'Unexpected error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    if (!token) return;
    Alert.alert('Delete project', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await projectsApi.remove(projectId, token);
            navigation.goBack();
          } catch (error) {
            Alert.alert('Could not delete', error instanceof ApiError ? error.message : 'Unexpected error');
          }
        },
      },
    ]);
  };

  if (isLoading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={isSubmitting}>
        <Text style={styles.buttonText}>{isSubmitting ? 'Saving...' : 'Save changes'}</Text>
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
  deleteButton: { backgroundColor: '#dc2626', marginTop: 12 },
  buttonText: { color: '#fff', fontWeight: '600' },
});
