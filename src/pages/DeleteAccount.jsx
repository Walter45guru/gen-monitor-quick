import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteAccount = () => {
  const [hrPassword, setHRPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleAccountDeletion = () => {
    // Replace 'hrsecret' with the HR password verification logic or API call
    if (hrPassword === 'hrsecret') {
      alert('Account deleted successfully.');
      // Perform deletion logic here
      navigate('/login');
    } else {
      setError('Incorrect HR password.');
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Delete Account</h2>
      <p className="mb-4">Enter HR's personal password to confirm deletion:</p>
      <input 
        type="password"
        value={hrPassword}
        onChange={(e) => setHRPassword(e.target.value)}
        placeholder="HR Password"
        className="w-full p-3 border rounded mb-2"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="flex gap-2">
        <button 
          onClick={handleAccountDeletion} 
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Confirm Delete
        </button>
        <button 
          onClick={() => navigate(-1)} 
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount; 