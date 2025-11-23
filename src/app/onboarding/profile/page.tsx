"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Camera } from 'lucide-react';
import { ProgressBar } from '@/components/onboarding/ProgressBar';
import { useLocalAuth } from '@/lib/hooks/use-local-auth';

export default function ProfilePage() {
  const router = useRouter();
  const { updateProfile } = useLocalAuth();
  const [profile, setProfile] = useState({
    displayName: '',
    bio: '',
    avatar: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profile);
    router.push('/onboarding/follow');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <ProgressBar currentStep={3} totalSteps={6} />
          <div className="text-center mb-8 mt-2">
            <h1 className="text-2xl font-bold mb-2">プロフィール設定</h1>
            <p className="text-muted-foreground">あなたの情報を入力してください</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>
                    <User className="h-12 w-12" />
                  </AvatarFallback>
                </Avatar>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">表示名</Label>
              <Input
                id="displayName"
                value={profile.displayName}
                onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                placeholder="あなたの名前"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">自己紹介</Label>
              <Input
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="簡単な自己紹介（任意）"
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              続ける
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}