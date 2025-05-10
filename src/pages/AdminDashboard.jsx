import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Quick Stats</h3>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Patients</span>
                <span className="font-semibold">1,234</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Doctors</span>
                <span className="font-semibold">45</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Today's Appointments</span>
                <span className="font-semibold">28</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
            <div className="mt-4 space-y-4">
              <Link
                to="/admin/doctors"
                className="block w-full text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Manage Doctors
              </Link>
              <Link
                to="/admin/patients"
                className="block w-full text-center bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Manage Patients
              </Link>
              <Link
                to="/admin/appointments"
                className="block w-full text-center bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
              >
                Manage Appointments
              </Link>
              <Link
                to="/admin/settings"
                className="block w-full text-center bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
              >
                System Settings
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
            <div className="mt-4 space-y-4">
              <div className="border-b pb-4">
                <p className="text-sm text-gray-500">March 19, 2024</p>
                <p className="font-medium">New Doctor Registration</p>
                <p className="text-gray-600">Dr. Sarah Johnson</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-sm text-gray-500">March 18, 2024</p>
                <p className="font-medium">System Update</p>
                <p className="text-gray-600">Updated appointment scheduling system</p>
              </div>
              <div className="border-b pb-4">
                <p className="text-sm text-gray-500">March 17, 2024</p>
                <p className="font-medium">New Patient Registration</p>
                <p className="text-gray-600">John Doe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 