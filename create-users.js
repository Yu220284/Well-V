// Node.js script to create test users in Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

const supabase = createClient(supabaseUrl, supabaseKey);

const TEST_USERS = {
  users: [
    { email: 'user1@wellv.test', password: 'password123', name: 'ユーザー太郎', role: 'user' },
    { email: 'user2@wellv.test', password: 'password123', name: 'ユーザー花子', role: 'user' },
    { email: 'user3@wellv.test', password: 'password123', name: 'ユーザー次郎', role: 'user' }
  ],
  trainers: [
    { email: 'akarin@wellv.test', password: 'trainer123', name: 'あかりん', role: 'trainer', trainerId: 1 },
    { email: 'ryusei@wellv.test', password: 'trainer123', name: 'りゅうせい', role: 'trainer', trainerId: 2 },
    { email: 'yumeno@wellv.test', password: 'trainer123', name: 'ゆめの', role: 'trainer', trainerId: 3 }
  ]
};

async function createTestUsers() {
  console.log('Creating test users...');
  
  const allUsers = [...TEST_USERS.users, ...TEST_USERS.trainers];
  
  for (const user of allUsers) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: user.email,
        password: user.password,
        options: {
          data: {
            name: user.name,
            role: user.role,
            trainerId: user.trainerId
          }
        }
      });
      
      if (error) {
        console.error(`❌ Failed to create ${user.email}:`, error.message);
      } else {
        console.log(`✅ Created ${user.email} - ${user.name}`);
      }
    } catch (error) {
      console.error(`❌ Error creating ${user.email}:`, error.message);
    }
  }
  
  console.log('User creation completed!');
}

createTestUsers();