import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Gauge from './Gauge';
import config from '../config';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GeneratorData {
  control_switch_position: string;
  genset_state: string;
  current_fault: number;
  current_fault_severity: string;
  genset_l1_n_rms_voltage: number;
  genset_l2_n_rms_voltage: number;
  genset_l3_n_rms_voltage: number;
  genset_l1_l2_rms_voltage: number;
  genset_l2_l3_rms_voltage: number;
  genset_l3_l1_rms_voltage: number;
  genset_l1_rms_current: number;
  genset_l2_rms_current: number;
  genset_l3_rms_current: number;
  genset_l1_kw: number;
  genset_l2_kw: number;
  genset_l3_kw: number;
  genset_total_kw: number;
  genset_l1_kvar: number;
  genset_l2_kvar: number;
  genset_l3_kvar: number;
  genset_total_kvar: number;
  genset_l1_kva: number;
  genset_l2_kva: number;
  genset_l3_kva: number;
  genset_total_kva: number;
  genset_frequency: number;
  battery_voltage: number;
  oil_pressure: number;
  coolant_temperature: number;
  average_engine_speed: number;
  start_attempts: number;
  utility_l1_n_rms_voltage: number;
  utility_l2_n_rms_voltage: number;
  utility_l3_n_rms_voltage: number;
  utility_l1_l2_rms_voltage: number;
  utility_l2_l3_rms_voltage: number;
  utility_l3_l1_rms_voltage: number;
  charging_alternator_voltage: number;
  modbus_remote_start: string;
  modbus_fault_reset: string;
  network_shutdown_modbus_command: string;
  timestamp: string;
}

const Dashboard = () => {
  const [generatorData, setGeneratorData] = useState<GeneratorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.API_URL}/api/latest-generator-data/`);
        if (!response.ok) {
          throw new Error('Failed to fetch generator data');
        }
        const data = await response.json();
        setGeneratorData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Sample data for the power output chart (you can replace this with real historical data later)
  const powerChartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Power Output (kW)',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        tension: 0.4,
      },
    ],
  };

  // Sample data for the fuel consumption chart (you can replace this with real historical data later)
  const fuelChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Fuel Consumption (L)',
        data: [120, 150, 180, 90, 160, 140, 130],
        borderColor: '#22c55e',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#e5e7eb',
        },
      },
      title: {
        display: true,
        text: 'Generator Power Output',
        color: '#e5e7eb',
      },
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#e5e7eb',
        },
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#e5e7eb',
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="text-red-500 text-xl">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-black min-h-screen">
      {/* Status Overview */}
      <div className="bg-black rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Generator Status</h2>
            <p className="text-gray-400">
              Last updated: {generatorData ? new Date(generatorData.timestamp).toLocaleString() : 'N/A'}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`h-3 w-3 rounded-full ${
              generatorData?.genset_state === 'Running' ? 'bg-green-500' : 'bg-red-500'
            }`}></span>
            <span className={`font-medium ${
              generatorData?.genset_state === 'Running' ? 'text-green-500' : 'text-red-500'
            }`}>
              {generatorData?.genset_state || 'Unknown'}
            </span>
          </div>
        </div>
      </div>

      {/* Gauges */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Gauge
          value={generatorData?.genset_total_kw || 0}
          max={100}
          label="Power Output"
          unit="kW"
          zones={[{ min: 0, max: 100, color: "#0ea5e9" }]}
        />
        <Gauge
          value={generatorData?.battery_voltage || 0}
          max={15}
          label="Battery"
          unit="V"
          zones={[{ min: 0, max: 15, color: "#eab308" }]}
        />
        <Gauge
          value={generatorData?.coolant_temperature || 0}
          max={120}
          label="Coolant"
          unit="°C"
          zones={[{ min: 0, max: 120, color: "#ef4444" }]}
        />
        <Gauge
          value={generatorData?.oil_pressure || 0}
          max={100}
          label="Oil Pressure"
          unit="PSI"
          zones={[{ min: 0, max: 100, color: "#22c55e" }]}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-black shadow rounded-lg p-6">
          <Line options={chartOptions} data={powerChartData} />
        </div>
        <div className="bg-black shadow rounded-lg p-6">
          <Line 
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  ...chartOptions.plugins.title,
                  text: 'Weekly Fuel Consumption'
                },
              }
            }} 
            data={fuelChartData} 
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 