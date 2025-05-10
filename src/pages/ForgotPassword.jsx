import React, { useState } from 'react';
import './Auth.css';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [step, setStep] = useState(1); // 1: email input, 2: verification code
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/forgot-password', { email });
      setMessage('Verification code sent to your email');
      setError('');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send verification code');
      setMessage('');
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/verify-code', {
        email,
        code: verificationCode
      });
      setMessage('Code verified successfully! You can now reset your password.');
      setError('');
      // Here you would typically redirect to a password reset page
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid verification code');
      setMessage('');
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Forgot Password</h2>
      {step === 1 ? (
        <form onSubmit={handleEmailSubmit} className="auth-form">
          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Send Verification Code</button>
        </form>
      ) : (
        <form onSubmit={handleVerificationSubmit} className="auth-form">
          <input
            type="text"
            placeholder="Enter verification code"
            className="auth-input"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">Verify Code</button>
        </form>
      )}
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="auth-links">
        <a href="/login">Back to Login</a>
      </div>
    </div>
  );
};

export default ForgotPassword;