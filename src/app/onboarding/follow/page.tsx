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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4 pb-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="pt-6">
          <ProgressBar currentStep={5} totalSteps={6} />
          <h1 className="text-2xl font-bold text-center mb-2 mt-2">{t('onboarding.recommendedTrainers')}</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {t('onboarding.followTrainers')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {recommendedTrainers.map((trainer) => (
              <button
                key={trainer.id}
                onClick={() => handleToggle(trainer.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  localFollowed.includes(trainer.id)
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Avatar className="h-16 w-16 mx-auto mb-2">
                  <AvatarImage src={trainer.imageUrl} alt={trainer.name} />
                  <AvatarFallback>{trainer.name[0]}</AvatarFallback>
                </Avatar>
                <div className="text-sm font-medium mb-1">{trainer.name}</div>
                <div className="text-xs text-muted-foreground mb-2">{trainer.specialty}</div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {trainer.tags.slice(0, 2).map((tag, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
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
