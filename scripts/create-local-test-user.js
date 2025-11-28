// ローカルストレージにテストユーザーを作成するスクリプト
// ブラウザのコンソールで実行してください

const testUsers = [
  {
    email: 'test@wellv.app',
    password: 'test1234',
    displayName: 'テストユーザー',
    userId: 'test_user_001',
    onboardingCompleted: true,
    profileImage: '1'
  },
  {
    email: 'admin@wellv.app',
    password: 'admin1234',
    displayName: '管理者',
    userId: 'admin_user_001',
    onboardingCompleted: true,
    profileImage: '2',
    isTrainer: true
  }
];

localStorage.setItem('wellv_users', JSON.stringify(testUsers));
console.log('✓ Test users created successfully!');
console.log('\nTest User:');
console.log('Email: test@wellv.app');
console.log('Password: test1234');
console.log('\nAdmin User:');
console.log('Email: admin@wellv.app');
console.log('Password: admin1234');
