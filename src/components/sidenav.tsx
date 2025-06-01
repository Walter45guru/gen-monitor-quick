// src/components/Sidenav.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/Strathmore-University-Logo-White.png';

const Sidenav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication state if necessary
    // For example: localStorage.removeItem("authToken");
    navigate('/');
  };

  return (
    <aside className="w-64 bg-blue-900 text-white min-h-screen p-4">
      {/* Logo at the top */}
      <div className="flex justify-center mb-8">
        <img src={logo} alt="Logo" className="h-32 w-auto" />
      </div>
      <nav className="flex flex-col space-y-4">
        <Link to="/generator/gauges" className="block px-3 py-2 hover:bg-blue-800 rounded">
          Generator
        </Link>
        <Link to="/engine" className="block px-3 py-2 hover:bg-blue-800 rounded">
          Engine
        </Link>
        <Link to="/alarms" className="block px-3 py-2 hover:bg-blue-800 rounded">
          Alarms
        </Link>
        <Link to="/settings" className="block px-3 py-2 hover:bg-blue-800 rounded">
          Settings
        </Link>
        <Link to="/report" className="block px-3 py-2 hover:bg-blue-800 rounded items-center">
          <span className="mr-2">📄</span> Report
        </Link>
        <Link to="/deleteaccount" className="block px-3 py-2 hover:bg-blue-800 rounded">
          Delete Account
        </Link>
        <button 
          onClick={handleLogout} 
          className="text-left w-full px-3 py-2 hover:bg-blue-800 rounded"
        >
          Log Out
        </button>
      </nav>
    </aside>
  );
};

export default Sidenav;
