import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('userId', data.user_id);
      localStorage.setItem('profileComplete', 'false');

      navigate('/profile-setup');
    } catch (err: any) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-wsmartbuy-bg/40 backdrop-blur-md border border-wsmartbuy-secondary/30 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          <span className="text-wsmartbuy-primary">W</span>SmartBuy Registration
        </h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-wsmartbuy-bg/70 border border-wsmartbuy-secondary/50 focus:border-wsmartbuy-primary focus:outline-none focus:ring-1 focus:ring-wsmartbuy-primary"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-wsmartbuy-bg/70 border border-wsmartbuy-secondary/50 focus:border-wsmartbuy-primary focus:outline-none focus:ring-1 focus:ring-wsmartbuy-primary"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-wsmartbuy-bg/70 border border-wsmartbuy-secondary/50 focus:border-wsmartbuy-primary focus:outline-none focus:ring-1 focus:ring-wsmartbuy-primary"
              placeholder="••••••••"
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-highlight text-wsmartbuy-text py-2 px-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-wsmartbuy-primary hover:text-wsmartbuy-highlight">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 