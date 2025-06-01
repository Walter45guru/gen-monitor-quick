import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Sample data for the power output chart
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

  // Sample data for the fuel consumption chart
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

  return (
    <div className="space-y-6 p-6 bg-black min-h-screen">
      {/* Status Overview */}
      <div className="bg-black rounded-lg p-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Generator Status</h2>
            <p className="text-gray-400">Last updated: 2 minutes ago</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="h-3 w-3 rounded-full bg-green-500"></span>
            <span className="text-green-500 font-medium">Running</span>
          </div>
        </div>
      </div>

      {/* Gauges */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Gauge
          value={75}
          max={100}
          label="Power Output"
          unit="kW"
          zones={[{ min: 0, max: 100, color: "#0ea5e9" }]}
        />
        <Gauge
          value={85}
          max={100}
          label="Fuel Level"
          unit="%"
          zones={[{ min: 0, max: 100, color: "#22c55e" }]}
        />
        <Gauge
          value={92}
          max={100}
          label="Battery"
          unit="%"
          zones={[{ min: 0, max: 100, color: "#eab308" }]}
        />
        <Gauge
          value={45}
          max={100}
          label="Load"
          unit="%"
          zones={[{ min: 0, max: 100, color: "#ef4444" }]}
        />
      </div>

      {/* Charts and Events */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
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
                legend: {
                  ...chartOptions.plugins.legend,
                  position: 'top' as const,
                },
              }
            }} 
            data={fuelChartData} 
          />
        </div>
      </div>

      {/* Maintenance and Alerts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-black shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-300 mb-4">Maintenance Schedule</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-300">Oil Change</p>
                <p className="text-sm text-gray-500">Due in 5 days</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium text-yellow-400 bg-yellow-900 rounded-full">Upcoming</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-300">Filter Replacement</p>
                <p className="text-sm text-gray-500">Due in 12 days</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium text-gray-400 bg-gray-900 rounded-full">Scheduled</span>
            </div>
          </div>
        </div>

        <div className="bg-black shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-300 mb-4">Recent Events & Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-green-900 flex items-center justify-center">
                  <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-300">Generator started successfully</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-yellow-900 flex items-center justify-center">
                  <svg className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-300">Low fuel warning</p>
                <p className="text-sm text-gray-500">5 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 