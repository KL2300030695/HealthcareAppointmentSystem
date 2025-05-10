import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';

const DoctorSchedule = () => {
  const user = getCurrentUser();
  const [schedule, setSchedule] = useState({
    monday: { isAvailable: true, slots: ['09:00 AM - 12:00 PM', '02:00 PM - 05:00 PM'] },
    tuesday: { isAvailable: true, slots: ['09:00 AM - 12:00 PM', '02:00 PM - 05:00 PM'] },
    wednesday: { isAvailable: true, slots: ['09:00 AM - 12:00 PM', '02:00 PM - 05:00 PM'] },
    thursday: { isAvailable: true, slots: ['09:00 AM - 12:00 PM', '02:00 PM - 05:00 PM'] },
    friday: { isAvailable: true, slots: ['09:00 AM - 12:00 PM', '02:00 PM - 05:00 PM'] },
    saturday: { isAvailable: false, slots: [] },
    sunday: { isAvailable: false, slots: [] }
  });

  const [newSlot, setNewSlot] = useState({ day: 'monday', startTime: '', endTime: '' });

  const handleAvailabilityToggle = (day) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        isAvailable: !prev[day].isAvailable
      }
    }));
  };

  const handleAddSlot = (e) => {
    e.preventDefault();
    if (newSlot.startTime && newSlot.endTime) {
      const timeSlot = `${newSlot.startTime} - ${newSlot.endTime}`;
      setSchedule(prev => ({
        ...prev,
        [newSlot.day]: {
          ...prev[newSlot.day],
          slots: [...prev[newSlot.day].slots, timeSlot]
        }
      }));
      setNewSlot({ day: 'monday', startTime: '', endTime: '' });
    }
  };

  const handleRemoveSlot = (day, slotIndex) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, index) => index !== slotIndex)
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Schedule Management</h1>
            <Link
              to="/doctor"
              className="text-blue-600 hover:text-blue-700 flex items-center"
            >
              ← Back to Dashboard
            </Link>
          </div>
          
          {/* Add New Time Slot */}
          <div className="mb-8 bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Add New Time Slot</h2>
            <form onSubmit={handleAddSlot} className="flex gap-4 flex-wrap">
              <select
                value={newSlot.day}
                onChange={(e) => setNewSlot(prev => ({ ...prev, day: e.target.value }))}
                className="border rounded-md px-3 py-2"
              >
                {Object.keys(schedule).map(day => (
                  <option key={day} value={day}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </option>
                ))}
              </select>
              <input
                type="time"
                value={newSlot.startTime}
                onChange={(e) => setNewSlot(prev => ({ ...prev, startTime: e.target.value }))}
                className="border rounded-md px-3 py-2"
              />
              <input
                type="time"
                value={newSlot.endTime}
                onChange={(e) => setNewSlot(prev => ({ ...prev, endTime: e.target.value }))}
                className="border rounded-md px-3 py-2"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Add Slot
              </button>
            </form>
          </div>

          {/* Weekly Schedule */}
          <div className="space-y-6">
            {Object.entries(schedule).map(([day, { isAvailable, slots }]) => (
              <div key={day} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium capitalize">{day}</h3>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isAvailable}
                      onChange={() => handleAvailabilityToggle(day)}
                      className="mr-2"
                    />
                    Available
                  </label>
                </div>
                {isAvailable && (
                  <div className="space-y-2">
                    {slots.map((slot, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span>{slot}</span>
                        <button
                          onClick={() => handleRemoveSlot(day, index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSchedule; 