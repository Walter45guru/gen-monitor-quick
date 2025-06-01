import React, { useState, useEffect } from 'react';
import Gauge from './Gauge';

const Engine = () => {
  // Simulated sensor values (in a real app, these come from sensors or API data)
  // Replace with real sensor data or websockets, etc.
  const [oilPressure, setOilPressure] = useState(15);
  const [coolantTemp, setCoolantTemp] = useState(80);
  const [fuelLevel, setFuelLevel] = useState(40);
  const [batteryVoltage, setBatteryVoltage] = useState(24);
  const [chargeAltVoltage, setChargeAltVoltage] = useState(27);

  // Example: update sensor data every 2 seconds.
  useEffect(() => {
    const interval = setInterval(() => {
      setOilPressure(Math.round(Math.random() * 50));      // 0-50 PSI
      setCoolantTemp(Math.round(Math.random() * 120));      // 0-120 °C
      setFuelLevel(Math.round(Math.random() * 100));        // 0-100 %
      setBatteryVoltage(Math.round(Math.random() * 30));    // 0-30 V
      setChargeAltVoltage(Math.round(Math.random() * 30));    // 0-30 V
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-gray-800 min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">Engine Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8">
        {/* Oil Pressure gauge: low and high pressures may be dangerous */}
        <Gauge
          value={oilPressure}
          max={50}
          label="Oil Pressure"
          unit=" PSI"
          zones={[
            { min: 0, max: 15, color: "#ef4444" },   // Low – red (danger)
            { min: 15, max: 35, color: "#22c55e" },    // Normal – green
            { min: 35, max: 50, color: "#f59e0b" },    // High – orange (warning)
          ]}
        />

        {/* Coolant Temperature gauge: high temps are unsafe */}
        <Gauge
          value={coolantTemp}
          max={120}
          label="Coolant Temp"
          unit=" °C"
          zones={[
            { min: 0, max: 90, color: "#22c55e" },     // Safe – green
            { min: 90, max: 105, color: "#f59e0b" },     // Warning – orange
            { min: 105, max: 120, color: "#ef4444" },    // Dangerous – red
          ]}
        />

        {/* Fuel Level gauge: lower fuel is dangerous */}
        <Gauge
          value={fuelLevel}
          max={100}
          label="Fuel Level"
          unit=" %"
          zones={[
            { min: 0, max: 20, color: "#ef4444" },      // Low – red
            { min: 20, max: 50, color: "#f59e0b" },       // Moderate – orange
            { min: 50, max: 100, color: "#22c55e" },      // Full – green
          ]}
        />

        {/* Battery Voltage gauge: voltages outside the expected range are risky */}
        <Gauge
          value={batteryVoltage}
          max={30}
          label="Battery Voltage"
          unit=" V"
          zones={[
            { min: 0, max: 18, color: "#ef4444" },      // Low – red
            { min: 18, max: 24, color: "#22c55e" },       // Normal – green
            { min: 24, max: 30, color: "#f59e0b" },       // High – orange
          ]}
        />

        {/* Charge Alt Voltage gauge: similar configuration to battery */}
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
    </div>
  );
};

export default Engine; 