
'use client';

import { useState, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/lib/auth/auth-context';
import { User, Youtube, Twitch, Plus, X } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userId, setUserId] = useState('user123');
  const [lastIdChange] = useState(new Date('2024-11-01'));
  const canChangeId = new Date().getTime() - lastIdChange.getTime() > 30 * 24 * 60 * 60 * 1000;
  const [streamLinks, setStreamLinks] = useState<{ platform: string; url: string }[]>(user?.streamLinks || []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => updateProfile({ profileImage: reader.result as string });
    reader.readAsDataURL(file);
  };
  return (
    <div className="pb-24">
      <Header />
      <PageTransition>
        <div className="pt-12">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="max-w-2xl mx-auto">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-8 mr-8 rounded-r-lg"></div>
                <h1 className="relative text-2xl font-bold font-headline py-2 pl-2">プロフィール</h1>
              </div>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-12 w-12 text-primary" />
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>画像を変更</Button>
              </div>

              <form className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="name">名前</Label>
                  <Input id="name" defaultValue={user?.user_metadata?.name || user?.email?.split('@')[0] || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userId">ID</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="userId" 
                      value={userId} 
                      onChange={(e) => setUserId(e.target.value)}
                      disabled={!canChangeId}
                    />
                    {!canChangeId && (
                      <span className="text-sm text-muted-foreground self-center">
                        次回変更可能: {new Date(lastIdChange.getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">自己紹介</Label>
                  <Textarea id="bio" defaultValue="はじめまして！よろしくお願いします。" />
                </div>
                
                {user?.isTrainer && (
                  <div className="space-y-2">
                    <Label>配信プラットフォームリンク（最大5つ）</Label>
                    <div className="space-y-2">
                      {streamLinks.map((link, idx) => (
                        <div key={idx} className="flex gap-2">
                          <Input
                            placeholder="プラットフォーム名 (YouTube, IRIAMなど)"
                            value={link.platform}
                            onChange={(e) => {
                              const newLinks = [...streamLinks];
                              newLinks[idx].platform = e.target.value;
                              setStreamLinks(newLinks);
                            }}
                            className="w-1/3"
                          />
                          <Input
                            placeholder="URL"
                            value={link.url}
                            onChange={(e) => {
                              const newLinks = [...streamLinks];
                              newLinks[idx].url = e.target.value;
                              setStreamLinks(newLinks);
                            }}
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => setStreamLinks(streamLinks.filter((_, i) => i !== idx))}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      {streamLinks.length < 5 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setStreamLinks([...streamLinks, { platform: '', url: '' }])}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          リンクを追加
                        </Button>
                      )}
                    </div>
                  </div>
                )}
                
                <Button type="submit" onClick={(e) => {
                  e.preventDefault();
                  if (user?.isTrainer) {
                    updateProfile({ streamLinks });
                  }
                }}>プロフィールを更新</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
        </div>
      </PageTransition>
    </div>
  );
}
