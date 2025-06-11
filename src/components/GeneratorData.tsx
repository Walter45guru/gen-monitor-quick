import React, { useState, useEffect } from 'react';
import { fetchLatestGeneratorData, GeneratorData } from '../api/generatorApi';

const GeneratorDataComponent: React.FC = () => {
    const [data, setData] = useState<GeneratorData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const latestData = await fetchLatestGeneratorData();
                setData(latestData);
                setError(null);
            } catch (err) {
                setError('Failed to load generator data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data) return <div>No data available</div>;

    return (
        <div>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
};

export default GeneratorDataComponent; 