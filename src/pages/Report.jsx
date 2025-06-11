import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

const Report = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsLoading(true);
      const apiUrl = `${config.API_URL}/api/generator-data-csv/`;
      console.log('Downloading CSV from:', apiUrl);
      const response = await axios.get(
        apiUrl, 
        { responseType: 'blob' }
      );
      console.log('CSV download response:', response);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'generator_data_all.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('Failed to download CSV. Please try again.');
      console.error('CSV download error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Report</h2>
      <div className="mb-4">
        <p className="text-gray-300">Download all generator data in CSV format</p>
      </div>
      <button
        onClick={handleDownload}
        disabled={isLoading}
        className={`bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded ${
          isLoading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? 'Downloading...' : 'Download All Data'}
      </button>
    </div>
  );
};

export default Report; 