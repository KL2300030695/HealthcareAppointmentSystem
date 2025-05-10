import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import gpay from '../upi/gpay.jpeg';
import phonepe from '../upi/phonepe.jpg';
import paytm from '../upi/paytm.png';
import bhim from '../upi/bhim.png';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [appointmentData, setAppointmentData] = useState(null);
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');

  const banks = [
    { id: 'sbi', name: 'State Bank of India' },
    { id: 'hdfc', name: 'HDFC Bank' },
    { id: 'icici', name: 'ICICI Bank' },
    { id: 'axis', name: 'Axis Bank' },
    { id: 'kotak', name: 'Kotak Mahindra Bank' },
    { id: 'pnb', name: 'Punjab National Bank' }
  ];

  useEffect(() => {
    // Get appointment data from location state
    const data = location.state?.appointmentData;
    if (!data) {
      navigate('/all-doctors');
      return;
    }
    setAppointmentData(data);
  }, [location.state, navigate]);

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setProcessing(true);

    try {
      // Check if user is logged in
      const currentUser = getCurrentUser();
      if (!currentUser) {
        navigate('/signin');
        return;
      }

      // Check if user is a patient
      if (currentUser.type !== 'patient') {
        setError('Only patients can book appointments');
        return;
      }

      // Validate payment method specific fields
      if (paymentMethod === 'upi' && !upiId) {
        setError('Please enter your UPI ID');
        return;
      }

      if (paymentMethod === 'netBanking' && !selectedBank) {
        setError('Please select your bank');
        return;
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // For demo purposes, always succeed
      setSuccess('Payment successful! Redirecting to dashboard...');
      
      // Redirect to patient dashboard after 2 seconds
      setTimeout(() => {
        navigate('/patient/dashboard', { replace: true });
      }, 2000);

    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (!appointmentData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Appointment Summary */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
            <h2 className="text-2xl font-bold text-white mb-4">Appointment Summary</h2>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
                <div>
                  <p className="text-sm text-blue-100">Doctor</p>
                  <p className="font-semibold">{appointmentData.doctorName}</p>
                  <p className="text-sm text-blue-100">{appointmentData.doctorSpeciality}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-100">Date & Time</p>
                  <p className="font-semibold">{appointmentData.date}</p>
                  <p className="text-sm">{appointmentData.time}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-100">Patient</p>
                  <p className="font-semibold">{appointmentData.patientName}</p>
                  <p className="text-sm text-blue-100">{appointmentData.patientEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-100">Consultation Fee</p>
                  <p className="font-semibold">₹{appointmentData.doctorFees}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="p-8">
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
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
              <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4">
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

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Payment Method Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">Payment Method</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('creditCard')}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      paymentMethod === 'creditCard'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="font-medium">Credit Card</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      paymentMethod === 'upi'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">UPI</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('netBanking')}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      paymentMethod === 'netBanking'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span className="font-medium">Net Banking</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Credit Card Form */}
              {paymentMethod === 'creditCard' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                      Card Number
                    </label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={cardDetails.cardNumber}
                      onChange={handleCardChange}
                      className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">
                      Card Holder Name
                    </label>
                    <input
                      type="text"
                      id="cardHolder"
                      name="cardHolder"
                      value={cardDetails.cardHolder}
                      onChange={handleCardChange}
                      className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={cardDetails.expiryDate}
                        onChange={handleCardChange}
                        className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={cardDetails.cvv}
                        onChange={handleCardChange}
                        className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        placeholder="123"
                        maxLength="3"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* UPI Form */}
              {paymentMethod === 'upi' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="upiId" className="block text-sm font-medium text-gray-700">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      id="upiId"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      placeholder="example@upi"
                      required
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Enter your UPI ID (e.g., name@bank)
                    </p>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Popular UPI Apps</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="flex items-center space-x-2 p-2 bg-white rounded-lg shadow-sm">
                        <img src={gpay} alt="Google Pay" className="w-6 h-6 object-contain" />
                        <span className="text-sm">Google Pay</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-white rounded-lg shadow-sm">
                        <img src={phonepe} alt="PhonePe" className="w-6 h-6 object-contain" />
                        <span className="text-sm">PhonePe</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-white rounded-lg shadow-sm">
                        <img src={paytm} alt="Paytm" className="w-6 h-6 object-contain" />
                        <span className="text-sm">Paytm</span>
                      </div>
                      <div className="flex items-center space-x-2 p-2 bg-white rounded-lg shadow-sm">
                        <img src={bhim} alt="BHIM" className="w-6 h-6 object-contain" />
                        <span className="text-sm">BHIM</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Net Banking Form */}
              {paymentMethod === 'netBanking' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="bank" className="block text-sm font-medium text-gray-700">
                      Select Bank
                    </label>
                    <select
                      id="bank"
                      value={selectedBank}
                      onChange={(e) => setSelectedBank(e.target.value)}
                      className="mt-1 block w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      required
                    >
                      <option value="">Select your bank</option>
                      {banks.map(bank => (
                        <option key={bank.id} value={bank.id}>
                          {bank.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedBank && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-blue-800 mb-2">Important Information</h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          You will be redirected to your bank's secure login page
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Please ensure you have your bank's login credentials ready
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          The payment will be processed securely through your bank
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={processing}
                  className={`px-8 py-3 rounded-lg text-white font-medium transform transition-all duration-300
                    ${processing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 hover:scale-105 hover:shadow-lg active:scale-95'
                    }`}
                >
                  {processing ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    'Pay ₹' + appointmentData.doctorFees
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment; 