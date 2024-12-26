import React from 'react';
import { MessageCircle } from 'lucide-react';
import { MessageList } from './chat/MessageList';
import { MessageInput } from './chat/MessageInput';

const Chat: React.FC = () => {
  return (
    <div className="w-80 bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <h2 className="font-semibold">Chat</h2>
        </div>
      </div>
      
      <MessageList />
      <MessageInput />
    </div>
  );
};

export default Chat;