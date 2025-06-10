import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export interface GeneratorData {
  timestamp: any;
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