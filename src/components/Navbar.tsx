import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check login status on mount and whenever localStorage changes
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loginStatus);
    };
    
    checkLoginStatus();
    
    // Listen for storage events (in case another tab changes login state)
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleLogout = () => {
    // Clear all auth-related data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('profileComplete');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userData');
    
    // Update state
    setIsLoggedIn(false);
    
    // Trigger storage event for other components to detect
    window.dispatchEvent(new Event('storage'));
    
    // Navigate to home
    navigate('/');
  };
  
  return (
    <nav className={`fixed top-0 w-full z-50 bg-wsmartbuy-bg/90 backdrop-blur-md border-b border-wsmartbuy-secondary/30 ${className}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo section */}
          <div className="flex items-center">
            <Link to="/" className="text-wsmartbuy-text font-bold text-xl">
              <span className="text-wsmartbuy-primary">W</span>SmartBuy
            </Link>
          </div>
          
          {/* Desktop menu - centered with flex */}
          <div className="hidden md:flex items-center justify-center space-x-8 flex-1">
            <Link to="/" className="text-wsmartbuy-text hover:text-wsmartbuy-primary transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-wsmartbuy-text hover:text-wsmartbuy-primary transition-colors">
              Shop
            </Link>
            <a href="#services" className="text-wsmartbuy-text hover:text-wsmartbuy-primary transition-colors">
              Services
            </a>
            <a href="#about" className="text-wsmartbuy-text hover:text-wsmartbuy-primary transition-colors">
              About
            </a>
            <a href="#contact" className="text-wsmartbuy-text hover:text-wsmartbuy-primary transition-colors">
              Contact
            </a>
          </div>
          
          {/* Login/Logout button */}
          <div className="flex justify-end">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-wsmartbuy-bg border border-wsmartbuy-primary text-wsmartbuy-primary px-4 py-2 rounded-md font-medium hover:bg-wsmartbuy-primary/10 transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="bg-gradient-to-r from-wsmartbuy-primary to-wsmartbuy-highlight text-wsmartbuy-text px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity">
                  Login
                </button>
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ml-4">
            <button 
              className="text-wsmartbuy-text hover:text-wsmartbuy-primary"
              onClick={toggleMobileMenu}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu - also full width */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-wsmartbuy-bg/95 backdrop-blur-md border-b border-wsmartbuy-secondary/30">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-wsmartbuy-text hover:text-wsmartbuy-primary hover:bg-wsmartbuy-secondary/10 transition-colors">
              Home
            </Link>
            <Link to="/shop" className="block px-3 py-2 rounded-md text-wsmartbuy-text hover:text-wsmartbuy-primary hover:bg-wsmartbuy-secondary/10 transition-colors">
              Shop
            </Link>
            <a href="#services" className="block px-3 py-2 rounded-md text-wsmartbuy-text hover:text-wsmartbuy-primary hover:bg-wsmartbuy-secondary/10 transition-colors">
              Services
            </a>
            <a href="#about" className="block px-3 py-2 rounded-md text-wsmartbuy-text hover:text-wsmartbuy-primary hover:bg-wsmartbuy-secondary/10 transition-colors">
              About
            </a>
            <a href="#contact" className="block px-3 py-2 rounded-md text-wsmartbuy-text hover:text-wsmartbuy-primary hover:bg-wsmartbuy-secondary/10 transition-colors">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;