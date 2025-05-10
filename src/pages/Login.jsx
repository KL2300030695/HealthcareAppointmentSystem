import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8080/api/signin', {
        email: formData.email,
        password: formData.password
      });

      setSuccess('Login successful!');
      // Here you would typically store the user's token/session and redirect to dashboard
      // For now, we'll just show the success message
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid password');
      } else if (err.response?.status === 404) {
        setError('User not found');
      } else {
        setError(err.response?.data?.error || 'Login failed');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign In</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="auth-input"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="auth-input"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="auth-button">Sign In</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <div className="auth-links">
        <Link to="/signup" className="auth-link">Don't have an account? Sign up</Link>
        <Link to="/forgot-password" className="auth-link">Forgot your password?</Link>
      </div>
    </div>
  );
};

export default Login;