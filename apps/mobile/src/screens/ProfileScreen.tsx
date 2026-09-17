import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { usersApi } from '../api/usersApi';
import { ApiError } from '../api/client';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types';
import { getUserIdFromToken } from '../utils/jwt';

export function ProfileScreen() {
  const { token, logout } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!token) return;
    const userId = getUserIdFromToken(token);
    if (!userId) {
      setIsLoading(false);
      return;
    }
    usersApi.getById(userId, token).then((data) => {
      setUser(data);
      setName(data.name);
      setIsLoading(false);
    });
  }, [token]);

  const handleSave = async () => {
    if (!token || !user) return;
    setIsSubmitting(true);
    try {
      const updated = await usersApi.update(user.id, { name, isActive: user.isActive }, token);
      setUser(updated);
      Alert.alert('Profile updated');
    } catch (error) {
      Alert.alert('Could not update profile', error instanceof ApiError ? error.message : 'Unexpected error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator style={styles.loading} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text style={styles.label}>Email</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={isSubmitting}>
        <Text style={styles.buttonText}>{isSubmitting ? 'Saving...' : 'Save changes'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={logout}>
        <Text style={styles.buttonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  loading: { marginTop: 32 },
  label: { fontWeight: '600', marginBottom: 6, marginTop: 12 },
  email: { color: '#666', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  logoutButton: { backgroundColor: '#dc2626', marginTop: 12 },
  buttonText: { color: '#fff', fontWeight: '600' },
});
