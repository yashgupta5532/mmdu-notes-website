import React, { useState } from 'react';
import axios from 'axios';
import ForgotPasswordContainer from './ForgotPasswordContainer';
import { publicRequest } from '../../requestMethods';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setMessage(''); // Clear any previous error message when the email changes
  };

  const handleSendResetLink = async () => {
    try {
      setIsLoading(true);
      const response = await publicRequest.post('/auth/forgot/password', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 404) {
        setMessage('No user found with this email address.');
      } else {
        setMessage('Error sending reset link. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ForgotPasswordContainer>
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <p>Enter your email to receive a password reset link.</p>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <button onClick={handleSendResetLink} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
        <p className={message.includes('Error') ? 'error-message' : 'success-message'}>{message}</p>
      </div>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
