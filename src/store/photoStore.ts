import { create } from 'zustand';
import { supabase, Photo, PhotoGroup } from '../lib/supabase';
import { format, parseISO } from 'date-fns';

interface PhotoState {
  photos: Photo[];
  photoGroups: PhotoGroup[];
  isLoading: boolean;
  error: string | null;
  fetchUserPhotos: (userId: string) => Promise<void>;
  fetchAllPhotos: () => Promise<void>;
  uploadPhoto: (userId: string, file: File, metadata: Partial<Photo>) => Promise<void>;
  deletePhoto: (photoId: string, storagePath: string) => Promise<void>;
  updatePhoto: (photoId: string, updates: Partial<Photo>) => Promise<void>;
}

export const usePhotoStore = create<PhotoState>((set, get) => ({
  photos: [],
  photoGroups: [],
  isLoading: false,
  error: null,

  fetchUserPhotos: async (userId: string) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      set({ photos: data as Photo[], isLoading: false });
      
      // Group photos by date and event
      const groupedPhotos = groupPhotosByDateAndEvent(data as Photo[]);
      set({ photoGroups: groupedPhotos });
    } catch (error) {
      console.error('Error fetching user photos:', error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  fetchAllPhotos: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('photos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      set({ photos: data as Photo[], isLoading: false });
      
      // Group photos by date and event
      const groupedPhotos = groupPhotosByDateAndEvent(data as Photo[]);
      set({ photoGroups: groupedPhotos });
    } catch (error) {
      console.error('Error fetching all photos:', error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  uploadPhoto: async (userId: string, file: File, metadata: Partial<Photo>) => {
    try {
      set({ isLoading: true, error: null });
      
      // Create a unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;
      
      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('photos')
        .getPublicUrl(filePath);

      // Extract date from EXIF if available, otherwise use current date
      const takenAt = metadata.taken_at || new Date().toISOString();
      const eventName = metadata.event || 'Uncategorized';

      // Save to database
      const { data, error: dbError } = await supabase
        .from('photos')
        .insert([
          {
            user_id: userId,
            url: urlData.publicUrl,
            title: metadata.title || file.name,
            description: metadata.description || '',
            event: eventName,
            taken_at: takenAt,
            storage_path: filePath,
          },
        ])
        .select();

      if (dbError) {
        throw dbError;
      }
      
      // Update the state
      const photos = get().photos;
      const newPhoto = data[0] as Photo;
      set({ 
        photos: [newPhoto, ...photos],
        isLoading: false
      });
      
      // Update photo groups
      const photoGroups = get().photoGroups;
      const updatedGroups = addPhotoToGroups(newPhoto, photoGroups);
      set({ photoGroups: updatedGroups });
    } catch (error) {
      console.error('Error uploading photo:', error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  deletePhoto: async (photoId: string, storagePath: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('photos')
        .remove([storagePath]);

      if (storageError) {
        throw storageError;
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('photos')
        .delete()
        .eq('id', photoId);

      if (dbError) {
        throw dbError;
      }
      
      // Update the state
      const photos = get().photos.filter(photo => photo.id !== photoId);
      set({ photos, isLoading: false });
      
      // Update photo groups
      const updatedGroups = groupPhotosByDateAndEvent(photos);
      set({ photoGroups: updatedGroups });
    } catch (error) {
      console.error('Error deleting photo:', error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updatePhoto: async (photoId: string, updates: Partial<Photo>) => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('photos')
        .update(updates)
        .eq('id', photoId)
        .select();

      if (error) {
        throw error;
      }
      
      // Update the state
      const photos = get().photos.map(photo => 
        photo.id === photoId ? { ...photo, ...updates } : photo
      );
      set({ photos, isLoading: false });
      
      // Update photo groups
      const updatedGroups = groupPhotosByDateAndEvent(photos);
      set({ photoGroups: updatedGroups });
    } catch (error) {
      console.error('Error updating photo:', error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));

// Helper functions for grouping photos
function groupPhotosByDateAndEvent(photos: Photo[]): PhotoGroup[] {
  const groupMap: Record<string, PhotoGroup> = {};
  
  photos.forEach(photo => {
    // Use either taken_at or created_at
    const dateStr = photo.taken_at || photo.created_at;
    const date = format(parseISO(dateStr), 'yyyy-MM-dd');
    const event = photo.event || 'Uncategorized';
    
    const key = `${date}_${event}`;
    
    if (!groupMap[key]) {
      groupMap[key] = {
        date,
        event,
        photos: [],
      };
    }
    
    groupMap[key].photos.push(photo);
  });
  
  // Convert map to array and sort by date (newest first)
  return Object.values(groupMap).sort((a, b) => 
    b.date.localeCompare(a.date)
  );
}

function addPhotoToGroups(newPhoto: Photo, groups: PhotoGroup[]): PhotoGroup[] {
  const dateStr = newPhoto.taken_at || newPhoto.created_at;
  const date = format(parseISO(dateStr), 'yyyy-MM-dd');
  const event = newPhoto.event || 'Uncategorized';
  
  // Check if we have a matching group
  const existingGroup = groups.find(g => g.date === date && g.event === event);
  
  if (existingGroup) {
    // Add to existing group
    return groups.map(group => {
      if (group.date === date && group.event === event) {
        return { ...group, photos: [newPhoto, ...group.photos] };
      }
      return group;
    });
  } else {
    // Create a new group
    const newGroup: PhotoGroup = {
      date,
      event,
      photos: [newPhoto],
    };
    
    // Add the new group and sort
    return [newGroup, ...groups].sort((a, b) => 
      b.date.localeCompare(a.date)
    );
  }
}