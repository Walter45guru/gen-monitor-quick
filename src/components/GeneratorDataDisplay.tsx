import React from 'react';
import useGeneratorData from '../hooks/useGeneratorData';
import { Card, CardContent, Typography, Box, CircularProgress, Alert } from '@mui/material';

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

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Latest Generator Data
        </Typography>
        <Box>
          <Typography variant="body2">
            Timestamp: {data.timestamp.toDate().toLocaleString()}
          </Typography>
          {Object.entries(data.data).map(([key, value]) => (
            <Typography key={key} variant="body2">
              {key}: {value}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default GeneratorDataDisplay; 