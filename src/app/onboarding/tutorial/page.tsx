"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Diamond, Users, ChevronRight } from 'lucide-react';
import { useLocalAuth } from '@/lib/hooks/use-local-auth';
import { ProgressBar } from '@/components/onboarding/ProgressBar';

const TUTORIAL_STEPS = [
  {
    icon: Play,
    title: 'セッションを始めよう',
    description: 'お気に入りのセッションを選んで、音声ガイドに従ってエクササイズを楽しもう',
  },
  {
    icon: Diamond,
    title: 'ダイヤを集めよう',
    description: 'セッションを完了するとダイヤがもらえます。ダイヤでトレーナーの限定グッズと交換できます',
  },
  {
    icon: Users,
    title: 'コミュニティに参加',
    description: 'トレーナーのコミュニティで他のメンバーと交流したり、投稿をシェアしよう',
  },
];

export default function TutorialPage() {
  const router = useRouter();
  const { updateProfile } = useLocalAuth();

  const handleStart = () => {
    localStorage.setItem('wellv_tutorial_active', 'true');
    localStorage.setItem('wellv_tutorial_step', '0');
    setTimeout(() => router.push('/'), 100);
  };

  const handleSkip = () => {
    updateProfile({ onboardingCompleted: true });
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4 pb-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <ProgressBar currentStep={5} totalSteps={6} />
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <Play className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">チュートリアルを開始しますか？</h2>
            <p className="text-muted-foreground">セッションの使い方を学びましょう</p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSkip} variant="outline" className="flex-1" size="lg">
              スキップ
            </Button>
            <Button onClick={handleStart} className="flex-1" size="lg">
              開始する
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
