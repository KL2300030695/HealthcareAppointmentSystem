import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import { doctors } from '../assets/assets';

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { doctorId } = useParams();
  const currentUser = getCurrentUser();
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDates, setCalendarDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    date: "",
    time: "",
    symptoms: '',
    previousHistory: null,
    previousHistoryFileName: ''
  });

  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Available time slots
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '12:00 PM', '02:00 PM',
    '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
    '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM'
  ];

  // Generate calendar dates for the current month
  const generateCalendarDates = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Get first day of month and total days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const totalDays = lastDay.getDate();
    
    // Get the day of week for first day (0 = Sunday, 6 = Saturday)
    const firstDayIndex = firstDay.getDay();
    
    // Generate array of dates
    const dates = [];
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDayIndex; i++) {
      dates.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
      const currentDate = new Date(year, month, day);
      dates.push(currentDate.toISOString().split('T')[0]);
    }
    
    return dates;
  };

  // Update calendar when month changes
  useEffect(() => {
    setCalendarDates(generateCalendarDates(currentMonth));
  }, [currentMonth]);

  // Navigate to previous month
  const prevMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentMonth(newDate);
  };

  // Navigate to next month
  const nextMonth = () => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    // Don't allow navigation beyond next year
    if (newDate.getFullYear() > new Date().getFullYear() + 1) {
      return;
    }
    setCurrentMonth(newDate);
  };

  // Check if date is in the past
  const isPastDate = (date) => {
    if (!date) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return new Date(date) < today;
  };

  // Generate available time slots
  const availableTimeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
  ];

  useEffect(() => {
    const loadDoctorData = () => {
      try {
        // First try to get doctor from location state
        let doctorData = location.state?.doctor;
        
        // If not in location state, try to find by ID
        if (!doctorData && doctorId) {
          // Convert doctorId to string format if it's a number
          const searchId = doctorId.startsWith('doc') ? doctorId : `doc${doctorId}`;
          doctorData = doctors.find(d => d._id === searchId);
        }

        if (!doctorData) {
          setError('Doctor information not found');
          navigate('/all-doctors');
          return;
        }

        setDoctor(doctorData);
        setLoading(false);

        // Only check authentication when submitting the form
        // Remove the immediate redirect to signin
      } catch (err) {
        setError('Error loading doctor information');
        console.error('Error loading doctor:', err);
        navigate('/all-doctors');
      }
    };

    loadDoctorData();
  }, [doctorId, location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }
      
      // Check file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        setError('File size should be less than 5MB');
        return;
      }

      setFormData(prev => ({
        ...prev,
        previousHistory: file,
        previousHistoryFileName: file.name
      }));
      setError(''); // Clear any previous errors
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      // Check authentication before submitting
      if (!currentUser) {
        navigate('/signin');
        return;
      }

      // Validate form data
      if (!selectedDate || !selectedTime) {
        throw new Error('Please select both date and time');
      }

      // Prepare appointment data without the file
      const appointmentData = {
        doctorName: doctor.name,
        doctorSpeciality: doctor.speciality,
        doctorFees: doctor.fees,
        date: selectedDate,
        time: selectedTime,
        patientName: formData.name,
        patientEmail: formData.email,
        patientPhone: formData.phone,
        reason: formData.reason,
        symptoms: formData.symptoms,
        preferredLanguage: formData.preferredLanguage,
        insuranceProvider: formData.insuranceProvider,
        insurancePolicyNumber: formData.insurancePolicyNumber,
        previousVisits: formData.previousVisits,
        allergies: formData.allergies,
        currentMedications: formData.currentMedications,
        additionalNotes: formData.additionalNotes,
        // Add file information instead of the actual file
        hasMedicalHistory: !!formData.previousHistory,
        medicalHistoryFileName: formData.previousHistoryFileName
      };

      // Navigate to payment page with appointment data
      navigate('/payment', { 
        state: { 
          appointmentData: {
            doctorName: doctor.name,
            doctorSpeciality: doctor.speciality,
            doctorFees: doctor.fees,
            date: selectedDate,
            time: selectedTime,
            patientName: formData.name,
            patientEmail: formData.email,
            patientPhone: formData.phone,
            reason: formData.reason,
            symptoms: formData.symptoms
          },
          medicalHistoryFile: formData.previousHistory
        } 
      });
    } catch (err) {
      setError(err.message || 'Failed to book appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get tomorrow's date as the minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Get date 30 days from now as the maximum selectable date
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxSelectableDate = maxDate.toISOString().split('T')[0];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading doctor information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="h-12 w-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => navigate('/all-doctors')}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Doctors
          </button>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white backdrop-blur-lg bg-opacity-90 shadow-2xl rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
          {/* Doctor Info Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 px-8 py-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full animate-pulse"></div>
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-24 h-24 rounded-full border-4 border-white shadow-lg relative z-10 transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-1 text-shadow-lg">{doctor.name}</h2>
                <p className="text-blue-100 text-lg mb-1">{doctor.speciality}</p>
                <div className="flex items-center space-x-2">
                  <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm backdrop-blur-sm">
                    ₹{doctor.fees} Consultation Fee
                  </span>
                  <span className="flex items-center px-3 py-1 bg-green-500 bg-opacity-20 rounded-full text-sm backdrop-blur-sm">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md shadow-sm animate-slideIn">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md shadow-sm animate-slideIn">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">{success}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Date and Time Selection */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Select Date & Time
              </h3>
              
              {/* Calendar Navigation */}
              <div className="flex justify-between items-center mb-6">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-full hover:bg-blue-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h4 className="text-lg font-semibold text-gray-800">
                  {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h4>
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-full hover:bg-blue-50 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              {/* Calendar Grid */}
              <div className="mb-8">
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {calendarDates.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => !isPastDate(date) && setSelectedDate(date)}
                      disabled={!date || isPastDate(date)}
                      className={`relative p-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                        !date || isPastDate(date)
                          ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
                          : selectedDate === date
                          ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md'
                          : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                      }`}
                    >
                      <div className="text-center">
                        <span className="block text-sm font-medium">
                          {date ? new Date(date).getDate() : ''}
                        </span>
                      </div>
                      {selectedDate === date && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Available Time Slots
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {availableTimeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`relative p-2 rounded-lg border transition-all duration-300 transform hover:scale-105 ${
                        selectedTime === time
                          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700 shadow-sm'
                          : 'border-gray-200 hover:border-blue-300 text-gray-700 bg-white'
                      }`}
                    >
                      <div className="text-center">
                        <span className="block text-sm font-medium">{time}</span>
                        <span className="block text-xs text-gray-500 mt-0.5">
                          {time.includes('AM') ? 'Morning' : 'Afternoon'}
                        </span>
                      </div>
                      {selectedTime === time && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Reason for Visit */}
            <div className="relative group">
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Visit *
              </label>
              <input
                type="text"
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white bg-opacity-90 backdrop-blur-sm hover:border-blue-300"
                placeholder="E.g., Regular checkup, Follow-up, Consultation"
                required
              />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-100 rounded-lg pointer-events-none transition-all duration-200"></div>
            </div>

            {/* Symptoms */}
            <div className="relative group">
              <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
                Symptoms (if any)
              </label>
              <textarea
                id="symptoms"
                name="symptoms"
                rows={3}
                value={formData.symptoms}
                onChange={handleChange}
                className="block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white bg-opacity-90 backdrop-blur-sm hover:border-blue-300 resize-none"
                placeholder="Describe your symptoms"
              />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-100 rounded-lg pointer-events-none transition-all duration-200"></div>
            </div>

            {/* Previous Medical History */}
            <div className="relative group mb-6">
              <label htmlFor="previousHistory" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <svg 
                  className="w-5 h-5 mr-2 text-blue-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                Previous Medical History (PDF)
              </label>
              
              <div className="relative">
                <input
                  type="file"
                  id="previousHistory"
                  name="previousHistory"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                <label 
                  htmlFor="previousHistory" 
                  className="block w-full cursor-pointer"
                >
                  <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium px-4 py-3 rounded-lg border border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-200">
                    {formData.previousHistory ? (
                      <>
                        <svg 
                          className="w-5 h-5 text-green-500" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M5 13l4 4L19 7" 
                          />
                        </svg>
                        <span>Change PDF File</span>
                      </>
                    ) : (
                      <>
                        <svg 
                          className="w-5 h-5 text-blue-500" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                          />
                        </svg>
                        <span>Upload PDF File</span>
                      </>
                    )}
                  </div>
                </label>

                {formData.previousHistoryFileName && (
                  <div className="mt-2">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <svg 
                        className="w-4 h-4 text-blue-500" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth="2" 
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                        />
                      </svg>
                      <span>{formData.previousHistoryFileName}</span>
                    </div>
                  </div>
                )}

                <p className="mt-1 text-sm text-gray-500">
                  Upload your previous medical history as a PDF file (Max size: 5MB)
                </p>

                {error && error.includes('PDF') && (
                  <p className="mt-1 text-sm text-red-500">
                    {error}
                  </p>
                )}
              </div>
              
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-100 rounded-lg pointer-events-none transition-all duration-200"></div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !selectedDate || !selectedTime}
                className={`px-8 py-3 rounded-lg text-white font-medium transform transition-all duration-300
                  ${isSubmitting || !selectedDate || !selectedTime
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 hover:scale-105 hover:shadow-lg active:scale-95'
                  }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Booking...
                  </div>
                ) : (
                  'Book Appointment'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment; 