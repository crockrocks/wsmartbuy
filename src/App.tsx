import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import ShopPage from './pages/ShopPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfileSetupPage from './pages/ProfileSetupPage'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'
import './App.css'

interface ProtectedRouteProps {
  element: React.ReactElement;
  redirectPath?: string;
  isAllowed: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  element, 
  redirectPath = '/login',
  isAllowed,
}) => {
  return isAllowed ? element : <Navigate to={redirectPath} replace />;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [isProfileComplete, setIsProfileComplete] = useState(localStorage.getItem('profileComplete') === 'true');

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
      setIsProfileComplete(localStorage.getItem('profileComplete') === 'true');
    };

    checkAuthStatus();

    window.addEventListener('storage', checkAuthStatus);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const checkAuth = () => {
    return isLoggedIn;
  };
  
  return (
    <Router>
      <div className="min-h-screen bg-transparent text-wsmartbuy-text">
        <AnimatedBackground />
        
        <Navbar className="navbar-fixed" />
        
        <main className="content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={
              isLoggedIn ? (
                isProfileComplete ? 
                <Navigate to="/shop" replace /> : 
                <Navigate to="/profile-setup" replace />
              ) : 
              <LoginPage />
            } />
            <Route path="/register" element={
              isLoggedIn ? (
                isProfileComplete ? 
                <Navigate to="/shop" replace /> : 
                <Navigate to="/profile-setup" replace />
              ) : 
              <RegisterPage />
            } />
            <Route path="/profile-setup" element={
              <ProtectedRoute 
                element={<ProfileSetupPage />}
                isAllowed={checkAuth()}
                redirectPath="/login"
              />
            } />
            <Route path="/shop" element={
              <ProtectedRoute 
                element={<ShopPage />}
                isAllowed={checkAuth() && isProfileComplete}
                redirectPath={isLoggedIn ? "/profile-setup" : "/login"}
              />
            } />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App