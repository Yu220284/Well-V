
'use client';

import { Header } from '@/components/layout/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ProfilePage() {
  return (
    <div className="pb-24">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold font-headline mb-6">プロフィール</h1>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="https://picsum.photos/seed/me/200" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
                <Button variant="outline">画像を変更</Button>
              </div>

              <form className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="name">名前</Label>
                  <Input id="name" defaultValue="山田 太郎" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input id="email" type="email" defaultValue="user@example.com" disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">自己紹介</Label>
                  <Textarea id="bio" defaultValue="フィットネスと健康的な食事が大好きです。" />
                </div>
                <Button type="submit">プロフィールを更新</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
