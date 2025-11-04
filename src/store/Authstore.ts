import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

interface AuthToken {
  token: string;
  expiresAt: string;
  expiresIn: string;
}

interface AuthState {
  authToken: AuthToken | null;
  refreshToken: AuthToken | null;
  isLogin: boolean;
  setAuthData: (authToken: AuthToken, refreshToken: AuthToken) => Promise<void>;
  clearAuthData: () => Promise<void>;
  loadAuthData: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authToken: null,
  refreshToken: null,
  isLogin: false,

  setAuthData: async (authToken, refreshToken) => {
    set({ authToken, refreshToken, isLogin: true });
    await SecureStore.setItemAsync('authToken', JSON.stringify(authToken));
    await SecureStore.setItemAsync('refreshToken', JSON.stringify(refreshToken));
    await AsyncStorage.setItem('isLogin', 'true');
  },

  clearAuthData: async () => {
    set({ authToken: null, refreshToken: null, isLogin: false });
    await SecureStore.deleteItemAsync('authToken');
    await SecureStore.deleteItemAsync('refreshToken');
    await AsyncStorage.setItem('isLogin', 'false');
  },

  loadAuthData: async () => {
    const storedAuth = await SecureStore.getItemAsync('authToken');
    const storedRefresh = await SecureStore.getItemAsync('refreshToken');
    const storedIsLogin = await AsyncStorage.getItem('isLogin');

    set({
      authToken: storedAuth ? JSON.parse(storedAuth) : null,
      refreshToken: storedRefresh ? JSON.parse(storedRefresh) : null,
      isLogin: storedIsLogin === 'true',
    });
  },
}));

