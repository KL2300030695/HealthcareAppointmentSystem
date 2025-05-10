import React, { useState } from "react";
import { doctors } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const AllDoctors = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Get unique specialities from doctors
  const specialities = ["all", ...new Set(doctors.map(doctor => doctor.speciality))];

  const handleBookAppointment = (doctor) => {
    // Navigate to book appointment page with doctor data
    navigate(`/book-appointment/${doctor._id}`, { state: { doctor } });
  };

  const filteredDoctors = doctors
    .filter((doctor) => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpeciality = selectedSpeciality === "all" || doctor.speciality === selectedSpeciality;
      return matchesSearch && matchesSpeciality;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "experience") return parseInt(b.experience) - parseInt(a.experience);
      if (sortBy === "fees") return a.fees - b.fees;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Expert Doctors</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find and book appointments with our experienced healthcare professionals
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by Name
              </label>
              <input
                type="text"
                placeholder="Search doctors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Speciality
              </label>
              <select
                value={selectedSpeciality}
                onChange={(e) => setSelectedSpeciality(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {specialities.map((speciality) => (
                  <option key={speciality} value={speciality}>
                    {speciality.charAt(0).toUpperCase() + speciality.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Name</option>
                <option value="experience">Experience</option>
                <option value="fees">Fees</option>
              </select>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {doctor.experience} Experience
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {doctor.name}
                </h3>
                <p className="text-blue-600 font-medium mb-2">{doctor.speciality}</p>
                <p className="text-gray-600 text-sm mb-4">{doctor.about}</p>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500 text-sm">Consultation Fee</p>
                    <p className="text-lg font-semibold text-gray-900">₹{doctor.fees}</p>
                  </div>
                  <button
                    onClick={() => handleBookAppointment(doctor)}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No doctors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllDoctors; 