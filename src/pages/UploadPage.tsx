import React from 'react';
import { Navigate } from 'react-router-dom';
import PhotoUpload from '../components/PhotoUpload';
import { useAuthStore } from '../store/authStore';

const UploadPage: React.FC = () => {
  const { user, isLoading } = useAuthStore();
  
  // Redirect if not logged in
  if (!isLoading && !user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PhotoUpload />
      </div>
    </div>
  );
};

export default UploadPage;