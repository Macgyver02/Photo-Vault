import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Make sure to create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserProfile = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  is_admin: boolean;
};

export type Photo = {
  id: string;
  user_id: string;
  url: string;
  thumbnail_url?: string;
  title?: string;
  description?: string;
  event?: string;
  created_at: string;
  taken_at?: string;
  storage_path: string;
};

export type PhotoGroup = {
  date: string;
  event?: string;
  photos: Photo[];
};