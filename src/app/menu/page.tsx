
'use client';

import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { AdBanner } from '@/components/layout/AdBanner';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { User, Bell, Heart, Star, Award, Settings as SettingsIcon, Mail, ChevronRight, PlusCircle, Sparkles, Mic } from 'lucide-react';
import { useLanguage } from '@/lib/hooks/use-language';
import { translations } from '@/lib/i18n/translations';



export default function MenuPage() {
  const { language } = useLanguage();
  const t = translations[language || 'ja'].menu;
  const tSettings = translations[language || 'ja'].settings;
  const tRecording = translations[language || 'ja'].recording;
  
  const menuItems = [
    { 
        id: 'profile',
        title: t.profile, 
        description: language === 'ja' ? "アカウント情報や表示名の変更" : "View and edit account information", 
        icon: User,
        href: '/menu/profile'
    },
    { 
        id: 'notifications',
        title: language === 'ja' ? "お知らせ" : "Notifications", 
        description: language === 'ja' ? "運営からのお知らせを確認" : "Check announcements from the team",
        icon: Bell,
        href: '/menu/notifications'
    },
    { 
        id: 'following',
        title: language === 'ja' ? "フォロー" : "Following", 
        description: language === 'ja' ? "フォローしているトレーナーの確認" : "View trainers you follow", 
        icon: Heart,
        href: null 
    },
    { 
        id: 'favorites',
        title: language === 'ja' ? "お気に入り" : "Favorites", 
        description: language === 'ja' ? "お気に入りしたセッション" : "Your favorite sessions",
        icon: Star,
        href: '/favorites'
    },
    { 
        id: 'recording',
        title: tRecording.title,
        description: language === 'ja' ? "台本を読んでセッションを収録" : "Record sessions with scripts",
        icon: Mic,
        href: '/recording',
        premium: true
    },
    { 
        id: 'membership',
        title: language === 'ja' ? "メンバーシップ" : "Membership", 
        description: language === 'ja' ? "プランの確認・変更" : "View and manage your plan",
        icon: Award,
        href: '/premium'
    },
    { 
        id: 'add-session',
        title: language === 'ja' ? "新規セッションを追加" : "Add New Session",
        description: language === 'ja' ? "新しいセッションを作成・提案する" : "Create or suggest a new session",
        icon: PlusCircle,
        href: '/add-session'
    },
    { 
        id: 'advanced',
        title: tSettings.title,
        description: language === 'ja' ? "言語設定や通知設定など" : "Language, notifications, and more",
        icon: SettingsIcon,
        href: '/settings'
    },
    { 
        id: 'contact',
        title: t.contact,
        description: language === 'ja' ? "ご意見・ご要望はこちらへ" : "Send us your feedback",
        icon: Mail,
        href: '/contact'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-24">
      <Header />
      <PageTransition>
        <div className="pt-12">
          <AdBanner />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-2xl mx-auto">
          <div className="mb-3">
            <div className="relative mb-2">
              <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-4 mr-8 rounded-r-lg"></div>
              <h1 className="relative text-xl font-bold font-headline py-1.5 pl-2">{t.title}</h1>
            </div>
          </div>
          <div className="space-y-2">
            {menuItems.map((item) => {
              const content = (
                <Card className="hover:bg-primary/5 transition-colors">
                  <CardHeader className="flex flex-row items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                      <div className={`${item.premium ? 'bg-amber-500/20' : 'bg-accent/80'} p-3 rounded-lg`}>
                        <item.icon className={`h-5 w-5 ${item.premium ? 'text-amber-500' : 'text-primary'}`} />
                      </div>
                      <div>
                        <CardTitle className="text-base flex items-center gap-2">
                          {item.title}
                          {item.premium && <span className="text-xs px-1.5 py-0.5 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded">Premium</span>}
                        </CardTitle>
                        <CardDescription className="text-xs">{item.description}</CardDescription>
                      </div>
                    </div>
                    {item.href ? (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    ) : null}
                  </CardHeader>
                </Card>
              );

              if (item.href) {
                return (
                  <Link href={item.href} key={item.id} className="block">
                    {content}
                  </Link>
                );
              }

              return (
                <div key={item.id} className="relative cursor-not-allowed">
                  {content}
                  <div className="absolute inset-0 bg-white/50 dark:bg-black/50 flex items-center justify-center rounded-lg">
                     <p className="text-xs font-semibold bg-primary/20 text-primary-foreground backdrop-blur-sm px-2 py-1 rounded-full">{tSettings.comingSoon}</p>
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
