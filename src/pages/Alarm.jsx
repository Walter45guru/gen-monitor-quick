import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const Alarm = () => {
  const [sensorData] = useState({
    sensors: [],
    last_shutdown_time: "",
    electric_trip: "",
  });

  // In a real application, this data might be fetched from an API/WebSocket.
  // const [sensorData, setSensorData] = useState({
  //   sensors: [
  //     {
  //       component: "Generator",
  //       parameter: "Voltage",
  //       value: 140,
  //       threshold: 180,
  //       unit: "V",
  //       warning: "Voltage too low",
  //     },
  //     {
  //       component: "Engine",
  //       parameter: "Fuel Level",
  //       value: 15,
  //       threshold: 20,
  //       unit: "%",
  //       warning: "Fuel level too low",
  //     },
  //     {
  //       component: "Engine",
  //       parameter: "oil pressure",
  //       value: 11,
  //       threshold: 15,
  //       unit: "%",
  //       warning: "Fuel level too low",
  //     },
  //     {
  //       component: "Engine",
  //       parameter: "Coolant Temp",
  //       value: 210,
  //       threshold: 180,
  //       unit: "%",
  //       warning: "Fuel level too low",
  //     },
  //   ],
  //   lastShutdownTime: "2025-04-12 14:35:00",
  //   electricTrip: "NULL",
  // });
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSensorData(prevData => ({
  //       ...prevData,
  //       sensors: prevData.sensors.map(sensor => {
  //         const variation = Math.random() * 10 - 5;
  //         return {
  //           ...sensor,
  //           value: Math.max(sensor.value + variation, 0)
  //         };
  //       }),
  //     }));
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  // Create alarms dynamically: only include sensors that are below (or above)
  // threshold. Adjust the condition based on the parameter requirements.
  const alarms = sensorData.sensors.filter(sensor => sensor.value < sensor.threshold);

  // CSV generation: Create CSV content dynamically from sensor data alarms.
  const generateCSV = () => {
    const header = 'Component,Parameter,Value,Threshold,Unit,Warning\n';
    const rows = alarms.map(alarm =>
      `${alarm.component},${alarm.parameter},${alarm.value},${alarm.threshold},${alarm.unit},"${alarm.warning}"`
    );
    const csvContent = header + rows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'alarms_report.csv';
    link.click();
  };

  // PDF generation: Create a PDF using jsPDF.
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Alarms Report', 10, 20);
    doc.setFontSize(12);
    let yPosition = 30;
    if (alarms.length > 0) {
      alarms.forEach((alarm, index) => {
        doc.text(
          `${index + 1}. ${alarm.component} - ${alarm.parameter}: ${alarm.value} ${alarm.unit} (Threshold: ${alarm.threshold} ${alarm.unit}) - ${alarm.warning}`,
          10,
          yPosition
        );
        yPosition += 10;
      });
    } else {
      doc.text('No alarms triggered.', 10, yPosition);
      yPosition += 10;
    }
    doc.text(`Last Shutdown Time: ${sensorData.last_shutdown_time}`, 10, yPosition + 10);
    doc.text(`Electric Trip: ${sensorData.electric_trip}`, 10, yPosition + 20);
    doc.save('alarms_report.pdf');
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Alarms & Warnings</h2>
      
      {/* Render alarms dynamically based on sensor data */}
      {alarms.length === 0 ? (
        <p className="mb-4">All sensor readings are within normal ranges.</p>
      ) : (
        <ul className="space-y-4 mb-4">
          {alarms.map((alarm, index) => (
            <li key={index} className="p-4 bg-red-600 rounded">
              <strong>{alarm.component}:</strong> {alarm.parameter} is {alarm.value}{alarm.unit} (Threshold: {alarm.threshold}{alarm.unit}) – {alarm.warning}
            </li>
          ))}
        </ul>
      )}

      {/* Display additional system status */}
      <div className="mb-4">
        <p>
          <span className="font-semibold">Last Shutdown Time:</span> {sensorData.last_shutdown_time}
        </p>
        <p>
          <span className="font-semibold">Electric Trip:</span> {sensorData.electric_trip}
        </p>
      </div>

      {/* Buttons for report downloads */}
      <div className="flex gap-4">
        <button
          onClick={generateCSV}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download CSV
        </button>
        <button
          onClick={generatePDF}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default Alarm; 