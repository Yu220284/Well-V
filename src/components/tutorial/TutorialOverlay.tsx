"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTutorial } from '@/lib/hooks/use-tutorial';
import { useRouter } from 'next/navigation';
import { useLocalAuth } from '@/lib/hooks/use-local-auth';
import { useEffect, useState } from 'react';

const TUTORIAL_STEPS = [
  { message: 'フォローしたトレーナーを見てみましょう', target: '[data-tutorial="trainer-list"]' },
  { message: '先ほどフォローしたトレーナーがいますね！試しにこの人のプロフィールを見てみましょう', target: '[data-tutorial="trainer-card"]' },
  { message: 'このトレーナーのセッションを見てみましょう', target: '[data-tutorial="session-list"]' },
  { message: '早速セッションを聞いてみましょう！', target: '[data-tutorial="session-card"]' },
  { message: '再生や一時停止ができます', target: '[data-tutorial="play-button"]' },
  { message: '音量を調整できます', target: '[data-tutorial="volume"]' },
  { message: '10秒戻せます', target: '[data-tutorial="rewind"]' },
  { message: '10秒送れます', target: '[data-tutorial="forward"]' },
  { message: 'お気に入りに追加できます', target: '[data-tutorial="favorite"]' },
  { message: 'バーを最後まで動かしてセッションを終了してみましょう', target: '[data-tutorial="progress"]' },
  { message: 'コミュニティに感想を投稿できます', target: '[data-tutorial="post"]' },
  { message: 'SNSでシェアできます', target: '[data-tutorial="share"]' },
  { message: 'お疲れさまでした！これでチュートリアルは終了です。' },
];

export function TutorialOverlay() {
  const { isActive, currentStep, nextStep, endTutorial } = useTutorial();
  const { updateProfile } = useLocalAuth();
  const router = useRouter();
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!isActive) return;
    
    const step = TUTORIAL_STEPS[currentStep];
    if (!step?.target) {
      setTargetRect(null);
      return;
    }

    const checkElement = () => {
      const element = document.querySelector(step.target!);
      if (element) {
        const rect = element.getBoundingClientRect();
        setTargetRect(rect);
      }
    };

    checkElement();
    const interval = setInterval(checkElement, 100);
    window.addEventListener('scroll', checkElement, true);
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', checkElement, true);
    };
  }, [isActive, currentStep]);

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
      <div className="fixed inset-0 bg-black/70 z-[9998]" />
      
      {targetRect && (
        <>
          <div
            className="fixed bg-transparent z-[9999] pointer-events-auto cursor-pointer"
            style={{
              top: `${targetRect.top}px`,
              left: `${targetRect.left}px`,
              width: `${targetRect.width}px`,
              height: `${targetRect.height}px`,
            }}
            onClick={handleNext}
          />
          <div
            className="fixed z-[9999] pointer-events-none border-4 border-white rounded-lg animate-pulse"
            style={{
              top: `${targetRect.top - 4}px`,
              left: `${targetRect.left - 4}px`,
              width: `${targetRect.width + 8}px`,
              height: `${targetRect.height + 8}px`,
              boxShadow: '0 0 20px rgba(255,255,255,0.8), inset 0 0 20px rgba(255,255,255,0.3)',
            }}
          />
        </>
      )}
      
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[10000] max-w-md w-full px-4">
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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000]">
          <Button onClick={handleNext} size="lg">
            ホームへ進む
          </Button>
        </div>
      )}
    </>
  );
}
