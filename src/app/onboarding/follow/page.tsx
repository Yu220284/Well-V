"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Check } from 'lucide-react';
import { TRAINERS } from '@/lib/data';
import { useFollowStore } from '@/lib/hooks/use-follow-store';
import { ProgressBar } from '@/components/onboarding/ProgressBar';
import { useTranslations } from '@/lib/hooks/use-translations';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';

export default function FollowPage() {
  const router = useRouter();
  const { t } = useTranslations();
  const { followedTrainers } = useFollowStore();
  const recommendedTrainers = TRAINERS.slice(0, 6);
  const [localFollowed, setLocalFollowed] = useState<number[]>([]);
  
  useEffect(() => {
    const initialFollowed = recommendedTrainers.map(t => t.id);
    setLocalFollowed(initialFollowed);
    
    const currentFollowed = JSON.parse(localStorage.getItem('wellv_followed_trainers') || '[]');
    const allFollowed = [...new Set([...currentFollowed, ...initialFollowed])];
    localStorage.setItem('wellv_followed_trainers', JSON.stringify(allFollowed));
  }, []);

  const handleToggle = (trainerId: number) => {
    setLocalFollowed(prev => {
      const newFollowed = prev.includes(trainerId)
        ? prev.filter(id => id !== trainerId)
        : [...prev, trainerId];
      
      const currentFollowed = JSON.parse(localStorage.getItem('wellv_followed_trainers') || '[]');
      const updated = newFollowed.length > prev.length
        ? [...new Set([...currentFollowed, trainerId])]
        : currentFollowed.filter((id: number) => id !== trainerId);
      localStorage.setItem('wellv_followed_trainers', JSON.stringify(updated));
      
      return newFollowed;
    });
  };

  const selectedCount = localFollowed.length;

  const handleContinue = () => {
    if (selectedCount === 0) return;
    router.push('/onboarding/download');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-3 relative">
      <AnimatedBackground />
      <Card className="w-full max-w-2xl relative z-10">
        <CardContent className="pt-6">
          <ProgressBar currentStep={5} totalSteps={6} />
          <h1 className="text-xl font-bold text-center mb-1 mt-1">{t('onboarding.recommendedTrainers')}</h1>
          <p className="text-sm text-muted-foreground text-center mb-4">
            {t('onboarding.followTrainers')}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            {recommendedTrainers.map((trainer) => (
              <button
                key={trainer.id}
                onClick={() => handleToggle(trainer.id)}
                className={`relative h-32 rounded-lg border-2 transition-all overflow-hidden ${
                  localFollowed.includes(trainer.id)
                    ? 'border-primary'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="absolute inset-0">
                  <img src={trainer.imageUrl} alt={trainer.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                </div>
                <div className="relative h-full flex flex-col justify-end p-3">
                  <div className="text-sm font-medium text-white mb-1">{trainer.name}</div>
                  <div className="flex flex-wrap gap-1">
                    {trainer.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {localFollowed.includes(trainer.id) && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <Button onClick={handleContinue} disabled={selectedCount === 0} className="w-full" size="lg">
            {t('onboarding.nextWithCount')} ({selectedCount}{t('onboarding.following')})
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
