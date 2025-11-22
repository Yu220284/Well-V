"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLocalAuth } from '@/lib/hooks/use-local-auth';

const TUTORIAL_STEPS = [
  { message: 'フォローしたトレーナーを見てみましょう' },
  { message: '先ほどフォローしたトレーナーがいますね！試しにこの人のプロフィールを見てみましょう' },
  { message: 'このトレーナーのセッションを見てみましょう' },
  { message: '早速セッションを聞いてみましょう！' },
  { message: '再生や一時停止ができます' },
  { message: '音量を調整できます' },
  { message: '10秒戻せます' },
  { message: '10秒送れます' },
  { message: 'お気に入りに追加できます' },
  { message: 'バーを最後まで動かしてセッションを終了してみましょう' },
  { message: 'コミュニティに感想を投稿できます' },
  { message: 'SNSでシェアできます' },
  { message: 'お疲れさまでした！これでチュートリアルは終了です。' },
];

export default function TutorialSessionPage() {
  const router = useRouter();
  const { updateProfile } = useLocalAuth();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleComplete = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.setItem('wellv_tutorial_active', 'true');
    localStorage.setItem('wellv_tutorial_step', '0');
    setTimeout(() => {
      router.push('/');
    }, 100);
  };

  const step = TUTORIAL_STEPS[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 relative" onClick={handleNext}>
      <div className="fixed inset-0 bg-gray-400/20 z-40" />

      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 max-w-md w-full px-4">
        <Card className="bg-primary text-primary-foreground shadow-lg">
          <CardContent className="p-4 text-center">
            <p className="font-medium">{step.message}</p>
            <p className="text-xs mt-2 opacity-80">画面をタップして次へ</p>
          </CardContent>
        </Card>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <p className="text-center text-muted-foreground">チュートリアルモード</p>
        <p className="text-center text-sm text-muted-foreground mt-2">ステップ {currentStep + 1} / {TUTORIAL_STEPS.length}</p>
      </div>

      {currentStep === TUTORIAL_STEPS.length - 1 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <Button onClick={handleComplete} size="lg">
            ホームへ進む
          </Button>
        </div>
      )}
    </div>
  );
}
