import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();

  // Form state
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  // Example submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', userName, password);

    // TODO: Replace with real auth logic
    // If success => navigate to dashboard
    navigate('/generator');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel - gradient background */}
      <div className="hidden md:flex flex-col w-1/2 items-center justify-center bg-gradient-to-tr from-blue-400 to-blue-600 text-white p-10">
        <div className="max-w-md text-center">
          <h1 className="text-3xl font-bold mb-3">Welcome to...</h1>
          <p className="text-sm mb-8 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          {/* Replace with a real company logo if desired */}
          <div className="py-4 border-t border-white/50">
            <h2 className="text-xl font-semibold">COMPANY LOGO</h2>
          </div>
        </div>
      </div>

      {/* Right panel - form container */}
      <div className="flex flex-col w-full md:w-1/2 items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <h2 className="text-2xl font-bold text-gray-700 text-center">Login</h2>
          <p className="text-center text-sm text-gray-500">
            Welcome! Login to get amazing discounts and offers only for you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                User Name
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your username"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-gray-600">
                <input
                  type="checkbox"
                  className="mr-2 focus:ring-0"
                />
                Remember me
              </label>
              <a
                href="/forgot-password"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              LOGIN
            </button>
          </form>

          <div className="text-center text-sm text-gray-500">
            New User?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Signup
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage; 