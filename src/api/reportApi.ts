import axios from 'axios';

const API_BASE_URL = 'https://gen-api-xxpm.onrender.com';

// Fetch generator data as CSV
export const fetchGeneratorDataCSV = async (days: number = 30): Promise<Blob> => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/generator-data-csv/?days=${days}`,
            { responseType: 'blob' }
        );
        return response.data as Blob;
    } catch (error) {
        console.error('Error fetching generator data CSV:', error);
        throw error;
    }
}; 