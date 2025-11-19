
'use client';

import { Header } from '@/components/layout/Header';
import { AdBanner } from '@/components/layout/AdBanner';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { User, Bell, Heart, Star, Award, Settings as SettingsIcon, Mail, ChevronRight, PlusCircle } from 'lucide-react';
import messages from '@/../messages/ja.json';

const menuItems = [
    { 
        id: 'profile',
        title: "プロフィール", 
        description: "アカウント情報や表示名の変更", 
        icon: User,
        href: '/menu/profile'
    },
    { 
        id: 'notifications',
        title: "お知らせ", 
        description: "運営からのお知らせを確認",
        icon: Bell,
        href: '/menu/notifications'
    },
    { 
        id: 'following',
        title: "フォロー", 
        description: "フォローしているトレーナーの確認", 
        icon: Heart,
        href: null 
    },
    { 
        id: 'favorites',
        title: "お気に入り", 
        description: "お気に入りしたセッション",
        icon: Star,
        href: '/favorites'
    },
    { 
        id: 'membership',
        title: "メンバーシップ", 
        description: "プランの確認・変更",
        icon: Award,
        href: null
    },
    { 
        id: 'add-session',
        title: "新規セッションを追加",
        description: "新しいセッションを作成・提案する",
        icon: PlusCircle,
        href: '/add-session'
    },
    { 
        id: 'advanced',
        title: "詳細設定",
        description: "言語設定や通知設定など",
        icon: SettingsIcon,
        href: '/settings'
    },
    { 
        id: 'contact',
        title: "お問い合わせ",
        description: "ご意見・ご要望はこちらへ",
        icon: Mail,
        href: null
    },
];

const WIP_MESSAGE = "この機能は現在開発中です。";

export default function MenuPage() {
  const t = messages.MenuPage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-24">
      <Header />
      <AdBanner />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline mb-6">{t.title}</h1>
          </div>
          <div className="space-y-4">
            {menuItems.map((item) => {
              const content = (
                <Card className="hover:bg-muted/50 transition-colors">
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
                     <p className="text-xs font-semibold bg-primary/20 text-primary-foreground backdrop-blur-sm px-2 py-1 rounded-full">{WIP_MESSAGE}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
