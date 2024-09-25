import {create} from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAuthStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  logout: async () => {
    await AsyncStorage.removeItem('user');
    set({ user: null });
  },
  loadUser: async () => {
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      set({ user: JSON.parse(storedUser) });
    }
  },
}));


export default useAuthStore;
