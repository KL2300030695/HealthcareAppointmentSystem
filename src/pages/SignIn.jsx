import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signIn } from '../utils/auth';

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'patient',
    city: 'Mumbai',
    captchaInput: ''
  });
  const [error, setError] = useState('');
  const [captchaQuestion, setCaptchaQuestion] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState(null);

  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'];

  // Generate a simple math question
  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    setCaptchaQuestion(`${a} + ${b} = ?`);
    setCaptchaAnswer(a + b);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (parseInt(formData.captchaInput) !== captchaAnswer) {
      setError('Invalid CAPTCHA answer. Please try again.');
      generateCaptcha(); // regenerate on failure
      return;
    }

    try {
      const user = signIn(formData.email, formData.password, formData.role);
      if (formData.role === 'patient') {
        localStorage.setItem('userCity', formData.city);
      }

      switch (user.type) {
        case 'doctor':
          navigate('/doctor/dashboard');
          break;
        case 'patient':
          navigate('/patient/dashboard');
          break;
        case 'admin':
          navigate('/admin/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            create a new account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                I am a
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {formData.role === 'patient' && (
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  Select your city
                </label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>

            {/* Simple CAPTCHA */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CAPTCHA: {captchaQuestion}
              </label>
              <input
                name="captchaInput"
                type="text"
                value={formData.captchaInput}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                placeholder="Answer"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Sign in
              </button>
            </div>

            <div className="text-sm text-center">
              <span className="text-gray-500">Don't have an account?</span>{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
