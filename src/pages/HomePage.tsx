import React from 'react';
import { Link } from 'react-router-dom';
import HomeBanner from '../components/HomeBanner';
import FeatureSection from '../components/FeatureSection';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HomeBanner />
      <FeatureSection />
      
      {/* Testimonials/Example Gallery Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Beautiful Photo Galleries</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Create stunning collections of your most precious memories, organized just the way you want.
            </p>
          </div>
          
          <div className="relative rounded-xl overflow-hidden shadow-xl">
            <img 
              src="https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Gallery Example" 
              className="w-full h-[500px] object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8">
              <h3 className="text-white text-2xl font-bold mb-2">Summer Vacation 2023</h3>
              <p className="text-white/80 mb-6">42 photos • June 15-22</p>
              <Link
                to="/signup"
                className="inline-block px-6 py-3 bg-white text-indigo-700 font-medium rounded-md shadow-md hover:bg-indigo-50 transition-colors w-auto self-start"
              >
                Start Your Collection
              </Link>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden shadow-md aspect-w-3 aspect-h-2 relative">
              <img 
                src="https://images.pexels.com/photos/3584440/pexels-photo-3584440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Gallery Example" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-bold">Winter Memories</h3>
                <p className="text-white/80 text-sm">18 photos</p>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-md aspect-w-3 aspect-h-2 relative">
              <img 
                src="https://images.pexels.com/photos/1154198/pexels-photo-1154198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Gallery Example" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-bold">City Adventures</h3>
                <p className="text-white/80 text-sm">24 photos</p>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-md aspect-w-3 aspect-h-2 relative">
              <img 
                src="https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Gallery Example" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-bold">Family Reunion</h3>
                <p className="text-white/80 text-sm">36 photos</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto mb-8">
            Join Photo Vault today and start organizing your memories in a secure, beautiful way.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="inline-block px-6 py-3 rounded-md bg-white text-indigo-700 font-medium shadow-md hover:bg-indigo-50 transition-colors"
            >
              Create Free Account
            </Link>
            <Link
              to="/login"
              className="inline-block px-6 py-3 rounded-md bg-transparent text-white border border-white font-medium hover:bg-white/10 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;