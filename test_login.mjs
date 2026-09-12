import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://sjthhfgjbveiyfkfgmen.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNqdGhoZmdqYnZlaXlma2ZnbWVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3NDEzNjYsImV4cCI6MjA4NDMxNzM2Nn0.L-FuuSHbHDhY70qO2s3UToOsX3Bxtfh5POxwpOk40qA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLogin() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'willy@parokibantul.org',
    password: '081392403344',
  });

  if (error) {
    console.error('Login error:', error.message);
  } else {
    console.log('Login successful!', data.user?.id);
  }
}

checkLogin();
