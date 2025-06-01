import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

export interface GeneratorData {
  timestamp: Timestamp;
  data: {
    "Control Switch Position": number;
    "Genset State": number;
    "Current Fault": number;
    "Current Fault Severity": number;
    "NFPA 110 Fault Register": number;
    "Genset L1-N RMS Voltage": number;
    "Genset L2-N RMS Voltage": number;
    "Genset L3-N RMS Voltage": number;
    "Genset L1-L2 RMS Voltage": number;
    "Genset L2-L3 RMS Voltage": number;
    "Genset L3-L1 RMS Voltage": number;
    "Genset L1 RMS Current": number;
    "Genset L2 RMS Current": number;
    "Genset L3 RMS Current": number;
    "Genset L1 kW": number;
    "Genset L2 kW": number;
    "Genset L3 kW": number;
    "Genset Total kW": number;
    "Genset L1 kVAr": number;
    "Genset L2 kVAr": number;
    "Genset L3 kVAr": number;
    "Genset Total kVAr": number;
    "Genset L1 kVA": number;
    "Genset L2 kVA": number;
    "Genset L3 kVA": number;
    "Genset Total kVA": number;
    "Genset Frequency": number;
    "Battery Voltage": number;
    "Oil Pressure": number;
    "Coolant Temperature": number;
    "Average Engine Speed": number;
    "Start Attempts": number;
    "Engine Running Time": number;
    "Utility L1-N RMS Voltage": number;
    "Utility L2-N RMS Voltage": number;
    "Utility L3-N RMS Voltage": number;
    "Utility L1-L2 RMS Voltage": number;
    "Utility L2-L3 RMS Voltage": number;
    "Utility L3-L1 RMS Voltage": number;
    "Utility Frequency": number;
    "Charging Alternator Voltage": number;
    "Modbus Remote Start": number;
    "Modbus Fault Reset": number;
    "Network Shutdown Modbus Command": number;
  };
}

export const useGeneratorData = (limitCount: number = 1) => {
  const [data, setData] = useState<GeneratorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    const q = query(
      collection(db, 'generator_data'),
      orderBy('timestamp', 'desc'),
      limit(limitCount)
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const latestDoc = snapshot.docs[0];
          setData(latestDoc.data() as GeneratorData);
        }
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching generator data:', err);
        setError(err as Error);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [limitCount]);

  return { data, loading, error };
};

export default useGeneratorData; 