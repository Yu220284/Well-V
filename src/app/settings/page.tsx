'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Globe, Bell, User, CreditCard, Cloud, FileText, Info, AlarmClock, LogOut, Trash2 } from 'lucide-react';
import { useLocalAuth } from '@/lib/hooks/use-local-auth';
import messages from '@/../messages/ja.json';

const settingsItems = [
    { 
        id: 'account',
        title: "アカウント情報", 
        description: "メールアドレス、パスワード変更、SNS連携", 
        icon: User,
    },
    { 
        id: 'subscription',
        title: "サブスクリプション管理", 
        description: "プラン確認、更新、解約、支払い履歴",
        icon: CreditCard,
    },
    { 
        id: 'locale',
        title: "地域・言語設定", 
        description: "地域と言語の設定", 
        icon: Globe,
    },
    { 
        id: 'notifications',
        title: "通知設定", 
        description: "プッシュ通知やお知らせの設定",
        icon: Bell,
    },
    { 
        id: 'reminders',
        title: "セッション開始リマインダー", 
        description: "定期的なセッション開始の通知設定",
        icon: AlarmClock,
    },
    { 
        id: 'backup',
        title: "バックアップ／復元", 
        description: "クラウド保存、端末移行", 
        icon: Cloud,
    },
    { 
        id: 'legal',
        title: "利用規約／プライバシーポリシー", 
        description: "法的文書の確認",
        icon: FileText,
    },
    { 
        id: 'version',
        title: "アプリバージョン情報", 
        description: "現在のバージョンとアップデート情報",
        icon: Info,
    },
];

export default function SettingsPage() {
  const router = useRouter();
  const { signOut, user } = useLocalAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const t = messages.SettingsPage;

  const handleLogout = () => {
    signOut();
    router.push('/auth/login');
  };

  const handleDeleteAccount = () => {
    setIsDeleting(true);
    const storedUsers = JSON.parse(localStorage.getItem('wellv_users') || '[]');
    const filteredUsers = storedUsers.filter((u: any) => u.email !== user?.email);
    localStorage.setItem('wellv_users', JSON.stringify(filteredUsers));
    signOut();
    router.push('/auth/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-24">
      <Header />
      <PageTransition>
        <div className="pt-24">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-4 mr-8 rounded-r-lg"></div>
              <h1 className="relative text-xl font-bold font-headline py-2 pl-2">詳細設定</h1>
            </div>
          </div>
          <div className="space-y-4">
            {settingsItems.map((item) => (
              <div key={item.id} className="relative">
                <Card 
                  className={`hover:bg-primary/5 transition-colors ${
                    item.id === 'locale' || item.id === 'account' ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                  onClick={
                    item.id === 'locale' ? () => router.push('/settings/locale') :
                    item.id === 'account' ? () => router.push('/settings/account') :
                    undefined
                  }
                >
                  <CardHeader className="flex flex-row items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-accent/80 p-3 rounded-lg">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{item.title}</CardTitle>
                        <CardDescription className="text-xs">{item.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
                {item.id !== 'locale' && item.id !== 'account' && (
                  <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center rounded-lg">
                    <p className="text-xs font-semibold bg-primary/20 text-primary-foreground backdrop-blur-sm px-2 py-1 rounded-full">この機能は現在開発中です。</p>
                  </div>
                )}
              </div>
            ))}


          </div>
        </div>
      </main>
        </div>
      </PageTransition>
    </div>
  );
}