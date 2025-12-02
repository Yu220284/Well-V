'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Globe, Bell, User, CreditCard, Cloud, FileText, Info, AlarmClock, LogOut, Trash2 } from 'lucide-react';
import { useLocalAuth } from '@/lib/hooks/use-local-auth';
import { useTranslations } from '@/lib/hooks/use-translations';
import { usePremium } from '@/lib/hooks/use-premium';
import { BottomNav } from '@/components/layout/BottomNav';
import { useLanguage } from '@/lib/hooks/use-language';
import { translations } from '@/lib/i18n/translations';



export default function SettingsPage() {
  const router = useRouter();
  const { signOut, user } = useLocalAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const { language } = useLanguage();
  const t = translations[language || 'ja'].settings;

  const settingsItems = [
    { 
        id: 'account',
        title: t.account, 
        description: t.accountDesc, 
        icon: User,
    },
    { 
        id: 'subscription',
        title: t.subscription, 
        description: t.subscriptionDesc,
        icon: CreditCard,
    },
    { 
        id: 'locale',
        title: t.locale, 
        description: t.localeDesc, 
        icon: Globe,
    },
    { 
        id: 'notifications',
        title: t.notifications, 
        description: t.notificationsDesc,
        icon: Bell,
    },
    { 
        id: 'reminders',
        title: t.reminders, 
        description: t.remindersDesc,
        icon: AlarmClock,
    },
    { 
        id: 'backup',
        title: t.backup, 
        description: t.backupDesc, 
        icon: Cloud,
    },
    { 
        id: 'legal',
        title: t.legal, 
        description: t.legalDesc,
        icon: FileText,
    },
    { 
        id: 'version',
        title: t.version, 
        description: t.versionDesc,
        icon: Info,
    },
  ];

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
    <>
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-24">
      <Header />
      <PageTransition>
        <div className="pt-12">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="mb-3">
            <div className="relative mb-2">
              <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-4 mr-8 rounded-r-lg"></div>
              <h1 className="relative text-xl font-bold font-headline py-1.5 pl-2">{t.title}</h1>
            </div>
          </div>
          <div className="space-y-2">
            {settingsItems.map((item) => (
              <div key={item.id} className="relative">
                <Card 
                  className={`hover:bg-primary/5 transition-colors ${
                    item.id === 'locale' || item.id === 'account' || item.id === 'subscription' ? 'cursor-pointer' : 'cursor-not-allowed'
                  }`}
                  onClick={
                    item.id === 'locale' ? () => router.push('/settings/locale') :
                    item.id === 'account' ? () => router.push('/settings/account') :
                    item.id === 'subscription' ? () => router.push('/settings/subscription') :
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
                {item.id !== 'locale' && item.id !== 'account' && item.id !== 'subscription' && (
                  <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center rounded-lg">
                    <p className="text-xs font-semibold bg-primary/20 text-primary-foreground backdrop-blur-sm px-2 py-1 rounded-full">{t.comingSoon}</p>
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
    <BottomNav />
    </>
  );
}