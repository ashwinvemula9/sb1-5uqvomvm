import React from 'react';
import { Users } from 'lucide-react';
import { UserListHeader } from './users/UserListHeader';
import { UserListItems } from './users/UserListItems';

const UserList: React.FC = () => {
  return (
    <div className="w-64 bg-white rounded-lg shadow-lg">
      <UserListHeader />
      <UserListItems />
    </div>
  );
};

export default UserList;