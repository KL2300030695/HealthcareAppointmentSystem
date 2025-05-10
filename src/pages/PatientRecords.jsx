import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const PatientRecords = () => {
  const user = getCurrentUser();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock patient data (in a real app, this would come from an API)
  const [patients] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      age: 28,
      gender: "Female",
      lastVisit: "2024-03-20",
      condition: "Hypertension",
      medicalHistory: [
        { date: "2024-03-20", diagnosis: "Blood pressure check", prescription: "Lisinopril 10mg" },
        { date: "2024-02-15", diagnosis: "Regular checkup", prescription: "None" }
      ]
    },
    {
      id: 2,
      name: "Michael Brown",
      age: 45,
      gender: "Male",
      lastVisit: "2024-03-18",
      condition: "Type 2 Diabetes",
      medicalHistory: [
        { date: "2024-03-18", diagnosis: "Blood sugar monitoring", prescription: "Metformin 500mg" },
        { date: "2024-01-10", diagnosis: "Annual checkup", prescription: "Continue current medication" }
      ]
    }
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center justify-between w-full">
              <h1 className="text-2xl font-bold text-gray-900">Patient Records</h1>
              <div className="flex items-center gap-4">
                <Link
                  to="/doctor"
                  className="text-blue-600 hover:text-blue-700 flex items-center"
                >
                  ← Back to Dashboard
                </Link>
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border rounded-md px-4 py-2 w-64"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Add New Patient
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Patient List */}
            <div className="lg:col-span-1 border-r">
              <h2 className="text-lg font-semibold mb-4">Patients</h2>
              <div className="space-y-4">
                {filteredPatients.map(patient => (
                  <div
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedPatient?.id === patient.id
                        ? 'bg-blue-50 border-blue-200'
                        : 'hover:bg-gray-50 border'
                    }`}
                  >
                    <h3 className="font-medium text-gray-900">{patient.name}</h3>
                    <div className="text-sm text-gray-600 mt-1">
                      <p>Age: {patient.age} • {patient.gender}</p>
                      <p className="mt-1">Condition: {patient.condition}</p>
                      <p className="text-sm text-gray-500 mt-1">Last Visit: {patient.lastVisit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient Details */}
            <div className="lg:col-span-2 pl-6">
              {selectedPatient ? (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">{selectedPatient.name}</h2>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Age</p>
                        <p className="font-medium">{selectedPatient.age}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Gender</p>
                        <p className="font-medium">{selectedPatient.gender}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Current Condition</p>
                        <p className="font-medium">{selectedPatient.condition}</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-600">Last Visit</p>
                        <p className="font-medium">{selectedPatient.lastVisit}</p>
                      </div>
                    </div>
                  </div>

                  {/* Medical History */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Medical History</h3>
                    <div className="space-y-4">
                      {selectedPatient.medicalHistory.map((record, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{record.diagnosis}</p>
                              <p className="text-sm text-gray-600 mt-1">
                                Prescription: {record.prescription}
                              </p>
                            </div>
                            <span className="text-sm text-gray-500">{record.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 mt-10">
                  Select a patient to view their details
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientRecords; 