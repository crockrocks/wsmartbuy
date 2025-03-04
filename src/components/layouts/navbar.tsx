// src/components/layout/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              wsmartbuy
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link to="/services" className="hover:text-blue-600 transition-colors">
              Services
            </Link>
            <Link to="/virtual-try-on" className="hover:text-blue-600 transition-colors">
              Virtual Try On
            </Link>
            <Link to="/item-suggestor" className="hover:text-blue-600 transition-colors">
              Shopping Assisstant
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/services"
                className="block px-3 py-2 rounded-md hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                to="/virtual-try-on"
                className="block px-3 py-2 rounded-md hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Virtual Try On
              </Link>
              <Link
                to="/item-suggestor"
                className="block px-3 py-2 rounded-md hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Item Suggestor
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;