import * as SecureStore from 'expo-secure-store';
import { create } from 'zustand';

interface AuthToken {
  token: string;
  expiresAt: string;
  expiresIn: string;
}

interface AuthState {
  authToken: AuthToken | null;
  refreshToken: AuthToken | null;
  setAuthData: (authToken: AuthToken, refreshToken: AuthToken) => Promise<void>;
  clearAuthData: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  authToken: null,
  refreshToken: null,

  setAuthData: async (authToken, refreshToken) => {
    set({ authToken, refreshToken });

    await SecureStore.setItemAsync('authToken', JSON.stringify(authToken));
    await SecureStore.setItemAsync('refreshToken', JSON.stringify(refreshToken));
  },

  clearAuthData: async () => {
    set({ authToken: null, refreshToken: null });

    await SecureStore.deleteItemAsync('authToken');
    await SecureStore.deleteItemAsync('refreshToken');
  },
}));
