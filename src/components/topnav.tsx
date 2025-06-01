// src/components/TopNav.jsx
import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface TopNavProps {}

const TopNav: React.FC<TopNavProps> = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-black shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-white">Generator Monitor</h1>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="text-gray-200 text-sm">{user.email}</span>
            )}
            <button
              onClick={logout}
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
