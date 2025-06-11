import React from 'react';
import useGeneratorData from '../hooks/useGeneratorData';
import Gauge from '../components/Gauge';

const Engine = () => {
  const { data, loading, error } = useGeneratorData();

  // Debug log to check what data is received
  console.log('EnginePage data:', data);

  // Always define engineData, using defaults if no data
  const engineData = {
    oilPressure: data?.oil_pressure || 0,
    coolantTemperature: data?.coolant_temperature || 0,
    batteryVoltage: data?.battery_voltage || 0,
    engineSpeed: data?.average_engine_speed || 0,
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Engine</h2>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <Gauge
          value={engineData.oilPressure}
          max={100}
          label="Oil Pressure"
          unit=" PSI"
          zones={[
            { min: 0, max: 10, color: "#ef4444" },
            { min: 10, max: 30, color: "#f59e0b" },
            { min: 30, max: 100, color: "#22c55e" },
          ]}
        />
        <Gauge
          value={engineData.coolantTemperature}
          max={250}
          label="Coolant Temp"
          unit=" °F"
          zones={[
            { min: 0, max: 140, color: "#ef4444" },
            { min: 140, max: 212, color: "#22c55e" },
            { min: 212, max: 250, color: "#f59e0b" },
          ]}
        />
        <Gauge
          value={engineData.batteryVoltage}
          max={15}
          label="Battery Voltage"
          unit=" V"
          zones={[
            { min: 0, max: 11, color: "#ef4444" },
            { min: 11, max: 13, color: "#f59e0b" },
            { min: 13, max: 15, color: "#22c55e" },
          ]}
        />
        <Gauge
          value={engineData.engineSpeed}
          max={3000}
          label="Engine Speed"
          unit=" RPM"
          zones={[
            { min: 0, max: 600, color: "#ef4444" },
            { min: 600, max: 1800, color: "#22c55e" },
            { min: 1800, max: 3000, color: "#f59e0b" },
          ]}
        />
      </div>
    </div>
  );
};

export default Engine; 