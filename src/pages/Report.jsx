import React, { useState } from 'react';
import axios from 'axios';
import config from '../config';

const Report = () => {
  const [days, setDays] = useState(1);
  const handleDownload = async () => {
    try {
      const response = await axios.get(`${config.API_URL}/api/generator-data-csv/?days=${days}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `generator_data_last_${days}_days.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('Failed to download CSV.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Report</h2>
      <div className="mb-4">
        <label htmlFor="days" className="mr-2 font-semibold">Select days:</label>
        <select
          id="days"
          value={days}
          onChange={e => setDays(Number(e.target.value))}
          className="bg-gray-800 text-white px-2 py-1 rounded"
        >
          {[...Array(30)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1} day{i === 0 ? '' : 's'}</option>
          ))}
        </select>
      </div>
      <button
        onClick={handleDownload}
        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
      >
        Download CSV
      </button>
    </div>
  );
};

export default Report; 