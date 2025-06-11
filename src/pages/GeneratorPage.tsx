import React from 'react';
import { useGeneratorData } from '../hooks/useGeneratorData';
import Gauge from '../components/Gauge';

const GeneratorPage = () => {
    const { data, loading, error } = useGeneratorData();

    // Debug log to check what data is received
    console.log('GeneratorPage data:', data);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No data available</div>;

    return (
        <div className="min-h-screen bg-gray-800 text-white p-4">
            <h2 className="text-2xl font-bold mb-4">Generator</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* L1-N Gauge */}
                <div className="flex flex-col items-center">
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
                    <div className="mt-2 text-center text-blue-300">
                        Volt<br />
                        L1-L2 {data.genset_l1_l2_rms_voltage?.toFixed(1) ?? '---'}<br />
                        L2-L3 {data.genset_l2_l3_rms_voltage?.toFixed(1) ?? '---'}<br />
                        L3-L1 {data.genset_l3_l1_rms_voltage?.toFixed(1) ?? '---'}
                    </div>
                </div>
                {/* L2-N Gauge */}
                <div className="flex flex-col items-center">
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
                    <div className="mt-2 text-center text-blue-300">
                        Amp<br />
                        L1 {data.genset_l1_rms_current?.toFixed(1) ?? '---'}<br />
                        L2 {data.genset_l2_rms_current?.toFixed(1) ?? '---'}<br />
                        L3 {data.genset_l3_rms_current?.toFixed(1) ?? '---'}
                    </div>
                </div>
                {/* L3-N Gauge */}
                <div className="flex flex-col items-center">
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
                    <div className="mt-2 text-center text-blue-300">
                        Power<br />
                        kW {data.genset_total_kw?.toFixed(1) ?? '---'}<br />
                        kVA {data.genset_total_kva?.toFixed(1) ?? '---'}<br />
                        kVAR {data.genset_total_kvar?.toFixed(1) ?? '---'}
                    </div>
                </div>
                {/* GEN Gauge */}
                <div className="flex flex-col items-center">
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
                    <div className="mt-2 text-center text-blue-300">
                        Totals<br />
                        kWh ---<br />
                        kVAh ---<br />
                        kVARh ---
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneratorPage; 