import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Camera, Shield, Upload, Users } from 'lucide-react';

const HomeBanner: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="white" stopOpacity="0.2" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            <g fill="url(#grad1)">
              <motion.circle 
                cx="20" 
                cy="30" 
                r="15" 
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: [0.8, 1.2, 0.8],
                  opacity: [0.3, 0.6, 0.3],
                  cx: [20, 25, 20]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle 
                cx="70" 
                cy="60" 
                r="20" 
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: [0.8, 1.1, 0.8],
                  opacity: [0.3, 0.7, 0.3],
                  cy: [60, 50, 60]
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.circle 
                cx="50" 
                cy="20" 
                r="10" 
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: [0.8, 1.3, 0.8],
                  opacity: [0.3, 0.5, 0.3],
                  cx: [50, 45, 50]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
            </g>
          </svg>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
        <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Keep Your Memories Safe and Organized
              </h1>
              <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-lg">
                Photo Vault provides a secure and beautiful way to store, organize, and share your precious moments.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/signup"
                  className="inline-block px-6 py-3 rounded-md bg-white text-indigo-700 font-medium shadow-md hover:bg-indigo-50 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="inline-block px-6 py-3 rounded-md bg-transparent text-white border border-white font-medium hover:bg-white/10 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 md:mt-0 relative"
          >
            <div className="relative max-w-md mx-auto">
              <div className="relative shadow-2xl rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="aspect-w-4 aspect-h-3">
                  <img 
                    src="https://images.pexels.com/photos/3585325/pexels-photo-3585325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Gallery Preview" 
                    className="object-cover w-full h-full" 
                  />
                </div>
              </div>
              
              {/* Floating images as decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-40 h-32 rounded-lg shadow-xl overflow-hidden border-4 border-white rotate-[-8deg] z-10">
                <img 
                  src="https://images.pexels.com/photos/1105189/pexels-photo-1105189.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="" 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <div className="absolute -top-4 -right-6 w-32 h-24 rounded-lg shadow-xl overflow-hidden border-4 border-white rotate-[6deg] z-10">
                <img 
                  src="https://images.pexels.com/photos/2253841/pexels-photo-2253841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;