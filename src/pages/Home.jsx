import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { doctors } from '../assets/assets'

const Home = () => {
  const navigate = useNavigate()

  const handleBookAppointment = (doctor = null) => {
    if (doctor) {
      navigate(`/book-appointment/${doctor._id}`, { state: { doctor } })
    } else {
      navigate('/all-doctors')
    }
  }

  const handleViewAllDoctors = () => {
    navigate('/all-doctors')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-500 via-cyan-600 to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Left Side - Text Content */}
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                Book Appointment <br /> With Trusted Doctors
              </h1>

              <p className="text-lg text-white/90 max-w-xl">
                Simply browse through our extensive list of trusted doctors, 
                schedule your appointment hassle-free.
              </p>

              {/* Group Icons */}
              <div className="flex justify-center md:justify-start mt-4">
                <img 
                  src={assets.group_profiles} 
                  alt="Patient profiles" 
                  className="h-12"
                />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => handleBookAppointment()}
                  className="bg-white text-cyan-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  Book Appointment
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                <button 
                  onClick={handleViewAllDoctors}
                  className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-cyan-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                >
                  View All Doctors
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Side - Doctor's Image */}
            <div className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center">
              <img 
                src={assets.header_img} 
                alt="Group of doctors" 
                className="w-full max-w-lg rounded-lg shadow-2xl transform hover:scale-105 transition-duration-500"
              />
            </div>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 transform opacity-10">
          <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="pattern-squares" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#pattern-squares)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 transform opacity-10">
          <svg width="404" height="384" fill="none" viewBox="0 0 404 384">
            <defs>
              <pattern id="pattern-circles" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="3" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="384" fill="url(#pattern-circles)" />
          </svg>
        </div>
      </div>

      {/* Top Doctors Section */}
      <div className='w-full py-16 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm'>
        <div className='max-w-7xl mx-auto'>
          <h2 className='text-3xl font-bold text-gray-900 text-center mb-4'>
            Our Top Specialists
          </h2>
          <p className='text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto'>
            Experienced doctors across all specialties, ready to provide the best medical care for you
          </p>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
            {doctors.slice(0, 8).map((doctor, index) => (
              <div 
                key={index} 
                onClick={() => handleBookAppointment(doctor)}
                className='group flex flex-col items-center bg-white rounded-xl p-6 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer'
              >
                <div className="relative w-32 h-32 mb-4">
                  <div className="absolute inset-0 bg-cyan-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <img 
                    className='w-full h-full rounded-full border-4 border-cyan-100 object-cover transition-transform duration-300 group-hover:border-cyan-200' 
                    src={doctor.image} 
                    alt={doctor.name} 
                  />
                </div>
                <div className='flex items-center gap-2 text-sm mb-2'>
                  <span className='w-2 h-2 bg-green-500 rounded-full'></span>
                  <span className='text-green-600 font-medium'>Available</span>
                </div>
                <h3 className='font-bold text-lg text-gray-800 text-center group-hover:text-cyan-600 transition-colors duration-300'>
                  {doctor.name}
                </h3>
                <p className='text-gray-600 mb-2'>{doctor.speciality}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded-full text-sm font-medium">
                    ₹{doctor.fees}
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookAppointment(doctor);
                    }}
                    className="px-3 py-1 bg-cyan-500 text-white rounded-full text-sm font-medium hover:bg-cyan-600 transition-colors duration-300"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
