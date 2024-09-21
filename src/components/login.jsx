import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { fetchData } from './apiService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
      setLoading(true);
      setError('');

      try {
        const response = await fetch('YOUR_LOGIN_API_ENDPOINT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Login failed. Please check your credentials.');
        }

        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);

        // Fetch user data after login
        const userData = await fetchData('YOUR_USER_DATA_ENDPOINT');
        console.log('User data:', userData);

        // Redirect to another page, e.g., the account page
        navigate('/account'); // Change to your desired route
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="loginbox position-relative">
        <div className='login-container position-absolute'>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type='submit' disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
};

export default Login;
