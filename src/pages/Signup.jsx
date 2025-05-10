import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import { signUp, USER_TYPES } from '../utils/auth';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: USER_TYPES.PATIENT,
    // Additional fields for patients
    gender: '',
    age: '',
    // Additional fields for doctors
    specialty: '',
    experience: '',
    fees: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Validate password strength
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      // Create user data object
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        type: formData.userType
      };

      // Add additional fields for patients
      if (formData.userType === USER_TYPES.PATIENT) {
        if (!formData.gender || !formData.age) {
          setError('Please fill in all required fields for patient registration');
          return;
        }
        userData.gender = formData.gender;
        userData.age = parseInt(formData.age);
      }

      // Add additional fields for doctors
      if (formData.userType === USER_TYPES.DOCTOR) {
        if (!formData.specialty || !formData.experience || !formData.fees) {
          setError('Please fill in all required fields for doctor registration');
          return;
        }
        userData.specialty = formData.specialty;
        userData.experience = formData.experience;
        userData.fees = parseFloat(formData.fees);
      }

      const user = signUp(userData);
      
      // Redirect based on user type
      switch (user.type) {
        case USER_TYPES.DOCTOR:
          navigate('/doctor/dashboard');
          break;
        case USER_TYPES.PATIENT:
          navigate('/patient/dashboard');
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="userType" className="block text-sm font-medium text-gray-700">
            I am a
          </label>
          <select
            id="userType"
            name="userType"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            value={formData.userType}
            onChange={handleChange}
          >
            <option value={USER_TYPES.PATIENT}>Patient</option>
            <option value={USER_TYPES.DOCTOR}>Doctor</option>
          </select>
        </div>

        {formData.userType === USER_TYPES.PATIENT && (
          <>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                required
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Age
              </label>
              <div className="mt-1">
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="0"
                  max="120"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.age}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )}

        {formData.userType === USER_TYPES.DOCTOR && (
          <>
            <div>
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
                Specialty
              </label>
              <div className="mt-1">
                <input
                  id="specialty"
                  name="specialty"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.specialty}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                Years of Experience
              </label>
              <div className="mt-1">
                <input
                  id="experience"
                  name="experience"
                  type="number"
                  min="0"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.experience}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="fees" className="block text-sm font-medium text-gray-700">
                Consultation Fees ($)
              </label>
              <div className="mt-1">
                <input
                  id="fees"
                  name="fees"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.fees}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )}

        {error && (
          <div className="text-red-600 text-sm">
            {error}
          </div>
        )}

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign up
          </button>
        </div>

        <div className="text-sm text-center">
          <Link to="/signin" className="font-medium text-blue-600 hover:text-blue-500">
            Already have an account? Sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;