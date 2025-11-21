"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTutorial } from '@/lib/hooks/use-tutorial';
import { useRouter } from 'next/navigation';
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

export function TutorialOverlay() {
  const { isActive, currentStep, nextStep, endTutorial } = useTutorial();
  const { updateProfile } = useLocalAuth();
  const router = useRouter();

  console.log('Tutorial overlay:', { isActive, currentStep });

  if (!isActive) return null;

  const step = TUTORIAL_STEPS[currentStep];
  const isLastStep = currentStep === TUTORIAL_STEPS.length - 1;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLastStep) {
      endTutorial();
      updateProfile({ onboardingCompleted: true });
    } else {
      nextStep();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-400/20 z-[9998] pointer-events-none" />
      
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[9999] max-w-md w-full px-4" onClick={handleNext}>
        <Card className="bg-primary text-primary-foreground shadow-lg cursor-pointer">
          <CardContent className="p-4 text-center">
            <p className="font-medium">{step?.message}</p>
            <p className="text-xs mt-2 opacity-80">
              {isLastStep ? 'タップして終了' : '画面をタップして次へ'}
            </p>
          </CardContent>
        </Card>
      </div>

      {isLastStep && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999]">
          <Button onClick={handleNext} size="lg">
            ホームへ進む
          </Button>
        </div>
      )}
    </>
  );
}
