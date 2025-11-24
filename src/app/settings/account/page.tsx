'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Mail, Phone, Lock, Link, LogOut, Trash2 } from 'lucide-react';
import { useAuth } from '@/lib/auth/auth-context';

const accountItems = [
  {
    id: 'email-phone',
    title: 'メールアドレス・電話番号管理',
    description: 'アカウントの連絡先情報を管理',
    icon: Mail,
  },
  {
    id: 'password',
    title: 'パスワード変更',
    description: 'セキュリティのためのパスワード更新',
    icon: Lock,
  },
  {
    id: 'sns-integration',
    title: 'SNS、外部サービス連携',
    description: 'Google、Apple、SNSアカウントとの連携',
    icon: Link,
  },
  {
    id: 'logout',
    title: 'ログアウト',
    description: 'アカウントからログアウトします',
    icon: LogOut,
  },
  {
    id: 'delete-account',
    title: 'アカウントを削除',
    description: 'アカウントとすべてのデータを完全に削除',
    icon: Trash2,
    isDestructive: true,
  },
];

export default function AccountSettingsPage() {
  const router = useRouter();
  const { signOut, user } = useAuth();

  const handleLogout = async () => {
    localStorage.removeItem('wellv_seen_splash');
    await signOut();
    router.push('/splash');
  };

  const handleDeleteAccount = async () => {
    // TODO: Implement Supabase account deletion
    await signOut();
    router.push('/auth/signup');
  };

  const handleItemClick = (itemId: string) => {
    if (itemId === 'logout') {
      handleLogout();
    }
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
                  <h1 className="relative text-xl font-bold font-headline py-2 pl-2">アカウント設定</h1>
                </div>
              </div>
              
              <div className="space-y-4">
                {accountItems.map((item) => {
                  if (item.id === 'delete-account') {
                    return (
                      <AlertDialog key={item.id}>
                        <AlertDialogTrigger asChild>
                          <Card className={`hover:bg-primary/5 transition-colors cursor-pointer ${item.isDestructive ? 'border-destructive/50' : ''}`}>
                            <CardHeader className="flex flex-row items-center justify-between p-4">
                              <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-lg ${item.isDestructive ? 'bg-destructive/10' : 'bg-accent/80'}`}>
                                  <item.icon className={`h-5 w-5 ${item.isDestructive ? 'text-destructive' : 'text-primary'}`} />
                                </div>
                                <div>
                                  <CardTitle className={`text-base ${item.isDestructive ? 'text-destructive' : ''}`}>{item.title}</CardTitle>
                                  <CardDescription className="text-xs">{item.description}</CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                          </Card>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>アカウントを削除しますか？</AlertDialogTitle>
                            <AlertDialogDescription>
                              この操作は元に戻せません。すべてのデータが完全に削除されます。
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>キャンセル</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={handleDeleteAccount}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              削除する
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    );
                  }

                  if (item.id === 'logout') {
                    return (
                      <AlertDialog key={item.id}>
                        <AlertDialogTrigger asChild>
                          <Card className="hover:bg-primary/5 transition-colors cursor-pointer">
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
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>ログアウトしますか？</AlertDialogTitle>
                            <AlertDialogDescription>
                              アカウントからログアウトします。再度ログインが必要になります。
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>キャンセル</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLogout}>
                              ログアウト
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    );
                  }

                  const isClickable = false;
                  return (
                    <div key={item.id} className="relative">
                      <Card className="hover:bg-primary/5 transition-colors cursor-not-allowed">
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
                      <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center rounded-lg">
                        <p className="text-xs font-semibold bg-primary/20 text-primary-foreground backdrop-blur-sm px-2 py-1 rounded-full">この機能は現在開発中です。</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        </div>
      </PageTransition>
    </div>
  );
}