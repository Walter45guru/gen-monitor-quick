import React, { useEffect, useState } from 'react';
import Gauge from '../components/Gauge';
import config from '../config';

const Engine = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.API_URL}/api/latest-generator-data/`);
        if (!response.ok) {
          throw new Error('Failed to fetch generator data');
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-800">
        <div className="text-white text-xl">No data available</div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-800 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Engine Dashboard</h1>
      {/* Start Attempts Placard */}
      <div className="mb-6 flex justify-center">
        <div className="bg-blue-700 rounded-lg px-6 py-3 shadow-lg text-center">
          <div className="text-lg font-semibold">Start Attempts</div>
          <div className="text-3xl font-bold">{data.start_attempts || 0}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8">
        <Gauge
          value={data.oil_pressure || 0}
          max={50}
          label="Oil Pressure"
          unit=" PSI"
          zones={[
            { min: 0, max: 15, color: "#ef4444" },
            { min: 15, max: 35, color: "#22c55e" },
            { min: 35, max: 50, color: "#f59e0b" },
          ]}
        />
        <Gauge
          value={data.coolant_temperature || 0}
          max={120}
          label="Coolant Temp"
          unit=" °C"
          zones={[
            { min: 0, max: 90, color: "#22c55e" },
            { min: 90, max: 105, color: "#f59e0b" },
            { min: 105, max: 120, color: "#ef4444" },
          ]}
        />
        <Gauge
          value={data.battery_voltage || 0}
          max={15}
          label="Battery"
          unit=" V"
          zones={[
            { min: 0, max: 12, color: "#ef4444" },
            { min: 12, max: 13.5, color: "#22c55e" },
            { min: 13.5, max: 15, color: "#f59e0b" },
          ]}
        />
        <Gauge
          value={data.charging_alternator_voltage || 0}
          max={15}
          label="Alt. Voltage"
          unit=" V"
          zones={[
            { min: 0, max: 12, color: "#ef4444" },
            { min: 12, max: 13.5, color: "#22c55e" },
            { min: 13.5, max: 15, color: "#f59e0b" },
          ]}
        />
        <Gauge
          value={data.average_engine_speed || 0}
          max={3000}
          label="Engine Speed"
          unit=" RPM"
          zones={[
            { min: 0, max: 1000, color: "#ef4444" },
            { min: 1000, max: 2500, color: "#22c55e" },
            { min: 2500, max: 3000, color: "#f59e0b" },
          ]}
        />
      </div>
      {/* Data History Table */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Data History (last 2 minutes)</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs text-center bg-gray-900 rounded">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-2 py-1">#</th>
                <th className="px-2 py-1">Oil PSI</th>
                <th className="px-2 py-1">Coolant °C</th>
                <th className="px-2 py-1">Fuel %</th>
                <th className="px-2 py-1">Battery V</th>
                <th className="px-2 py-1">Alt. V</th>
              </tr>
            </thead>
            <tbody>
              {/* {dummyData.map((row, idx) => (
                <tr key={idx} className={idx === currentIndex ? 'bg-blue-800 font-bold' : 'bg-gray-800'}>
                  <td className="px-2 py-1">{idx + 1}</td>
                  <td className="px-2 py-1">{row.oilPressure}</td>
                  <td className="px-2 py-1">{row.coolantTemp}</td>
                  <td className="px-2 py-1">{row.fuelLevel}</td>
                  <td className="px-2 py-1">{row.batteryVoltage}</td>
                  <td className="px-2 py-1">{row.chargeAltVoltage}</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Engine; 