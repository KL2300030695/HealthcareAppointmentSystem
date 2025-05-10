import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const EarningsReport = () => {
  const user = getCurrentUser();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Mock data (in a real app, this would come from an API)
  const earnings = {
    totalEarnings: 12500,
    monthlyEarnings: 4200,
    weeklyEarnings: 1050,
    appointmentsCompleted: 45,
    averageRating: 4.8,
    recentTransactions: [
      {
        id: 1,
        patientName: "Sarah Johnson",
        date: "2024-03-20",
        amount: 150,
        service: "Regular Consultation",
        status: "completed"
      },
      {
        id: 2,
        patientName: "Michael Brown",
        date: "2024-03-18",
        amount: 200,
        service: "Specialist Consultation",
        status: "completed"
      },
      {
        id: 3,
        patientName: "Emily Davis",
        date: "2024-03-15",
        amount: 150,
        service: "Follow-up Consultation",
        status: "pending"
      }
    ]
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Earnings Report</h1>
            <div className="flex items-center gap-4">
              <Link
                to="/doctor"
                className="text-blue-600 hover:text-blue-700 flex items-center"
              >
                ← Back to Dashboard
              </Link>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="border rounded-md px-3 py-2"
              >
                {months.map((month, index) => (
                  <option key={month} value={index}>{month}</option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                className="border rounded-md px-3 py-2"
              >
                {[2024, 2023, 2022].map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-blue-600">Total Earnings</h3>
              <p className="text-2xl font-semibold text-blue-900 mt-2">${earnings.totalEarnings}</p>
              <p className="text-sm text-blue-600 mt-1">All time</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-green-600">Monthly Earnings</h3>
              <p className="text-2xl font-semibold text-green-900 mt-2">${earnings.monthlyEarnings}</p>
              <p className="text-sm text-green-600 mt-1">This month</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-purple-600">Appointments</h3>
              <p className="text-2xl font-semibold text-purple-900 mt-2">{earnings.appointmentsCompleted}</p>
              <p className="text-sm text-purple-600 mt-1">Completed</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-sm font-medium text-yellow-600">Average Rating</h3>
              <p className="text-2xl font-semibold text-yellow-900 mt-2">{earnings.averageRating}/5</p>
              <p className="text-sm text-yellow-600 mt-1">From all reviews</p>
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {earnings.recentTransactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{transaction.patientName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.service}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{transaction.date}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${transaction.amount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsReport; 