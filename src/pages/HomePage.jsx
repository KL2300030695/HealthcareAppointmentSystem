import React from "react";
import Header from "../components/Header";
import { assets } from "../assets/assets";

const HomePage = () => {
  const handleBookAppointment = () => {
    // Navigate to doctors page
  };

  const handleViewAllDoctors = () => {
    // Navigate to all doctors page
  };

  return (
    <>
      <Header />
      <div className="bg-cyan-600 text-white py-16 px-8 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Left Side - Text Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Book Appointment <br /> With Trusted Doctors
            </h1>

            <p className="text-lg text-white/90">
              Simply browse through our extensive list of trusted doctors, 
              schedule your appointment hassle-free.
            </p>

            {/* Group Icons */}
            <div className="mt-4">
              <img 
                src={assets.group_profiles} 
                alt="Patient profiles" 
                className="h-12"
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
              <button 
                onClick={handleBookAppointment}
                className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-200 transition-all"
              >
                Book Appointment →
              </button>

              <button 
                onClick={handleViewAllDoctors}
                className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-blue-600 transition-all"
              >
                View All Doctors
              </button>
            </div>
          </div>

          {/* Right Side - Doctor's Image */}
          <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
            <img 
              src={assets.header_img} 
              alt="Group of doctors" 
              className="w-full max-w-lg rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
