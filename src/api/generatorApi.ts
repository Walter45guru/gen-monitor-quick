import axios from 'axios';
import config from '../config';

export const fetchGeneratorData = async () => {
  try {
    const response = await axios.get(`${config.API_URL}/api/generator-data/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching generator data:', error);
    return null;
  }
}; 