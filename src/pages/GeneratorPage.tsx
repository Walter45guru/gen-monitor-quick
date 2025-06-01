import React, { useState, useEffect } from 'react';
import Gauge from '../components/Gauge';

// Helper to generate a single random data point
const generateRandomData = () => ({
  L1: Math.round(Math.random() * 300),
  L2: Math.round(Math.random() * 300),
  L3: Math.round(Math.random() * 300),
  GEN: Math.round(Math.random() * 300),
});

const GeneratorPage = () => {
  // Generate 15 random data points on mount
  const [dummyData] = useState(() => Array.from({ length: 15 }, generateRandomData));
  const [currentIndex, setCurrentIndex] = useState(0);
  const { L1, L2, L3, GEN } = dummyData[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % dummyData.length);
    }, 8000); // 8 seconds
    return () => clearInterval(interval);
  }, [dummyData.length]);

  return (
    <div className="min-h-screen bg-gray-800 text-white p-4">
      {/* Top Row Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        <Gauge
          value={L1}
          max={300}
          label="L1-N"
          unit=" V"
          zones={[
            { min: 0, max: 50, color: "#ef4444" },
            { min: 50, max: 180, color: "#f59e0b" },
            { min: 180, max: 300, color: "#22c55e" },
          ]}
        />
        <Gauge
          value={L2}
          max={300}
          label="L2-N"
          unit=" V"
          zones={[
            { min: 0, max: 50, color: "#ef4444" },
            { min: 50, max: 180, color: "#f59e0b" },
            { min: 180, max: 300, color: "#22c55e" },
          ]}
        />
        <Gauge
          value={L3}
          max={300}
          label="L3-N"
          unit=" V"
          zones={[
            { min: 0, max: 50, color: "#ef4444" },
            { min: 50, max: 180, color: "#f59e0b" },
            { min: 180, max: 300, color: "#22c55e" },
          ]}
        />
        <Gauge
          value={GEN}
          max={300}
          label="GEN"
          unit=" V"
          zones={[
            { min: 0, max: 50, color: "#ef4444" },
            { min: 50, max: 180, color: "#f59e0b" },
            { min: 180, max: 300, color: "#22c55e" },
          ]}
        />
      </div>
      {/* Middle Row - Grid Parameters */}
      <div className="grid grid-cols-4 gap-4 text-sm text-center">
        <div>
          <h4 className="text-blue-400">Volt</h4>
          <p>L1-L2 ###</p>
          <p>L2-L3 ###</p>
          <p>L3-L1 ###</p>
        </div>
        <div>
          <h4 className="text-blue-400">Amp</h4>
          <p>L1 ###</p>
          <p>L2 ###</p>
          <p>L3 ###</p>
        </div>
        <div>
          <h4 className="text-blue-400">Power</h4>
          <p>kW ###</p>
          <p>kVA ###</p>
          <p>kvar ###</p>
        </div>
        <div>
          <h4 className="text-blue-400">Totals</h4>
          <p>kWh ###</p>
          <p>kVAh ###</p>
          <p>kvarh ###</p>
        </div>
      </div>
      {/* Bottom Row - Status Icons & Buttons */}
      <div className="flex justify-around mt-8 items-center flex-wrap gap-4">
        <div className="text-center">
          <div className="w-12 h-12 bg-red-600 rounded-full mx-auto" />
          <p className="mt-1">STOP</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-green-500 rounded-full mx-auto" />
          <p className="mt-1">START</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-400 rounded-full mx-auto" />
          <p className="mt-1">AUTO</p>
        </div>
        <div className="text-center">
          <div className="w-12 h-12 bg-yellow-500 rounded-full mx-auto" />
          <p className="mt-1">MANUAL</p>
        </div>
      </div>
    </div>
  );
};

export default GeneratorPage; 