import React from 'react';
import { Users } from 'lucide-react';

export const UserListHeader: React.FC = () => {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5" />
        <h2 className="font-semibold">Online Users</h2>
      </div>
    </div>
  );
};