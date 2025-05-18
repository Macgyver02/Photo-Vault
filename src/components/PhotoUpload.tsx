import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePhotoStore } from '../store/photoStore';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

interface FileWithPreview extends File {
  preview?: string;
  id: string;
  uploadProgress?: number;
  error?: string;
  uploaded?: boolean;
}

const PhotoUpload: React.FC = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [event, setEvent] = useState('');
  const { uploadPhoto, error: uploadError } = usePhotoStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const filesWithPreview = acceptedFiles.map(file => 
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substring(2),
        uploadProgress: 0
      })
    );
    setFiles(prev => [...prev, ...filesWithPreview]);
  }, []);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    maxSize: 10485760 // 10MB
  });

  const removeFile = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  const handleUpload = async () => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }
    
    // Update progress for all files
    setFiles(files.map(file => ({ ...file, uploadProgress: 0 })));
    
    // Process each file
    for (const file of files) {
      try {
        // Update progress
        setFiles(prev => 
          prev.map(f => 
            f.id === file.id ? { ...f, uploadProgress: 30 } : f
          )
        );
        
        // Upload to Supabase
        await uploadPhoto(user.id, file, { event });
        
        // Mark as uploaded
        setFiles(prev => 
          prev.map(f => 
            f.id === file.id ? { ...f, uploadProgress: 100, uploaded: true } : f
          )
        );
      } catch (error) {
        console.error('Error uploading file:', error);
        setFiles(prev => 
          prev.map(f => 
            f.id === file.id ? { ...f, error: 'Upload failed' } : f
          )
        );
      }
    }
    
    // Wait a short time to show success before navigating
    setTimeout(() => {
      navigate('/gallery');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Upload Photos</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-4">
            <label htmlFor="event" className="block text-sm font-medium text-gray-700 mb-1">
              Event Name (optional)
            </label>
            <input
              type="text"
              id="event"
              value={event}
              onChange={(e) => setEvent(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Birthday, Vacation, Wedding, etc."
            />
          </div>
          
          <div 
            {...getRootProps()} 
            className={`mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer transition-colors ${
              isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
            }`}
          >
            <input {...getInputProps()} />
            <div className="space-y-1 text-center">
              <div className="flex flex-col items-center">
                <Upload className="h-12 w-12 text-gray-400 mb-3" />
                <p className="text-lg font-medium text-gray-700">
                  {isDragActive ? 'Drop the files here' : 'Drag and drop photos here'}
                </p>
                <p className="text-sm text-gray-500">or click to browse</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
        
        {files.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Selected Photos ({files.length})</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {files.map((file) => (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-md overflow-hidden border border-gray-200 group"
                  >
                    <div className="relative aspect-square bg-gray-100">
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="h-full w-full object-cover"
                        onLoad={() => { URL.revokeObjectURL(file.preview || '') }}
                      />
                      
                      {/* Upload status indicator */}
                      {file.uploadProgress !== undefined && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
                          {file.uploaded ? (
                            <Check className="h-8 w-8 text-green-400" />
                          ) : file.error ? (
                            <X className="h-8 w-8 text-red-400" />
                          ) : (
                            <>
                              <div className="w-16 h-16 rounded-full border-4 border-t-indigo-500 border-r-indigo-500 border-b-indigo-200 border-l-indigo-200 animate-spin mb-2"></div>
                              <span className="text-sm font-medium">{file.uploadProgress}%</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-2 flex justify-between items-center text-xs text-gray-500">
                      <span className="truncate flex-1">{file.name}</span>
                      {!file.uploadProgress && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(file.id);
                          }}
                          className="text-red-600 hover:text-red-800 focus:outline-none"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {uploadError && (
              <div className="mt-4 text-red-500 text-sm">
                Error: {uploadError}
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleUpload}
                disabled={files.length === 0 || files.some(f => f.uploadProgress !== undefined && !f.error)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload {files.length} Photos
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PhotoUpload;