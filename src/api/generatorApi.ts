import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'https://gen-api-xxpm.onrender.com';

// Enums for status fields
export enum ControlSwitchPosition {
    Off = 0,
    Auto = 1,
    Manual = 2
}

export enum GensetState {
    Off = 0,
    Stop = 1,
    Preheat = 2,
    Precrank = 3,
    Crank = 4,
    StarterDisconnect = 5,
    PreRamp = 6,
    Ramp = 7,
    Running = 8,
    FaultShutdown = 9,
    PrerunSetup = 10,
    RuntimeSetup = 11,
    FactoryTest = 12,
    WaitingForPowerdown = 13
}

export enum FaultSeverity {
    None = 0,
    Warning = 1,
    Shutdown = 2
}

export enum ModbusStatus {
    Inactive = 0,
    Active = 1
}

// Define the type for the generator data
export interface GeneratorData {
    id: number;
    control_switch_position: 'Auto' | 'Manual' | 'Off';
    genset_state: 'Stop' | 'Running' | 'Preheat' | 'Precrank' | 'Crank' | 'StarterDisconnect' | 'PreRamp' | 'Ramp' | 'FaultShutdown' | 'PrerunSetup' | 'RuntimeSetup' | 'FactoryTest' | 'WaitingForPowerdown';
    current_fault: number;
    current_fault_severity: 'Warning' | 'Shutdown' | 'None';
    
    // Generator Voltages
    genset_l1_n_rms_voltage: number;
    genset_l2_n_rms_voltage: number;
    genset_l3_n_rms_voltage: number;
    genset_l1_l2_rms_voltage: number;
    genset_l2_l3_rms_voltage: number;
    genset_l3_l1_rms_voltage: number;
    
    // Generator Currents
    genset_l1_rms_current: number;
    genset_l2_rms_current: number;
    genset_l3_rms_current: number;
    
    // Power Measurements
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
    
    // Engine Parameters
    genset_frequency: number;
    battery_voltage: number;
    oil_pressure: number;
    coolant_temperature: number;
    average_engine_speed: number;
    start_attempts: number;
    
    // Utility Voltages
    utility_l1_n_rms_voltage: number;
    utility_l2_n_rms_voltage: number;
    utility_l3_n_rms_voltage: number;
    utility_l1_l2_rms_voltage: number;
    utility_l2_l3_rms_voltage: number;
    utility_l3_l1_rms_voltage: number;
    
    // Additional Parameters
    charging_alternator_voltage: number;
    modbus_remote_start: 'Inactive' | 'Active';
    modbus_fault_reset: 'Inactive' | 'Active';
    network_shutdown_modbus_command: 'Inactive' | 'Active';
    timestamp: string;
}

// Fetch latest generator data
export const fetchLatestGeneratorData = async (): Promise<GeneratorData | null> => {
    try {
        const response = await axios.get<GeneratorData>(`${API_BASE_URL}/api/latest-generator-data/`);
        if (response.status === 200) {
            return response.data;
        }
        return null;
    } catch (error) {
        console.error('Error fetching latest generator data:', error);
        return null;
    }
};

// Fetch generator data as CSV
export const fetchGeneratorDataCSV = async (days: number = 30): Promise<GeneratorData | null> => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/generator-data-csv/?days=${days}`,
            { responseType: 'blob' }
        );

        const text = await (response.data as Blob).text();
        const [header, ...rows] = text.trim().split('\n');
        const fields = header.split(',');
        
        if (rows.length === 0) return null;

        const latestRow = rows[0].split(',');
        const data: Partial<GeneratorData> = {};
        
        // Map CSV fields to GeneratorData properties
        fields.forEach((field: string, index: number) => {
            const value = latestRow[index];
            const key = field as keyof GeneratorData;
            
            switch (field) {
                case 'id':
                case 'current_fault':
                case 'start_attempts':
                    data[key] = parseInt(value) as any;
                    break;
                case 'control_switch_position':
                case 'genset_state':
                case 'current_fault_severity':
                case 'modbus_remote_start':
                case 'modbus_fault_reset':
                case 'network_shutdown_modbus_command':
                    data[key] = value as any;
                    break;
                default:
                    data[key] = parseFloat(value) as any;
            }
        });

        return data as GeneratorData;
    } catch (error) {
        console.error('Error fetching generator data CSV:', error);
        return null;
    }
};