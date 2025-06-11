import React from 'react';
import { useGeneratorData } from '../hooks/useGeneratorData';
import GaugeChart from 'react-gauge-chart';

const Engine = () => {
    const { data, loading, error } = useGeneratorData();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No data available</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Engine Status</h2>
            <div className="grid grid-cols-2 gap-4">
                {/* Oil Pressure */}
                <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Oil Pressure</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <GaugeChart
                                id="oil-pressure"
                                nrOfLevels={20}
                                percent={data.oil_pressure / 100}
                                textColor="#fff"
                                formatTextValue={() => `${data.oil_pressure.toFixed(1)} PSI`}
                            />
                            <p className="text-center mt-2">Pressure</p>
                        </div>
                        <div className="space-y-2">
                            <p>Status: {data.oil_pressure > 0 ? 'Normal' : 'Low'}</p>
                            <p>Last Update: {new Date().toLocaleTimeString()}</p>
                        </div>
                    </div>
                </div>

                {/* Coolant Temperature */}
                <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Coolant Temperature</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <GaugeChart
                                id="coolant-temperature"
                                nrOfLevels={20}
                                percent={data.coolant_temperature / 250}
                                textColor="#fff"
                                formatTextValue={() => `${data.coolant_temperature.toFixed(1)}°F`}
                            />
                            <p className="text-center mt-2">Temperature</p>
                        </div>
                        <div className="space-y-2">
                            <p>Status: {
                                data.coolant_temperature < 140 ? 'Cold' :
                                data.coolant_temperature > 212 ? 'Hot' : 'Normal'
                            }</p>
                            <p>Last Update: {new Date().toLocaleTimeString()}</p>
                        </div>
                    </div>
                </div>

                {/* Battery Voltage */}
                <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Battery Voltage</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <GaugeChart
                                id="battery-voltage"
                                nrOfLevels={20}
                                percent={data.battery_voltage / 24}
                                textColor="#fff"
                                formatTextValue={() => `${data.battery_voltage.toFixed(1)}V`}
                            />
                            <p className="text-center mt-2">Voltage</p>
                        </div>
                        <div className="space-y-2">
                            <p>Status: {
                                data.battery_voltage < 12 ? 'Low' :
                                data.battery_voltage > 14 ? 'High' : 'Normal'
                            }</p>
                            <p>Last Update: {new Date().toLocaleTimeString()}</p>
                        </div>
                    </div>
                </div>

                {/* Engine Speed */}
                <div className="bg-gray-800 p-4 rounded">
                    <h3 className="text-lg font-semibold mb-2">Engine Speed</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <GaugeChart
                                id="engine-speed"
                                nrOfLevels={20}
                                percent={data.average_engine_speed / 3000}
                                textColor="#fff"
                                formatTextValue={() => `${data.average_engine_speed.toFixed(0)} RPM`}
                            />
                            <p className="text-center mt-2">Speed</p>
                        </div>
                        <div className="space-y-2">
                            <p>Status: {
                                data.average_engine_speed === 0 ? 'Stopped' :
                                data.average_engine_speed < 1000 ? 'Low' :
                                data.average_engine_speed > 2500 ? 'High' : 'Normal'
                            }</p>
                            <p>Last Update: {new Date().toLocaleTimeString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Engine; 