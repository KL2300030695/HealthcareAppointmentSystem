import React, { useState } from "react";
import { getCurrentUser } from "../utils/auth";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const DoctorDashboard = () => {
  const currentUser = getCurrentUser();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  // Mock data for appointments
  const appointments = [
    {
      id: 1,
      patientName: "Rahul Sharma",
      age: 35,
      reason: "General Checkup",
      time: "10:00 AM",
      status: "Confirmed",
      contact: "+91 98765 43210"
    },
    {
      id: 2,
      patientName: "Priya Patel",
      age: 28,
      reason: "Follow-up",
      time: "11:30 AM",
      status: "Pending",
      contact: "+91 87654 32109"
    },
    {
      id: 3,
      patientName: "Amit Kumar",
      age: 45,
      reason: "Consultation",
      time: "2:00 PM",
      status: "Confirmed",
      contact: "+91 76543 21098"
    }
  ];

  // Mock data for statistics
  const statistics = [
    {
      title: "Total Patients",
      value: "1,234",
      icon: "👥",
      trend: "+12%"
    },
    {
      title: "Today's Appointments",
      value: "8",
      icon: "📅",
      trend: "+2"
    },
    {
      title: "Total Reviews",
      value: "4.8",
      icon: "⭐",
      trend: "+0.2"
    },
    {
      title: "Total Earnings",
      value: "₹45,000",
      icon: "💰",
      trend: "+15%"
    }
  ];

  // Mock data for recent reviews
  const recentReviews = [
    {
      id: 1,
      patientName: "Neha Gupta",
      rating: 5,
      comment: "Excellent consultation and very professional approach.",
      date: "2024-03-15"
    },
    {
      id: 2,
      patientName: "Rajesh Verma",
      rating: 4,
      comment: "Good doctor, explains everything clearly.",
      date: "2024-03-14"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {currentUser?.name || "Doctor"}
              </h1>
              <p className="text-gray-600 mt-2">
                {currentUser?.speciality || "Specialist"} • {currentUser?.experience || "15"} Years Experience
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Update Profile
              </button>
              <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                  <p className="text-green-500 text-sm mt-1">{stat.trend}</p>
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Today's Appointments</h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                        <p className="text-sm text-gray-500">{appointment.age} years • {appointment.reason}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          appointment.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="text-sm text-gray-500">{appointment.contact}</p>
                      <button className="text-blue-600 text-sm hover:text-blue-700">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Reviews</h2>
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{review.patientName}</h3>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-gray-600">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                    <p className="text-xs text-gray-500 mt-2">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/doctor/schedule"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <span className="text-2xl">📅</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Update Schedule</h3>
                <p className="text-sm text-gray-500">Manage your availability</p>
              </div>
            </div>
          </Link>
          <Link
            to="/doctor/patients"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Patient Records</h3>
                <p className="text-sm text-gray-500">Access patient history</p>
              </div>
            </div>
          </Link>
          <Link
            to="/doctor/earnings"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Earnings Report</h3>
                <p className="text-sm text-gray-500">View your earnings</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard; 