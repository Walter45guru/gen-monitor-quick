// src/components/AddButton.jsx
import React from 'react';

const AddButton = () => {
  const handleClick = () => {
    alert('Add button clicked!');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-5 right-5 w-14 h-14 bg-red-500 text-white text-3xl rounded-full flex items-center justify-center hover:bg-red-600 transition"
    >
      +
    </button>
  );
};

export default AddButton;
