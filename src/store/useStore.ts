import { create } from 'zustand';

interface User {
  username: string;
  x: number;
  y: number;
}

interface ChatMessage {
  username: string;
  message: string;
}

interface Store {
  username: string;
  users: User[];
  messages: ChatMessage[];
  setUsername: (username: string) => void;
  setUsers: (users: User[]) => void;
  addMessage: (message: ChatMessage) => void;
}

export const useStore = create<Store>((set) => ({
  username: '',
  users: [],
  messages: [],
  setUsername: (username) => set({ username }),
  setUsers: (users) => set({ users }),
  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message]
  })),
}));