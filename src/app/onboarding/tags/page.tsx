"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flower2, Zap, StretchHorizontal, Brain, Heart, Activity, Sparkles, Music } from 'lucide-react';
import { useLocalAuth } from '@/lib/hooks/use-local-auth';
import { ProgressBar } from '@/components/onboarding/ProgressBar';
import { useTranslations } from '@/lib/hooks/use-translations';



export default function TagsPage() {
  const router = useRouter();
  const { updateProfile } = useLocalAuth();
  const { t } = useTranslations();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const AVAILABLE_TAGS = [
    { id: 'yoga', name: t('tags.yoga'), icon: Flower2 },
    { id: 'workout', name: t('tags.workout'), icon: Zap },
    { id: 'stretch', name: t('tags.stretch'), icon: StretchHorizontal },
    { id: 'mindfulness', name: t('tags.mindfulness'), icon: Brain },
    { id: 'cardio', name: t('tags.cardio'), icon: Heart },
    { id: 'pilates', name: t('tags.pilates'), icon: Activity },
    { id: 'meditation', name: t('tags.meditation'), icon: Sparkles },
    { id: 'dance', name: t('tags.dance'), icon: Music },
  ];

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]
    );
  };

  const handleContinue = () => {
    updateProfile({ tags: selectedTags });
    router.push('/onboarding/follow');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4 pb-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="pt-6">
          <ProgressBar currentStep={4} totalSteps={6} />
          <h1 className="text-2xl font-bold text-center mb-2 mt-2">{t('onboarding.selectThemes')}</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {t('onboarding.selectThemesDesc')}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {AVAILABLE_TAGS.map((tag) => (
              <button
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedTags.includes(tag.id)
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <tag.icon className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm font-medium">{tag.name}</div>
              </button>
            ))}
          </div>

          <Button
            onClick={handleContinue}
            disabled={selectedTags.length === 0}
            className="w-full"
            size="lg"
          >
            {t('continue')} ({selectedTags.length}{t('onboarding.selected')})
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
