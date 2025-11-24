'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createTestUsers } from '@/lib/auth/create-test-users';
import { TEST_USERS } from '@/lib/auth/test-users';

export default function CreateUsersPage() {
  const [isCreating, setIsCreating] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleCreateUsers = async () => {
    setIsCreating(true);
    try {
      const results = await createTestUsers();
      setResults(results);
    } catch (error) {
      console.error('Error creating users:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>検証用ユーザー作成</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">一般ユーザー (3人)</h3>
            <ul className="text-sm space-y-1">
              {TEST_USERS.users.map(user => (
                <li key={user.email}>
                  {user.email} / {user.password} - {user.profile.name}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">トレーナーユーザー (3人)</h3>
            <ul className="text-sm space-y-1">
              {TEST_USERS.trainers.map(trainer => (
                <li key={trainer.email}>
                  {trainer.email} / {trainer.password} - {trainer.profile.name}
                </li>
              ))}
            </ul>
          </div>

          <Button 
            onClick={handleCreateUsers} 
            disabled={isCreating}
            className="w-full"
          >
            {isCreating ? 'ユーザー作成中...' : 'テストユーザーを作成'}
          </Button>

          {results.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">作成結果</h3>
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div 
                    key={index}
                    className={`p-2 rounded text-sm ${
                      result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {result.email}: {result.success ? '成功' : `失敗 - ${result.error}`}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}