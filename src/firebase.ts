import { initializeApp } from 'firebase/app';
import { getFirestore, Timestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBzkDbp_QZzbGW18R5qTy_CAmYtlt4b7Fg",
  authDomain: "genrator-data-allocation.firebaseapp.com",
  projectId: "genrator-data-allocation",
  storageBucket: "genrator-data-allocation.firebasestorage.app",
  messagingSenderId: "65264782473",
  appId: "1:65264782473:web:b2947589b0244dc2d28a58",
  measurementId: "G-QJ67QR0PGR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Types for generator data
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

// Export Firebase instances
export { db, auth, analytics };
export default app; 