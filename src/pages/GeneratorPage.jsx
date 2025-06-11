import React from 'react';
import useGeneratorData from '../hooks/useGeneratorData';
import Gauge from '../components/Gauge';

const GeneratorPage = () => {
  const { data, loading, error } = useGeneratorData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  // Button highlight logic
  const isAutoBlinking = data.control_switch_position === 'Auto';
  const isStartGlowing = data.genset_state === 'Running';
  const isStopGlowing = data.genset_state === 'Stop';
  const isManualActive = data.control_switch_position === 'Manual';

  return (
    <div className="min-h-screen bg-gray-800 text-white p-4">
      {/* Top Row Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        <Gauge
          value={data.genset_l1_n_rms_voltage || 0}
          max={500}
          label="L1-N"
          unit=" V"
          zones={[
            { min: 0, max: 180, color: "#ef4444" },
            { min: 180, max: 400, color: "#f59e0b" },
            { min: 400, max: 500, color: "#22c55e" },
          ]}
        />
        <Gauge
          value={data.genset_l2_n_rms_voltage || 0}
          max={500}
          label="L2-N"
          unit=" V"
          zones={[
            { min: 0, max: 180, color: "#ef4444" },
            { min: 180, max: 400, color: "#f59e0b" },
            { min: 400, max: 500, color: "#22c55e" },
          ]}
        />
        <Gauge
          value={data.genset_l3_n_rms_voltage || 0}
          max={500}
          label="L3-N"
          unit=" V"
          zones={[
            { min: 0, max: 180, color: "#ef4444" },
            { min: 180, max: 400, color: "#f59e0b" },
            { min: 400, max: 500, color: "#22c55e" },
          ]}
        />
        <Gauge
          value={data.genset_total_kw || 0}
          max={100}
          label="GEN"
          unit=" kW"
          zones={[
            { min: 0, max: 30, color: "#ef4444" },
            { min: 30, max: 70, color: "#f59e0b" },
            { min: 70, max: 100, color: "#22c55e" },
          ]}
        />
      </div>
      {/* Middle Row - Grid Parameters */}
      <div className="grid grid-cols-4 gap-4 text-sm text-center">
        <div>
          <h4 className="text-blue-400">Volt</h4>
          <p>L1-L2 {data.genset_l1_l2_rms_voltage?.toFixed(1) ?? '---'}</p>
          <p>L2-L3 {data.genset_l2_l3_rms_voltage?.toFixed(1) ?? '---'}</p>
          <p>L3-L1 {data.genset_l3_l1_rms_voltage?.toFixed(1) ?? '---'}</p>
        </div>
        <div>
          <h4 className="text-blue-400">Amp</h4>
          <p>L1 {data.genset_l1_rms_current?.toFixed(1) ?? '---'}</p>
          <p>L2 {data.genset_l2_rms_current?.toFixed(1) ?? '---'}</p>
          <p>L3 {data.genset_l3_rms_current?.toFixed(1) ?? '---'}</p>
        </div>
        <div>
          <h4 className="text-blue-400">Power</h4>
          <p>kW {data.genset_total_kw?.toFixed(1) ?? '---'}</p>
          <p>kVA {data.genset_total_kva?.toFixed(1) ?? '---'}</p>
          <p>kVAR {data.genset_total_kvar?.toFixed(1) ?? '---'}</p>
        </div>
        <div>
          <h4 className="text-blue-400">Totals</h4>
          <p>kWh ---</p>
          <p>kVAh ---</p>
          <p>kvarh ---</p>
        </div>
      </div>
      {/* Bottom Row - Status Icons & Buttons */}
      <div className="flex justify-around mt-8 items-center flex-wrap gap-4">
        <div className="text-center">
          <div className={`w-12 h-12 rounded-full mx-auto ${isStopGlowing ? 'bg-red-600 animate-pulse' : 'bg-red-600 opacity-40'}`} />
          <p className="mt-1">STOP</p>
        </div>
        <div className="text-center">
          <div className={`w-12 h-12 rounded-full mx-auto ${isStartGlowing ? 'bg-green-500 animate-pulse' : 'bg-green-500 opacity-40'}`} />
          <p className="mt-1">START</p>
        </div>
        <div className="text-center">
          <div className={`w-12 h-12 rounded-full mx-auto ${isAutoBlinking ? 'bg-gray-400 animate-pulse' : 'bg-gray-400 opacity-40'}`} />
          <p className="mt-1">AUTO</p>
        </div>
        <div className="text-center">
          <div className={`w-12 h-12 rounded-full mx-auto ${isManualActive ? 'bg-yellow-500 animate-pulse' : 'bg-yellow-500 opacity-40'}`} />
          <p className="mt-1">MANUAL</p>
        </div>
      </div>
    </div>
  );
};

export default GeneratorPage; 