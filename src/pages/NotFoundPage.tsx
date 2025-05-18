import React from 'react';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="flex justify-center mb-6">
          <Camera className="h-20 w-20 text-indigo-600" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Page Not Found</h2>
        
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;