import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  ActivityDetailsScreen,
  ActivityListScreen,
  CreateActivityScreen,
  EditActivityScreen,
  ProjectDetailsScreen,
  ProjectsScreen,
  ProfileScreen,
} from '../screens';
import { AppStackParamList } from './types';

const Stack = createNativeStackNavigator<AppStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="ActivityList">
      <Stack.Screen name="ActivityList" component={ActivityListScreen} options={{ title: 'Activities' }} />
      <Stack.Screen name="CreateActivity" component={CreateActivityScreen} options={{ title: 'New activity' }} />
      <Stack.Screen name="EditActivity" component={EditActivityScreen} options={{ title: 'Edit activity' }} />
      <Stack.Screen name="ActivityDetails" component={ActivityDetailsScreen} options={{ title: 'Activity' }} />
      <Stack.Screen name="Projects" component={ProjectsScreen} options={{ title: 'Projects' }} />
      <Stack.Screen name="ProjectDetails" component={ProjectDetailsScreen} options={{ title: 'Project' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    </Stack.Navigator>
  );
}
