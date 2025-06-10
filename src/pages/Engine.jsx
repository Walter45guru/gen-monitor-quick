import React, { useEffect, useState } from 'react';
import Gauge from '../components/Gauge';
import { fetchGeneratorData } from '../api/generatorApi';

// Removed unused generateRandomEngineData function

const Engine = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchGeneratorData();
      setData(result);
    };
    fetchData();
    const interval = setInterval(fetchData, 8000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div>Loading...</div>;

  const {
    oil_pressure,
    coolant_temperature,
    fuel_level,
    battery_voltage,
    charging_alternator_voltage,
    start_attempts
  } = data;

  return (
    <div className="p-4 bg-gray-800 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Engine Dashboard</h1>
      {/* Start Attempts Placard */}
      <div className="mb-6 flex justify-center">
        <div className="bg-blue-700 rounded-lg px-6 py-3 shadow-lg text-center">
          <div className="text-lg font-semibold">Start Attempts</div>
          <div className="text-3xl font-bold">{start_attempts}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8">
        <Gauge
          value={oil_pressure}
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
          value={coolant_temperature}
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
          value={fuel_level}
          max={100}
          label="Fuel Level"
          unit=" %"
          zones={[
            { min: 0, max: 20, color: "#ef4444" },
            { min: 20, max: 50, color: "#f59e0b" },
            { min: 50, max: 100, color: "#22c55e" },
          ]}
        />
        <Gauge
          value={battery_voltage}
          max={30}
          label="Battery Voltage"
          unit=" V"
          zones={[
            { min: 0, max: 18, color: "#ef4444" },
            { min: 18, max: 24, color: "#22c55e" },
            { min: 24, max: 30, color: "#f59e0b" },
          ]}
        />
        <Gauge
          value={charging_alternator_voltage}
          max={30}
          label="Alt. Voltage"
          unit=" V"
          zones={[
            { min: 0, max: 18, color: "#ef4444" },
            { min: 18, max: 24, color: "#22c55e" },
            { min: 24, max: 30, color: "#f59e0b" },
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