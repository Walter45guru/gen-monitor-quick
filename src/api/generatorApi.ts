import axios from 'axios';

const GENERATOR_IP = '192.168.0.11';

export const fetchGeneratorData = async () => {
  try {
    const response = await axios.get(`http://${GENERATOR_IP}/api/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching generator data:', error);
    return null;
  }
}; 