import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const MedicalRecords = () => {
  const user = getCurrentUser();
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Mock data (in a real app, this would come from an API)
  const medicalRecords = [
    {
      id: 1,
      date: "2024-03-15",
      doctorName: "Dr. Arun Singh",
      specialty: "Orthopedist",
      diagnosis: "Upper Respiratory Infection",
      symptoms: ["Fever", "Cough", "Sore throat"],
      prescriptions: ["Amoxicillin 500mg", "Paracetamol 500mg"],
      notes: "Rest advised for 3 days. Increase fluid intake.",
      attachments: ["Blood Test Report", "Chest X-Ray"],
      followUp: "2024-03-22"
    },
    {
      id: 2,
      date: "2024-02-28",
      doctorName: "Dr. Meera Reddy",
      specialty: "Gynecologist",
      diagnosis: "Atopic Dermatitis",
      symptoms: ["Skin rash", "Itching"],
      prescriptions: ["Topical corticosteroid", "Antihistamine"],
      notes: "Apply cream twice daily. Avoid hot showers.",
      attachments: ["Skin Test Results"],
      followUp: "2024-03-28"
    }
  ];

  const vitalsHistory = [
    {
      date: "2024-03-15",
      weight: "68 kg",
      bloodPressure: "120/80",
      heartRate: "72 bpm",
      temperature: "98.6°F",
      bloodSugar: "95 mg/dL",
      oxygenLevel: "98%"
    },
    {
      date: "2024-02-28",
      weight: "67.5 kg",
      bloodPressure: "118/78",
      heartRate: "70 bpm",
      temperature: "98.4°F",
      bloodSugar: "92 mg/dL",
      oxygenLevel: "99%"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Medical Records</h1>
          <Link
            to="/patient/dashboard"
            className="text-blue-600 hover:text-blue-700 flex items-center"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Visit History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Visit History</h2>
              <div className="space-y-4">
                {medicalRecords.map((record) => (
                  <div
                    key={record.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedRecord?.id === record.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedRecord(record)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{record.diagnosis}</h3>
                        <p className="text-sm text-gray-600">{record.doctorName} - {record.specialty}</p>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className="text-sm text-gray-600">📅 {record.date}</span>
                          <span className="text-sm text-gray-600">🔄 Follow-up: {record.followUp}</span>
                        </div>
                      </div>
                      <span className="text-sm text-blue-600">View Details →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Record Details */}
          <div className="lg:col-span-1">
            {selectedRecord ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Record Details</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Symptoms</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {selectedRecord.symptoms.map((symptom, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Prescriptions</h3>
                    <ul className="mt-1 space-y-1">
                      {selectedRecord.prescriptions.map((prescription, index) => (
                        <li key={index} className="text-sm text-gray-700">• {prescription}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Doctor's Notes</h3>
                    <p className="mt-1 text-sm text-gray-700">{selectedRecord.notes}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Attachments</h3>
                    <div className="mt-1 space-y-2">
                      {selectedRecord.attachments.map((attachment, index) => (
                        <button
                          key={index}
                          className="flex items-center text-sm text-blue-600 hover:text-blue-700"
                        >
                          📎 {attachment}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
                Select a record to view details
              </div>
            )}

            {/* Vitals History */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Vitals</h2>
              {vitalsHistory.length > 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Weight</p>
                      <p className="text-lg font-medium">{vitalsHistory[0].weight}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Blood Pressure</p>
                      <p className="text-lg font-medium">{vitalsHistory[0].bloodPressure}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Heart Rate</p>
                      <p className="text-lg font-medium">{vitalsHistory[0].heartRate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Temperature</p>
                      <p className="text-lg font-medium">{vitalsHistory[0].temperature}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalRecords; 