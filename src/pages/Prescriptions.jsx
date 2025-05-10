import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const Prescriptions = () => {
  const user = getCurrentUser();
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // Mock data (in a real app, this would come from an API)
  const prescriptions = [
    {
      id: 1,
      date: "2024-03-15",
      doctorName: "Dr. Vikram Verma",
      specialty: "Ophthalmologist",
      medications: [
        {
          name: "Amoxicillin",
          dosage: "500mg",
          frequency: "3 times a day",
          duration: "7 days",
          instructions: "Take with food",
          status: "Active"
        },
        {
          name: "Paracetamol",
          dosage: "500mg",
          frequency: "As needed",
          duration: "3 days",
          instructions: "Take for fever above 100°F",
          status: "Active"
        }
      ],
      diagnosis: "Upper Respiratory Infection",
      notes: "Complete the full course of antibiotics.",
      nextRefillDate: "2024-03-22"
    },
    {
      id: 2,
      date: "2024-02-28",
      doctorName: "Dr. Anjali Iyer",
      specialty: "Psychiatrist",
      medications: [
        {
          name: "Betamethasone",
          dosage: "0.05%",
          frequency: "Twice daily",
          duration: "14 days",
          instructions: "Apply thin layer to affected areas",
          status: "Active"
        },
        {
          name: "Cetirizine",
          dosage: "10mg",
          frequency: "Once daily",
          duration: "30 days",
          instructions: "Take at bedtime",
          status: "Active"
        }
      ],
      diagnosis: "Atopic Dermatitis",
      notes: "Avoid hot showers and use gentle soap.",
      nextRefillDate: "2024-03-28"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
          <Link
            to="/patient/dashboard"
            className="text-blue-600 hover:text-blue-700 flex items-center"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Prescriptions List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Prescriptions</h2>
              <div className="space-y-4">
                {prescriptions.map((prescription) => (
                  <div
                    key={prescription.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPrescription?.id === prescription.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedPrescription(prescription)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{prescription.diagnosis}</h3>
                        <p className="text-sm text-gray-600">
                          {prescription.doctorName} - {prescription.specialty}
                        </p>
                        <div className="mt-2 flex items-center space-x-4">
                          <span className="text-sm text-gray-600">📅 Prescribed: {prescription.date}</span>
                          <span className="text-sm text-gray-600">🔄 Next Refill: {prescription.nextRefillDate}</span>
                        </div>
                      </div>
                      <span className="text-sm text-blue-600">View Details →</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Prescription Details */}
          <div className="lg:col-span-1">
            {selectedPrescription ? (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Prescription Details</h2>
                <div className="space-y-6">
                  {selectedPrescription.medications.map((medication, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900">{medication.name}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          medication.status === 'Active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {medication.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-500">Dosage</p>
                          <p className="font-medium">{medication.dosage}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Frequency</p>
                          <p className="font-medium">{medication.frequency}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Duration</p>
                          <p className="font-medium">{medication.duration}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-gray-500 text-sm">Instructions</p>
                        <p className="text-sm text-gray-700">{medication.instructions}</p>
                      </div>
                    </div>
                  ))}
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Doctor's Notes</h3>
                    <p className="mt-1 text-sm text-gray-700">{selectedPrescription.notes}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
                Select a prescription to view details
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Request Refill
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Download Prescription
                </button>
                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Set Medication Reminders
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescriptions; 