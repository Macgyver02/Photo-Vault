import { create } from 'zustand';
import { supabase, UserProfile } from '../lib/supabase';

interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  isAdmin: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<UserProfile | null>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAdmin: false,
  error: null,

  initialize: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }

      if (session?.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        set({ 
          user: profile as UserProfile, 
          isAdmin: profile?.is_admin || false,
          isLoading: false 
        });
      } else {
        set({ user: null, isAdmin: false, isLoading: false });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      set({ user: null, isAdmin: false, error: (error as Error).message, isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        set({ 
          user: profile as UserProfile, 
          isAdmin: profile?.is_admin || false,
          isLoading: false,
          error: null
        });

        return profile as UserProfile;
      }
      return null;
    } catch (error) {
      console.error('Error logging in:', error);
      set({ error: (error as Error).message, isLoading: false });
      return null;
    }
  },

  signup: async (email: string, password: string, fullName: string) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              email,
              full_name: fullName,
              is_admin: false,
            },
          ]);

        if (profileError) {
          throw profileError;
        }

        set({ 
          isLoading: false,
          error: null 
        });
      }
    } catch (error) {
      console.error('Error signing up:', error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      set({ user: null, isAdmin: false, isLoading: false });
    } catch (error) {
      console.error('Error logging out:', error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  updateProfile: async (updates: Partial<UserProfile>) => {
    try {
      const user = get().user;
      if (!user) {
        throw new Error('User not authenticated');
      }

      set({ isLoading: true, error: null });
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      set({ 
        user: { ...user, ...updates },
        isLoading: false 
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },
}));