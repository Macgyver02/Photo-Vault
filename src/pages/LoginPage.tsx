import React from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '../components/AuthComponents';
import { useAuthStore } from '../store/authStore';

const LoginPage: React.FC = () => {
  const { user, isLoading } = useAuthStore();
  
  // Redirect if already logged in
  if (user && !isLoading) {
    return <Navigate to="/gallery" replace />;
  }
  
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-full h-full bg-[url('https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center opacity-10"></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md px-4">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;