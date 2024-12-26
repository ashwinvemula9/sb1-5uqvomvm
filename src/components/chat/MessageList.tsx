import React from 'react';
import { useStore } from '../../store/useStore';

export const MessageList: React.FC = () => {
  const messages = useStore((state) => state.messages);

  return (
    <div className="h-[400px] overflow-y-auto p-4 space-y-4">
      {messages.map((msg, i) => (
        <div key={i} className="break-words">
          <span className="font-semibold">{msg.username}: </span>
          <span>{msg.message}</span>
        </div>
      ))}
    </div>
  );
};