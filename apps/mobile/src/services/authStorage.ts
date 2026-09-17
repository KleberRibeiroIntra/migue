import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'migue.token';

export const authStorage = {
  getToken: () => AsyncStorage.getItem(TOKEN_KEY),
  setToken: (token: string) => AsyncStorage.setItem(TOKEN_KEY, token),
  clearToken: () => AsyncStorage.removeItem(TOKEN_KEY),
};
