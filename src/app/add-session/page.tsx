"use client";

import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Mic, Upload, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/lib/hooks/use-language';
import { translations } from '@/lib/i18n/translations';

export default function AddSessionPage() {
  const { language } = useLanguage();
  const t = translations[language || 'ja'];

  const options = [
    {
      id: 'script',
      title: language === 'ja' ? '台本を読んでセッションを追加' : 'Add Session from Script',
      description: language === 'ja' ? '台本を選んで収録し、セッションを作成' : 'Record with a script to create a session',
      icon: Mic,
      href: '/recording',
      premium: true,
    },
    {
      id: 'audio',
      title: language === 'ja' ? '音声データからセッションを追加' : 'Add Session from Audio',
      description: language === 'ja' ? '既存の音声ファイルをアップロード' : 'Upload an existing audio file',
      icon: Upload,
      href: '/add-session/upload',
    },
  ];

  return (
    <div className="pb-24">
      <Header />
      <PageTransition>
        <div className="pt-12">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="max-w-2xl mx-auto">
              <Link href="/menu">
                <Button variant="ghost" className="mb-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t.back}
                </Button>
              </Link>

              <div className="mb-6">
                <div className="relative mb-2">
                  <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-4 mr-8 rounded-r-lg"></div>
                  <h1 className="relative text-xl font-bold font-headline py-1.5 pl-2">
                    {language === 'ja' ? '新規セッションを追加' : 'Add New Session'}
                  </h1>
                </div>
                <p className="text-muted-foreground">
                  {language === 'ja' ? '追加方法を選択してください' : 'Choose how to add your session'}
                </p>
              </div>

              <div className="space-y-4">
                {options.map((option) => (
                  <Link key={option.id} href={option.href}>
                    <Card className="hover:shadow-lg transition-all hover:-translate-y-0.5">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={`${option.premium ? 'bg-amber-500/20' : 'bg-primary/10'} p-4 rounded-lg`}>
                            <option.icon className={`h-6 w-6 ${option.premium ? 'text-amber-500' : 'text-primary'}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                              {option.title}
                              {option.premium && (
                                <span className="text-xs px-2 py-0.5 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded">
                                  Premium
                                </span>
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </main>
        </div>
      </PageTransition>
    </div>
  );
}
