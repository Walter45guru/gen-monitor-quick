import React, { useState } from 'react';
import Gauge from '../components/Gauge';

// Removed unused generateRandomEngineData function

const Engine = () => {
  // Generate 15 random data points on mount
  // const [dummyData] = useState(() => Array.from({ length: 15 }, generateRandomEngineData));
  // const [currentIndex, setCurrentIndex] = useState(0);
  // const { oilPressure, coolantTemp, fuelLevel, batteryVoltage, chargeAltVoltage } = dummyData[currentIndex];
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prev) => (prev + 1) % dummyData.length);
  //   }, 8000); // 8 seconds
  //   return () => clearInterval(interval);
  // }, [dummyData.length]);

  const [oilPressure] = useState(0);
  const [coolantTemp] = useState(0);
  const [fuelLevel] = useState(0);
  const [batteryVoltage] = useState(0);
  const [chargeAltVoltage] = useState(0);

  return (
    <div className="p-4 bg-gray-800 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Engine Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8">
        <Gauge
          value={oilPressure}
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
          value={coolantTemp}
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
          value={fuelLevel}
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
          value={batteryVoltage}
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
          value={chargeAltVoltage}
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