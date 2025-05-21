import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userId', data.user_id);

      const preferencesResponse = await fetch(`http://localhost:5000/api/preferences/${data.user_id}`);
      const preferencesData = await preferencesResponse.json();
      
      if (preferencesResponse.ok && preferencesData.success) {
        localStorage.setItem('profileComplete', 'true');
        window.dispatchEvent(new Event('storage'));
        navigate('/shop');
      } else {
        localStorage.setItem('profileComplete', 'false');
        window.dispatchEvent(new Event('storage'));
        navigate('/profile-setup');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen">
      <div className="bg-wsmartbuy-bg/40 backdrop-blur-md border border-wsmartbuy-secondary/30 rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          <span className="text-wsmartbuy-primary">W</span>SmartBuy Login
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-wsmartbuy-bg/70 border border-wsmartbuy-secondary/50 focus:border-wsmartbuy-primary focus:outline-none focus:ring-1 focus:ring-wsmartbuy-primary"
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-wsmartbuy-primary focus:ring-wsmartbuy-primary border-wsmartbuy-secondary rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block">
                Remember me
              </label>
            </div>
            
            <div>
              <a href="#" className="text-wsmartbuy-primary hover:text-wsmartbuy-highlight">
                Forgot password?
              </a>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-highlight text-wsmartbuy-text py-2 px-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="text-wsmartbuy-primary hover:text-wsmartbuy-highlight">
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 