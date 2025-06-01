 // src/pages/Settings.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  // State for threshold settings (example values)
  const [voltageThreshold, setVoltageThreshold] = useState(220);
  const [fuelThreshold, setFuelThreshold] = useState(20);
  const [message, setMessage] = useState("");

  // State for account termination modal
  const [showTerminateModal, setShowTerminateModal] = useState(false);
  const [hrPassword, setHRPassword] = useState("");
  const [terminateError, setTerminateError] = useState("");

  // Handler for updating threshold settings (simulate saving to the backend)
  const handleUpdateSettings = (e) => {
    e.preventDefault();
    // Here you would normally call an API to save the threshold settings
    setMessage("Threshold settings updated successfully.");
    setTimeout(() => setMessage(""), 3000);
  };

  // Handler for account termination
  const handleTerminateAccount = () => {
    // Replace 'hrsecret' with your real HR password validation logic or API call.
    if (hrPassword === "hrsecret") {
      alert("Account terminated successfully.");
      // Perform termination logic (e.g. API call to delete account) and then navigate to login
      navigate("/login");
    } else {
      setTerminateError("Incorrect HR password.");
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>

      {/* Threshold Settings Section */}
      <section className="mb-10 bg-gray-800 p-6 rounded shadow">
        <h3 className="text-2xl font-semibold mb-4">Threshold Settings</h3>
        <form onSubmit={handleUpdateSettings} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="voltageThreshold">
              Voltage Threshold (V)
            </label>
            <input
              id="voltageThreshold"
              type="number"
              value={voltageThreshold}
              onChange={(e) => setVoltageThreshold(Number(e.target.value))}
              className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="fuelThreshold">
              Fuel Level Threshold (%)
            </label>
            <input
              id="fuelThreshold"
              type="number"
              value={fuelThreshold}
              onChange={(e) => setFuelThreshold(Number(e.target.value))}
              className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded font-bold transition"
          >
            Update Settings
          </button>
          {message && <p className="text-green-400 text-center">{message}</p>}
        </form>
      </section>

      {/* Account Termination Section */}
      <section className="bg-gray-800 p-6 rounded shadow">
        <h3 className="text-2xl font-semibold mb-4">Account Termination</h3>
        <p className="mb-4 text-sm text-gray-300">
          Warning: Terminating your account is irreversible. Please proceed with caution.
        </p>
        <button
          onClick={() => setShowTerminateModal(true)}
          className="py-3 px-4 bg-red-500 hover:bg-red-600 rounded font-bold transition"
        >
          Terminate Account
        </button>
      </section>

      {/* Account Termination Modal */}
      {showTerminateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-6 rounded shadow-lg max-w-sm w-full">
            <h4 className="text-xl font-bold mb-4">Confirm Account Termination</h4>
            <p className="mb-4">Enter HR's personal password to confirm account termination:</p>
            <input
              type="password"
              value={hrPassword}
              onChange={(e) => setHRPassword(e.target.value)}
              placeholder="HR Password"
              className="w-full p-3 rounded border border-gray-600 bg-gray-700 text-white mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {terminateError && <p className="text-red-500 mb-2">{terminateError}</p>}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowTerminateModal(false);
                  setHRPassword("");
                  setTerminateError("");
                }}
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleTerminateAccount}
                className="px-4 py-2 bg-red-600 rounded hover:bg-red-500"
              >
                Confirm Termination
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
