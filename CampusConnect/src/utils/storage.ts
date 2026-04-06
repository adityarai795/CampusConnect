import { STORAGE_KEYS } from "../constants";

// Polyfill for AsyncStorage - use fallback if module not installed
let AsyncStorage: any = {
  setItem: async (key: string, value: string) => Promise.resolve(),
  getItem: async (key: string) => Promise.resolve(null),
  removeItem: async (key: string) => Promise.resolve(),
  clear: async () => Promise.resolve(),
};

try {
  AsyncStorage =
    require("@react-native-async-storage/async-storage").default ||
    AsyncStorage;
} catch (e) {
  // Use fallback polyfill
  console.warn("AsyncStorage not available, using polyfill");
}

// Generic Storage Functions
export const storage = {
  setItem: async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving to storage: ${key}`, error);
    }
  },

  getItem: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error reading from storage: ${key}`, error);
      return null;
    }
  },

  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from storage: ${key}`, error);
    }
  },

  clear: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing storage", error);
    }
  },
};

// Auth Storage Functions
export const authStorage = {
  setToken: (token: string) => storage.setItem(STORAGE_KEYS.token, token),
  getToken: () => storage.getItem(STORAGE_KEYS.token),
  removeToken: () => storage.removeItem(STORAGE_KEYS.token),

  setUser: (user: any) => storage.setItem(STORAGE_KEYS.user, user),
  getUser: () => storage.getItem(STORAGE_KEYS.user),
  removeUser: () => storage.removeItem(STORAGE_KEYS.user),

  clearAuth: async () => {
    await authStorage.removeToken();
    await authStorage.removeUser();
  },
};

// Theme Storage Functions
export const themeStorage = {
  setTheme: (theme: string) => storage.setItem(STORAGE_KEYS.theme, theme),
  getTheme: () => storage.getItem(STORAGE_KEYS.theme),
};
