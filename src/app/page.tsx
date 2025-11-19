
'use client';

import React, { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { ProgressTracker } from "@/components/home/ProgressTracker";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Flame, Activity, Coffee, Zap, Smile, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { SESSIONS } from '@/lib/data';
import { useSessionStore } from '@/lib/hooks/use-session-store';
import { AdBanner } from "@/components/layout/AdBanner";

type Goal = 'rest' | 'light' | 'normal' | 'intense';

export default function HomePage() {
  const [selectedGoal, setSelectedGoal] = useState<Goal>('normal');
  const { sessionHistory, isLoaded } = useSessionStore();

  const goals: { id: Goal, label: string, icon: React.ReactNode }[] = [
    { id: 'intense', label: 'がっつり', icon: <Flame className="h-5 w-5" /> },
    { id: 'normal', label: 'いつも通り', icon: <Activity className="h-5 w-5" /> },
    { id: 'light', label: '今日は軽め', icon: <Coffee className="h-5 w-5" /> },
    { id: 'rest', label: 'おやすみ', icon: <Moon className="h-5 w-5" /> },
  ];

  const lastSession = isLoaded && sessionHistory.length > 0 ? SESSIONS.find(s => s.id === sessionHistory[sessionHistory.length - 1].sessionId) : null;
  const lastInterruptedSession = SESSIONS[1]; // Placeholder

  return (
    <div className="pb-24">
      <Header />
      <AdBanner />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold font-headline mb-4">あなたの記録</h2>
            <ProgressTracker />
          </section>

          <section>
            <h2 className="text-2xl font-bold font-headline mb-4">今日の目標</h2>
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-4 gap-2">
                  {goals.map((goal) => (
                    <Button
                      key={goal.id}
                      variant={selectedGoal === goal.id ? 'default' : 'outline'}
                      onClick={() => setSelectedGoal(goal.id)}
                      className="flex flex-col h-20 gap-1"
                    >
                      {goal.icon}
                      <span className="text-xs">{goal.label}</span>
                    </Button>
                  ))}
                </div>
                {selectedGoal === 'rest' && (
                  <p className="text-center text-sm text-muted-foreground mt-4 p-4 bg-accent/50 rounded-lg">
                    休息も大切なトレーニングの一部です。心と体をゆっくり休ませてあげましょう。
                  </p>
                )}
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="text-2xl font-bold font-headline mb-4">中断したセッション</h2>
            {lastInterruptedSession ? (
              <Link href={`/session/${lastInterruptedSession.id}`} className="group block">
                <Card className="overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
                  <div className="flex">
                    <div className="relative h-full w-24 flex-shrink-0">
                      <Image
                        src={lastInterruptedSession.imageUrl}
                        alt={lastInterruptedSession.title}
                        data-ai-hint={lastInterruptedSession.imageHint}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <CardTitle className="text-base font-bold">{lastInterruptedSession.title}</CardTitle>
                      <CardDescription className="text-xs mt-1">
                        続きから再開できます
                      </CardDescription>
                      <Button size="sm" className="mt-2">セッションを再開</Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ) : (
               <div className="bg-card p-4 rounded-lg shadow-sm text-center">
                 <p className="text-muted-foreground text-sm">中断したセッションはありません。</p>
               </div>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-bold font-headline mb-4">最近のアクティビティ</h2>
            {lastSession ? (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Check className="text-green-500"/>
                            セッション完了！
                        </CardTitle>
                        <CardDescription>
                            {lastSession.title}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">素晴らしい！昨日より少し長く運動できましたね！</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="bg-card p-4 rounded-lg shadow-sm text-center">
                    <p className="text-muted-foreground text-sm">今日最初のセッションを始めましょう！</p>
                </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
