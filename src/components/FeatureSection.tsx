import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Upload, Calendar, Users, Hash, Eye } from 'lucide-react';

const features = [
  {
    icon: <Shield className="h-6 w-6 text-indigo-600" />,
    title: 'Secure Storage',
    description: 'Your photos are encrypted and securely stored in the cloud, accessible only to you.',
  },
  {
    icon: <Upload className="h-6 w-6 text-indigo-600" />,
    title: 'Easy Upload',
    description: 'Simply drag and drop your photos to upload them. We support all common image formats.',
  },
  {
    icon: <Calendar className="h-6 w-6 text-indigo-600" />,
    title: 'Automatic Organization',
    description: 'Photos are automatically organized by date and event, making it easy to find what you need.',
  },
  {
    icon: <Hash className="h-6 w-6 text-indigo-600" />,
    title: 'Custom Tags',
    description: 'Add custom tags to your photos to make them even easier to search and organize.',
  },
  {
    icon: <Eye className="h-6 w-6 text-indigo-600" />,
    title: 'Background Animations',
    description: 'Enjoy beautiful background animations when viewing your photos in presentation mode.',
  },
  {
    icon: <Users className="h-6 w-6 text-indigo-600" />,
    title: 'Admin Controls',
    description: 'Administrators have access to view all photos in the system for moderation.',
  },
];

const FeatureSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-900 mb-4"
          >
            Everything You Need
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Photo Vault comes packed with all the features you need to store, organize, and enjoy your photos.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;