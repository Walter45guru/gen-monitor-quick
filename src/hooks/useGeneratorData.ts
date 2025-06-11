import { useState, useEffect } from 'react';
import { fetchLatestGeneratorData, GeneratorData } from '../api/generatorApi';

export const useGeneratorData = () => {
    const [data, setData] = useState<GeneratorData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchLatestGeneratorData();
                setData(result);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        };

        // Load data immediately
        loadData();

        // Set up periodic updates every 10 seconds
        const interval = setInterval(loadData, 10000);

        // Cleanup on unmount
        return () => clearInterval(interval);
    }, []);

    // Helper functions to get specific data for different pages
    const getEngineData = () => {
        if (!data) return null;
        return {
            oilPressure: data.oil_pressure,
            coolantTemperature: data.coolant_temperature,
            batteryVoltage: data.battery_voltage,
            engineSpeed: data.average_engine_speed
        };
    };

    const getGeneratorData = () => {
        if (!data) return null;
        return {
            power: data.genset_total_kw,
            voltage: data.genset_l1_n_rms_voltage,
            current: data.genset_l1_rms_current,
            frequency: data.genset_frequency
        };
    };

    return {
        data,
        loading,
        error,
        getEngineData,
        getGeneratorData
    };
};

export default useGeneratorData; 