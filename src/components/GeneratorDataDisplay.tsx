import React from 'react';
import useGeneratorData from '../hooks/useGeneratorData';
import { Card, CardContent, Typography, Box, CircularProgress, Alert } from '@mui/material';

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

const GeneratorDataDisplay: React.FC = () => {
  const { data, loading, error } = useGeneratorData();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error">
        Error loading generator data: {error.message}
      </Alert>
    );
  }

  if (!data) {
    return (
      <Alert severity="info">
        No generator data available
      </Alert>
    );
  }

  const generatorData = data as GeneratorData;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Latest Generator Data
        </Typography>
        <Box>
          <Typography variant="body2">
            Timestamp: {new Date(generatorData.timestamp).toLocaleString()}
          </Typography>
          {Object.entries(generatorData).map(([key, value]) => {
            if (key === 'timestamp') return null;
            return (
              <Typography key={key} variant="body2">
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}: {value}
              </Typography>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};

export default GeneratorDataDisplay; 