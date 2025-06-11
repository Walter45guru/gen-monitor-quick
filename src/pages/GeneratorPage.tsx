import React from 'react';
import { useGeneratorData } from '../hooks/useGeneratorData';
import GaugeChart from 'react-gauge-chart';

const GeneratorPage = () => {
    const { data, loading, error } = useGeneratorData();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No data available</div>;

    // Control switch states
    const isAutoBlinking = data.control_switch_position === 'Auto';
    const isStartGlowing = data.genset_state === 'Running';
    const isStopGlowing = data.genset_state === 'Stop';
    const isManualActive = data.control_switch_position === 'Manual';

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Generator Status</h2>
            
            {/* Control Switch Section */}
            <div className="mb-8 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Control Switch</h3>
                <div className="flex gap-4">
                    <button 
                        className={`px-4 py-2 rounded ${isAutoBlinking ? 'bg-yellow-500 animate-pulse' : 'bg-gray-600'}`}
                    >
                        Auto
                    </button>
                    <button 
                        className={`px-4 py-2 rounded ${isStartGlowing ? 'bg-green-500' : 'bg-gray-600'}`}
                    >
                        Start
                    </button>
                    <button 
                        className={`px-4 py-2 rounded ${isStopGlowing ? 'bg-red-500' : 'bg-gray-600'}`}
                    >
                        Stop
                    </button>
                    <button 
                        className={`px-4 py-2 rounded ${isManualActive ? 'bg-blue-500' : 'bg-gray-600'}`}
                    >
                        Manual
                    </button>
                </div>
            </div>

            {/* Generator Data Section */}
            <div className="grid grid-cols-2 gap-4">
                {/* Phase 1 */}
                <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Phase 1</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <GaugeChart
                                id="phase1-voltage"
                                nrOfLevels={20}
                                percent={data.genset_l1_n_rms_voltage / 480}
                                textColor="#fff"
                                formatTextValue={() => `${data.genset_l1_n_rms_voltage.toFixed(1)}V`}
                            />
                            <p className="text-center mt-2">Voltage (L1-N)</p>
                        </div>
                        <div>
                            <GaugeChart
                                id="phase1-current"
                                nrOfLevels={20}
                                percent={data.genset_l1_rms_current / 1000}
                                textColor="#fff"
                                formatTextValue={() => `${data.genset_l1_rms_current.toFixed(1)}A`}
                            />
                            <p className="text-center mt-2">Current</p>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <p>Power (kW): {data.genset_l1_kw.toFixed(1)}</p>
                        <p>Reactive Power (kVAR): {data.genset_l1_kvar.toFixed(1)}</p>
                        <p>Apparent Power (kVA): {data.genset_l1_kva.toFixed(1)}</p>
                    </div>
                </div>

                {/* Phase 2 */}
                <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Phase 2</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <GaugeChart
                                id="phase2-voltage"
                                nrOfLevels={20}
                                percent={data.genset_l2_n_rms_voltage / 480}
                                textColor="#fff"
                                formatTextValue={() => `${data.genset_l2_n_rms_voltage.toFixed(1)}V`}
                            />
                            <p className="text-center mt-2">Voltage (L2-N)</p>
                        </div>
                        <div>
                            <GaugeChart
                                id="phase2-current"
                                nrOfLevels={20}
                                percent={data.genset_l2_rms_current / 1000}
                                textColor="#fff"
                                formatTextValue={() => `${data.genset_l2_rms_current.toFixed(1)}A`}
                            />
                            <p className="text-center mt-2">Current</p>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <p>Power (kW): {data.genset_l2_kw.toFixed(1)}</p>
                        <p>Reactive Power (kVAR): {data.genset_l2_kvar.toFixed(1)}</p>
                        <p>Apparent Power (kVA): {data.genset_l2_kva.toFixed(1)}</p>
                    </div>
                </div>

                {/* Phase 3 */}
                <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Phase 3</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <GaugeChart
                                id="phase3-voltage"
                                nrOfLevels={20}
                                percent={data.genset_l3_n_rms_voltage / 480}
                                textColor="#fff"
                                formatTextValue={() => `${data.genset_l3_n_rms_voltage.toFixed(1)}V`}
                            />
                            <p className="text-center mt-2">Voltage (L3-N)</p>
                        </div>
                        <div>
                            <GaugeChart
                                id="phase3-current"
                                nrOfLevels={20}
                                percent={data.genset_l3_rms_current / 1000}
                                textColor="#fff"
                                formatTextValue={() => `${data.genset_l3_rms_current.toFixed(1)}A`}
                            />
                            <p className="text-center mt-2">Current</p>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <p>Power (kW): {data.genset_l3_kw.toFixed(1)}</p>
                        <p>Reactive Power (kVAR): {data.genset_l3_kvar.toFixed(1)}</p>
                        <p>Apparent Power (kVA): {data.genset_l3_kva.toFixed(1)}</p>
                    </div>
                </div>

                {/* Total Power */}
                <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Total Power</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <GaugeChart
                                id="total-power"
                                nrOfLevels={20}
                                percent={data.genset_total_kw / 1000}
                                textColor="#fff"
                                formatTextValue={() => `${data.genset_total_kw.toFixed(1)}kW`}
                            />
                            <p className="text-center mt-2">Total Power</p>
                        </div>
                        <div>
                            <GaugeChart
                                id="frequency"
                                nrOfLevels={20}
                                percent={data.genset_frequency / 60}
                                textColor="#fff"
                                formatTextValue={() => `${data.genset_frequency.toFixed(1)}Hz`}
                            />
                            <p className="text-center mt-2">Frequency</p>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2">
                        <p>Total Reactive Power (kVAR): {data.genset_total_kvar.toFixed(1)}</p>
                        <p>Total Apparent Power (kVA): {data.genset_total_kva.toFixed(1)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeneratorPage; 