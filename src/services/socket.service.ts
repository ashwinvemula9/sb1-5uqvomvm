import { io } from 'socket.io-client';
import type { User, ChatMessage, DrawData } from '../types';

export const socket = io('http://localhost:3001');

export const socketService = {
  emitJoin: (username: string) => socket.emit('join', username),
  emitDraw: (drawData: DrawData) => socket.emit('draw', drawData),
  emitClear: () => socket.emit('clear'),
  emitChat: (message: string) => socket.emit('chat', message),
  onUsers: (callback: (users: User[]) => void) => socket.on('users', callback),
  onDraw: (callback: (data: DrawData) => void) => socket.on('draw', callback),
  onClear: (callback: () => void) => socket.on('clear', callback),
  onChat: (callback: (message: ChatMessage) => void) => socket.on('chat', callback),
  cleanup: () => socket.removeAllListeners(),
};