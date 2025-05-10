import React from 'react';
import { Link } from 'react-router-dom';

const RelatedDoctors = ({ doctors, currentDoctorId }) => {
  // Filter out the current doctor and get up to 3 related doctors
  const relatedDoctors = doctors
    .filter(doctor => doctor.id !== currentDoctorId)
    .slice(0, 3);

  if (relatedDoctors.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Related Doctors</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={doctor.image || '/default-doctor.jpg'}
              alt={doctor.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{doctor.name}</h3>
              <p className="text-gray-600 mb-2">{doctor.speciality}</p>
              <div className="flex items-center mb-2">
                <span className="text-yellow-400">★</span>
                <span className="ml-1 text-gray-600">{doctor.rating}</span>
              </div>
              <Link
                to={`/appointment/${doctor.id}`}
                className="block w-full text-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors; 