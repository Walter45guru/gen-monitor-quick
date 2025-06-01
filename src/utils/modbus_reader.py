from pymodbus.client import ModbusTcpClient
import json
from typing import List, Dict, Tuple
import logging
import firebase_admin
from firebase_admin import credentials, firestore
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Column headers for each register
COLUMN_HEADERS = [
    "Control Switch Position",
    "Genset State",
    "Current Fault",
    "Current Fault Severity",
    "NFPA 110 Fault Register",
    "Genset L1-N RMS Voltage",
    "Genset L2-N RMS Voltage",
    "Genset L3-N RMS Voltage",
    "Genset L1-L2 RMS Voltage",
    "Genset L2-L3 RMS Voltage",
    "Genset L3-L1 RMS Voltage",
    "Genset L1 RMS Current",
    "Genset L2 RMS Current",
    "Genset L3 RMS Current",
    "Genset L1 kW",
    "Genset L2 kW",
    "Genset L3 kW",
    "Genset Total kW",
    "Genset L1 kVAr",
    "Genset L2 kVAr",
    "Genset L3 kVAr",
    "Genset Total kVAr",
    "Genset L1 kVA",
    "Genset L2 kVA",
    "Genset L3 kVA",
    "Genset Total kVA",
    "Genset Frequency",
    "Battery Voltage",
    "Oil Pressure",
    "Coolant Temperature",
    "Average Engine Speed",
    "Start Attempts",
    "Engine Running Time",
    "Utility L1-N RMS Voltage",
    "Utility L2-N RMS Voltage",
    "Utility L3-N RMS Voltage",
    "Utility L1-L2 RMS Voltage",
    "Utility L2-L3 RMS Voltage",
    "Utility L3-L1 RMS Voltage",
    "Utility Frequency",
    "Charging Alternator Voltage",
    "Modbus Remote Start",
    "Modbus Fault Reset",
    "Network Shutdown Modbus Command"
]

class ModbusReader:
    def __init__(self, host: str, port: int = 502):
        self.client = ModbusTcpClient(host, port)
        
        # Initialize Firebase
        try:
            cred = credentials.Certificate("C:/Users/walte/generator may/genrator-data-allocation-firebase-adminsdk-fbsvc-5a9f6a6d92.json")
            firebase_admin.initialize_app(cred)
            self.db = firestore.client()
            logger.info("Firebase initialized successfully")
        except Exception as e:
            logger.error(f"Failed to initialize Firebase: {str(e)}")
            self.db = None

    def read_data(self) -> Dict[str, any]:
        """Read all registers and return data with column names"""
        try:
            if not self.client.connect():
                logger.error("Failed to connect to Modbus device")
                return {}

            # Read all registers (40001 to 40043)
            result = self.client.read_holding_registers(
                address=40001,
                count=len(COLUMN_HEADERS)
            )
            
            if result.isError():
                logger.error("Error reading registers")
                return {}
            
            # Create a dictionary with column names and values
            data = {}
            for i, value in enumerate(result.registers):
                if i < len(COLUMN_HEADERS):
                    data[COLUMN_HEADERS[i]] = value
            
            return data
            
        except Exception as e:
            logger.error(f"Exception while reading data: {str(e)}")
            return {}
        finally:
            self.client.close()
    
    def save_to_firebase(self, data: Dict[str, any]):
        """Save the data to Firebase"""
        if not self.db:
            logger.error("Firebase not initialized")
            return
        
        try:
            # Create a new document with timestamp
            doc_ref = self.db.collection('generator_data').document()
            doc_ref.set({
                'timestamp': firestore.SERVER_TIMESTAMP,
                'data': data
            })
            logger.info("Data saved to Firebase successfully")
        except Exception as e:
            logger.error(f"Failed to save data to Firebase: {str(e)}")
    
    def to_json(self, data: Dict[str, any]) -> str:
        """Convert the data to a JSON string"""
        return json.dumps(data, indent=2)

# Example usage
if __name__ == "__main__":
    # Create a ModbusReader instance
    reader = ModbusReader("192.168.1.100")  # Replace with your generator's IP address
    
    # Read all data
    data = reader.read_data()
    
    # Save to Firebase
    reader.save_to_firebase(data)
    
    # Convert to JSON and save to file
    json_data = reader.to_json(data)
    with open("generator_data.json", "w") as f:
        f.write(json_data) 