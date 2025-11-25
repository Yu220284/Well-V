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
  const { t, language } = useTranslations();
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

  const VOICE_TYPES = [
    { id: 'ikebo', nameJa: '#イケボ', nameEn: '#Ikebo' },
    { id: 'kawabo', nameJa: '#カワボ', nameEn: '#Kawabo' },
    { id: 'energetic', nameJa: '#元気', nameEn: '#Energetic' },
    { id: 'cool', nameJa: '#クール', nameEn: '#Cool' },
    { id: 'neutral', nameJa: '#中性的', nameEn: '#Neutral' },
    { id: 'seiso', nameJa: '#清楚', nameEn: '#Seiso' },
    { id: 'tsundere', nameJa: '#ツンデレ', nameEn: '#Tsundere' },
    { id: 'chill', nameJa: '#落ち着き', nameEn: '#Chill' },
  ];

  const LANGUAGES = [
    { id: 'japanese', nameJa: '#日本語', nameEn: '#Japanese' },
    { id: 'english', nameJa: '#英語', nameEn: '#English' },
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

          <div className="space-y-6 mb-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">{language === 'ja' ? 'カテゴリー' : 'Categories'}</h3>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TAGS.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`px-4 py-2 rounded-full border-2 transition-all text-sm ${
                      selectedTags.includes(tag.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    #{tag.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">{language === 'ja' ? '声のタイプ' : 'Voice Types'}</h3>
              <div className="flex flex-wrap gap-2">
                {VOICE_TYPES.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => toggleTag(voice.id)}
                    className={`px-4 py-2 rounded-full border-2 transition-all text-sm ${
                      selectedTags.includes(voice.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {language === 'ja' ? voice.nameJa : voice.nameEn}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-3">{language === 'ja' ? '言語' : 'Languages'}</h3>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => toggleTag(lang.id)}
                    className={`px-4 py-2 rounded-full border-2 transition-all text-sm ${
                      selectedTags.includes(lang.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {language === 'ja' ? lang.nameJa : lang.nameEn}
                  </button>
                ))}
              </div>
            </div>
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
