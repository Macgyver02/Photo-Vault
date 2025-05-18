import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PhotoGallery from '../components/PhotoGallery';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';
import { Upload } from 'lucide-react';

const GalleryPage: React.FC = () => {
  const { user, isLoading } = useAuthStore();
  
  // Redirect if not logged in
  if (!isLoading && !user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Photos</h1>
            <p className="text-gray-600 mt-1">View and manage your personal photo collection</p>
          </div>
          
          <Link
            to="/upload"
            className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Photos
          </Link>
        </div>
        
        <PhotoGallery />
      </div>
    </div>
  );
};

export default GalleryPage;