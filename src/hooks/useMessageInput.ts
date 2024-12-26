import { useState, ChangeEvent, FormEvent } from 'react';
import { socketService } from '../services/socket.service';

export const useMessageInput = () => {
  const [message, setMessage] = useState('');

  const handleMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    socketService.emitChat(message);
    setMessage('');
  };

  return {
    message,
    handleMessageChange,
    handleSubmit
  };
};