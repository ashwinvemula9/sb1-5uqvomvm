import React, { useEffect, useState } from 'react';
import { Pencil } from 'lucide-react';
import Canvas from './components/Canvas';
import Chat from './components/Chat';
import UserList from './components/UserList';
import { socket } from './socket';
import { useStore } from './store/useStore';

function App() {
  const [isJoined, setIsJoined] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const { setUsername, setUsers, addMessage } = useStore();

  useEffect(() => {
    socket.on('users', setUsers);
    socket.on('chat', addMessage);

    return () => {
      socket.off('users', setUsers);
      socket.off('chat', addMessage);
    };
  }, []);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;

    setUsername(usernameInput);
    socket.emit('join', usernameInput);
    setIsJoined(true);
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <div className="flex items-center gap-3 mb-6">
            <Pencil className="w-6 h-6 text-blue-500" />
            <h1 className="text-2xl font-bold">Collaborative Whiteboard</h1>
          </div>
          
          <form onSubmit={handleJoin}>
            <input
              type="text"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Join Whiteboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Pencil className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold">Collaborative Whiteboard</h1>
        </div>

        <div className="flex gap-8">
          <div className="flex-1">
            <Canvas />
          </div>
          <div className="space-y-8">
            <UserList />
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;