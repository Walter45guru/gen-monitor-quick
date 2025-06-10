import axios from 'axios';
import config from '../config';

export const fetchGeneratorData = async () => {
  try {
    // Fetch the most recent generator data (assuming backend returns a list, get the first item)
    const response = await axios.get(`${config.API_URL}/api/generator-data-csv/?days=30`, { responseType: 'blob' });
    // Properly read the blob as text
    const text = await (response.data as Blob).text();
    const [header, ...rows] = text.trim().split('\n');
    const fields = header.split(',');
    if (rows.length === 0) return null;
    const latestRow = rows[0].split(',');
    const data: Record<string, string> = {};
    fields.forEach((field: string, i: number) => {
      data[field] = latestRow[i];
    });
    return data;
  } catch (error) {
    console.error('Error fetching generator data:', error);
    return null;
  }
}; 