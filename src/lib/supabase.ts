import { createClient } from '@supabase/supabase-js';

// We grab these from process.env, the user can supply them via .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Export a typed, singleton instance, fallback gracefully if creds are missing
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;
