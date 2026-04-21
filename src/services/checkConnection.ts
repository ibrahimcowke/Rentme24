import { supabase } from './supabase';

export const checkConnection = async () => {
  try {
    const { error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
    if (error) throw error;
    console.log('Supabase connection successful!');
    return true;
  } catch (err) {
    console.error('Supabase connection failed:', err);
    return false;
  }
};
