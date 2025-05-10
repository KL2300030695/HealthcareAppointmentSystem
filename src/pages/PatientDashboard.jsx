import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';
import { getCurrentUser } from '../utils/auth';

const PatientDashboard = () => {
  const user = getCurrentUser();

  // Mock data (in a real app, this would come from an API)
  const upcomingAppointments = [
    {
      id: 1,
      doctorName: "Dr. Rajesh Kumar",
      specialty: "Cardiologist",
      date: "2024-03-25",
      time: "10:00 AM",
      status: "confirmed"
    },
    {
      id: 2,
      doctorName: "Dr. Priya Sharma",
      specialty: "Dermatologist",
      date: "2024-03-28",
      time: "2:30 PM",
      status: "pending"
    }
  ];

  const recentPrescriptions = [
    {
      id: 1,
      medicine: "Amoxicillin",
      dosage: "500mg",
      frequency: "3 times daily",
      duration: "7 days",
      doctor: "Dr. Amit Patel",
      date: "2024-03-20"
    },
    {
      id: 2,
      medicine: "Cetirizine",
      dosage: "10mg",
      frequency: "Once daily",
      duration: "5 days",
      doctor: "Dr. Neha Gupta",
      date: "2024-03-15"
    }
  ];

  const healthMetrics = [
    { label: "Weight", value: "68 kg", icon: "📊" },
    { label: "Blood Pressure", value: "120/80", icon: "❤️" },
    { label: "Heart Rate", value: "72 bpm", icon: "💗" },
    { label: "Temperature", value: "98.6°F", icon: "🌡️" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-4">
            <img
              src={assets.profile_pic}
              alt="Profile"
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
              <p className="text-gray-600">Manage your health journey</p>
            </div>
          </div>
        </div>

        {/* Health Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {healthMetrics.map((metric, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-semibold text-gray-900">{metric.value}</p>
                </div>
                <span className="text-2xl">{metric.icon}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Link
            to="/patient/medical-records"
            className="bg-blue-600 text-white rounded-lg p-6 hover:bg-blue-700 transition-colors"
          >
            <div className="text-3xl mb-2">📋</div>
            <h3 className="text-lg font-medium">Medical Records</h3>
            <p className="text-sm opacity-90 mt-1">Access your health history</p>
          </Link>
          <Link
            to="/patient/health-tips"
            className="bg-green-600 text-white rounded-lg p-6 hover:bg-green-700 transition-colors"
          >
            <div className="text-3xl mb-2">💡</div>
            <h3 className="text-lg font-medium">Health Tips</h3>
            <p className="text-sm opacity-90 mt-1">Get personalized health advice</p>
          </Link>
          <Link
            to="/all-doctors"
            className="bg-purple-600 text-white rounded-lg p-6 hover:bg-purple-700 transition-colors"
          >
            <div className="text-3xl mb-2">👨‍⚕️</div>
            <h3 className="text-lg font-medium">Find Doctors</h3>
            <p className="text-sm opacity-90 mt-1">Book appointments with specialists</p>
          </Link>
          <Link
            to="/patient/prescriptions"
            className="bg-yellow-600 text-white rounded-lg p-6 hover:bg-yellow-700 transition-colors"
          >
            <div className="text-3xl mb-2">💊</div>
            <h3 className="text-lg font-medium">Prescriptions</h3>
            <p className="text-sm opacity-90 mt-1">View and manage medications</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
              <div className="flex space-x-4">
                <Link to="/patient/appointments" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All →
                </Link>
                <Link to="/all-doctors" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Book New →
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{appointment.doctorName}</h3>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className="text-sm text-gray-600">📅 {appointment.date}</span>
                        <span className="text-sm text-gray-600">⏰ {appointment.time}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      appointment.status === 'confirmed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Prescriptions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Prescriptions</h2>
              <Link to="/patient/prescriptions" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All →
              </Link>
            </div>
            <div className="space-y-4">
              {recentPrescriptions.map((prescription) => (
                <div key={prescription.id} className="border rounded-lg p-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{prescription.medicine}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {prescription.dosage} - {prescription.frequency}
                      </p>
                      <p className="text-sm text-gray-600">Duration: {prescription.duration}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        Prescribed by {prescription.doctor}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{prescription.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard; 