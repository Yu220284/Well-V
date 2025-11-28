const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://sllytnxtosotzwmbcuqu.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsbHl0bnh0b3NvdHp3bWJjdXF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2MjYyMjQsImV4cCI6MjA3OTIwMjIyNH0.t3Cjr6u0-S4ZZbox7TI6fFBipnw2Fe-tBlAWo5BZU-w';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestUser() {
  console.log('Creating test user...');
  
  const { data, error } = await supabase.auth.signUp({
    email: 'test@wellv.app',
    password: 'test1234',
    options: {
      data: {
        display_name: 'テストユーザー',
      }
    }
  });

  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('✓ Test user created successfully!');
    console.log('Email: test@wellv.app');
    console.log('Password: test1234');
  }
}

createTestUser();
