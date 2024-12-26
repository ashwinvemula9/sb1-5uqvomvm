import React from 'react';
import { useStore } from '../../store/useStore';
import { UserStatusIndicator } from './UserStatusIndicator';

export const UserListItems: React.FC = () => {
  const users = useStore((state) => state.users);

  return (
    <div className="p-4">
      <ul className="space-y-2">
        {users.map((user, i) => (
          <li key={i} className="flex items-center gap-2">
            <UserStatusIndicator />
            <span>{user.username}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};