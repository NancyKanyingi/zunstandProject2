import { create } from "zustand";
import axios from "axios";

const baseURL = "http://localhost:4000/users";

export const userStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get(baseURL);
      set({ users: res.data, loading: false });
    } catch {
      set({ error: "Failed to fetch users", loading: false });
    }
  },

  createUser: async (user) => {
    try {
      const res = await axios.post(baseURL, user);
      set({ users: [...get().users, res.data] });
    } catch {
      set({ error: "Failed to create user" });
    }
  },

  updateUser: async (id, user) => {
    try {
      const numericId = Number(id); // ensure number
      const res = await axios.put(`${baseURL}/${numericId}`, user);
      set({
        users: get().users.map((u) =>
          u.id === numericId ? res.data : u
        ),
      });
    } catch {
      set({ error: "Failed to update user" });
    }
  },

  deleteUser: async (id) => {
    try {
      const numericId = Number(id); // ensure number
      await axios.delete(`${baseURL}/${numericId}`);
      set({
        users: get().users.filter((u) => u.id !== numericId),
      });
    } catch {
      set({ error: "Failed to delete user" });
    }
  },
}));
