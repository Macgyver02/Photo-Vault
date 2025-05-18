import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Image as ImageIcon, Info, X } from 'lucide-react';
import { Photo, PhotoGroup } from '../lib/supabase';
import { usePhotoStore } from '../store/photoStore';
import { useAuthStore } from '../store/authStore';
import Masonry from 'react-masonry-css';

interface PhotoGalleryProps {
  isAdminView?: boolean;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ isAdminView = false }) => {
  const { photos, photoGroups, isLoading, fetchUserPhotos, fetchAllPhotos, deletePhoto } = usePhotoStore();
  const { user } = useAuthStore();
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [animationInProgress, setAnimationInProgress] = useState(false);

  // Load photos based on view type
  useEffect(() => {
    if (user) {
      if (isAdminView) {
        fetchAllPhotos();
      } else {
        fetchUserPhotos(user.id);
      }
    }
  }, [user, isAdminView, fetchUserPhotos, fetchAllPhotos]);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closePhotoDetail = () => {
    setAnimationInProgress(true);
    setTimeout(() => {
      setSelectedPhoto(null);
      setAnimationInProgress(false);
    }, 300);
  };

  const handleDeletePhoto = async (photo: Photo) => {
    if (confirm('Are you sure you want to delete this photo?')) {
      await deletePhoto(photo.id, photo.storage_path);
      if (selectedPhoto?.id === photo.id) {
        closePhotoDetail();
      }
    }
  };

  // Masonry breakpoints
  const breakpointColumns = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  if (isLoading && !photos.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-16 h-16 rounded-full border-4 border-t-indigo-500 border-r-indigo-500 border-b-indigo-200 border-l-indigo-200 animate-spin mb-4"></div>
        <p className="text-gray-500">Loading photos...</p>
      </div>
    );
  }

  if (!isLoading && !photos.length) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center bg-white p-6 rounded-lg shadow-sm">
        <ImageIcon className="h-16 w-16 text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No photos yet</h3>
        <p className="text-gray-500 max-w-md">
          {isAdminView 
            ? "There are no photos from any users in the system yet."
            : "You haven't uploaded any photos yet. Click the upload button to add some memories!"}
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {photoGroups.map((group, groupIndex) => (
        <div key={`${group.date}_${group.event}`} className="mb-12">
          <div className="flex items-center mb-4">
            <div className="bg-indigo-100 rounded-full p-2 mr-3">
              <Calendar className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {format(parseISO(group.date), 'MMMM d, yyyy')}
              </h2>
              {group.event && group.event !== 'Uncategorized' && (
                <p className="text-sm text-gray-600">{group.event}</p>
              )}
            </div>
          </div>

          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-4 w-auto"
            columnClassName="pl-4 bg-clip-padding"
          >
            {group.photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="mb-4 break-inside-avoid"
              >
                <div 
                  className="relative group overflow-hidden rounded-lg shadow-sm cursor-pointer transition-transform hover:shadow-md hover:scale-[1.01]"
                  onClick={() => handlePhotoClick(photo)}
                >
                  <img 
                    src={photo.url} 
                    alt={photo.title || 'Photo'} 
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                    {photo.title && (
                      <h3 className="text-white text-sm font-medium truncate">{photo.title}</h3>
                    )}
                    {isAdminView && (
                      <p className="text-white/80 text-xs truncate">
                        By: {photo.user_id === user?.id ? 'You' : photo.user_id}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </div>
      ))}

      {/* Photo Detail Modal */}
      <AnimatePresence>
        {selectedPhoto && !animationInProgress && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 md:p-8"
          >
            <div 
              className="absolute inset-0 z-0 cursor-pointer"
              onClick={closePhotoDetail}
            ></div>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 max-w-5xl w-full max-h-full flex flex-col md:flex-row bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="flex-1 relative bg-gray-100 min-h-[300px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-4 border-t-indigo-500 border-r-indigo-500 border-b-indigo-200 border-l-indigo-200 animate-spin"></div>
                </div>
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.title || 'Photo'} 
                  className="w-full h-full object-contain" 
                />
              </div>
              
              <div className="w-full md:w-80 p-5 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedPhoto.title || 'Untitled Photo'}
                    </h3>
                    {selectedPhoto.event && selectedPhoto.event !== 'Uncategorized' && (
                      <p className="text-sm text-gray-600">{selectedPhoto.event}</p>
                    )}
                  </div>
                  <button 
                    onClick={closePhotoDetail}
                    className="text-gray-400 hover:text-gray-700 focus:outline-none"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-4 flex-1">
                  {selectedPhoto.description && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Description</h4>
                      <p className="text-sm text-gray-600">{selectedPhoto.description}</p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Date</h4>
                    <p className="text-sm text-gray-600">
                      {selectedPhoto.taken_at 
                        ? format(parseISO(selectedPhoto.taken_at), 'MMMM d, yyyy, h:mm a')
                        : format(parseISO(selectedPhoto.created_at), 'MMMM d, yyyy, h:mm a')}
                    </p>
                  </div>

                  {isAdminView && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Owner</h4>
                      <p className="text-sm text-gray-600">
                        {selectedPhoto.user_id === user?.id ? 'You' : selectedPhoto.user_id}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => handleDeletePhoto(selectedPhoto)}
                    className="w-full px-4 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-md hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete Photo
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;