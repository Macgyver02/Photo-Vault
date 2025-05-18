import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Menu, X, Upload, User, LogOut, Camera, Settings, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { user, isAdmin, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${isScrolled ? 'bg-white/90 shadow-md backdrop-blur-md' : 'bg-transparent'}
  `;

  return (
    <header className={headerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Title */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-gray-900 font-bold text-xl"
          >
            <Camera className="h-8 w-8 text-indigo-600" />
            <span className="font-semibold tracking-tight">Photo Vault</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <Link 
                  to="/gallery" 
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                    location.pathname === '/gallery' ? 'text-indigo-600' : 'text-gray-700'
                  }`}
                >
                  My Photos
                </Link>
                
                <Link 
                  to="/upload" 
                  className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                    location.pathname === '/upload' ? 'text-indigo-600' : 'text-gray-700'
                  }`}
                >
                  Upload
                </Link>
                
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className={`text-sm font-medium transition-colors hover:text-indigo-600 ${
                      location.pathname === '/admin' ? 'text-indigo-600' : 'text-gray-700'
                    }`}
                  >
                    Admin
                  </Link>
                )}
                
                <div className="relative ml-3">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">
                      {user.full_name || user.email}
                    </span>
                    
                    <button
                      onClick={handleLogout}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </Link>
                
                <Link 
                  to="/signup" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-lg"
        >
          <div className="pt-2 pb-4 space-y-1 px-4">
            {user ? (
              <>
                <div className="border-b border-gray-200 py-4 mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="bg-indigo-100 p-2 rounded-full">
                      <User className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.full_name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>
                
                <Link
                  to="/gallery"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 px-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 flex items-center"
                >
                  <Camera className="mr-4 h-5 w-5 text-indigo-500" />
                  My Photos
                </Link>
                
                <Link
                  to="/upload"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 px-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 flex items-center"
                >
                  <Upload className="mr-4 h-5 w-5 text-indigo-500" />
                  Upload Photos
                </Link>
                
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2 px-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 flex items-center"
                  >
                    <Users className="mr-4 h-5 w-5 text-indigo-500" />
                    Admin Dashboard
                  </Link>
                )}
                
                <Link
                  to="/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 px-3 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50 flex items-center"
                >
                  <Settings className="mr-4 h-5 w-5 text-indigo-500" />
                  Settings
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="w-full mt-2 flex items-center justify-center py-2 px-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block mb-2 py-2 text-center rounded-md text-base font-medium text-indigo-600 border border-indigo-600"
                >
                  Login
                </Link>
                
                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-center rounded-md shadow-sm text-base font-medium text-white bg-indigo-600"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;