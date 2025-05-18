import React from 'react';
import { Navigate } from 'react-router-dom';
import PhotoGallery from '../components/PhotoGallery';
import { useAuthStore } from '../store/authStore';

const AdminPage: React.FC = () => {
  const { user, isAdmin, isLoading } = useAuthStore();
  
  // Redirect if not logged in or not admin
  if (!isLoading && (!user || !isAdmin)) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">View and manage all user photos across the platform</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">Administration Tools</h2>
            <p className="text-gray-600">
              As an administrator, you have access to all photos from all users on the platform.
              You can view, moderate, and delete content if necessary.
            </p>
          </div>
        </div>
        
        <PhotoGallery isAdminView={true} />
      </div>
    </div>
  );
};

export default AdminPage;