"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Flower2, Zap, StretchHorizontal, Brain, Heart, Activity, Sparkles, Music } from 'lucide-react';
import { useLocalAuth } from '@/lib/hooks/use-local-auth';
import { ProgressBar } from '@/components/onboarding/ProgressBar';
import { useTranslations } from '@/lib/hooks/use-translations';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import { useLanguage } from '@/lib/hooks/use-language';
import { translations } from '@/lib/i18n/translations';



export default function TagsPage() {
  const router = useRouter();
  const { updateProfile } = useLocalAuth();
  const { language } = useLanguage();
  const t = translations[language || 'ja'].onboarding;
  const tTags = translations[language || 'ja'].tags;
  const tCommon = translations[language || 'ja'];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const AVAILABLE_TAGS = [
    { id: 'yoga', name: tTags.yoga, icon: Flower2, colorActive: 'bg-yellow-100 text-yellow-800 border-yellow-300', colorInactive: 'bg-yellow-50/30 text-yellow-900/60 border-yellow-200/40 hover:border-yellow-300/60' },
    { id: 'workout', name: tTags.workout, icon: Zap, colorActive: 'bg-pink-100 text-pink-800 border-pink-300', colorInactive: 'bg-pink-50/30 text-pink-900/60 border-pink-200/40 hover:border-pink-300/60' },
    { id: 'stretch', name: tTags.stretch, icon: StretchHorizontal, colorActive: 'bg-cyan-100 text-cyan-800 border-cyan-300', colorInactive: 'bg-cyan-50/30 text-cyan-900/60 border-cyan-200/40 hover:border-cyan-300/60' },
    { id: 'meditation', name: tTags.meditation, icon: Sparkles, colorActive: 'bg-green-100 text-green-800 border-green-300', colorInactive: 'bg-green-50/30 text-green-900/60 border-green-200/40 hover:border-green-300/60' },
  ];

  const VOICE_TYPES = [
    { id: 'ikebo', nameJa: '#イケボ', nameEn: '#Ikebo', colorActive: 'bg-blue-100 text-blue-800 border-blue-300', colorInactive: 'bg-blue-50/30 text-blue-900/60 border-blue-200/40 hover:border-blue-300/60' },
    { id: 'kawabo', nameJa: '#カワボ', nameEn: '#Kawabo', colorActive: 'bg-pink-100 text-pink-800 border-pink-300', colorInactive: 'bg-pink-50/30 text-pink-900/60 border-pink-200/40 hover:border-pink-300/60' },
    { id: 'energetic', nameJa: '#元気', nameEn: '#Energetic', colorActive: 'bg-orange-100 text-orange-800 border-orange-300', colorInactive: 'bg-orange-50/30 text-orange-900/60 border-orange-200/40 hover:border-orange-300/60' },
    { id: 'cool', nameJa: '#クール', nameEn: '#Cool', colorActive: 'bg-cyan-100 text-cyan-800 border-cyan-300', colorInactive: 'bg-cyan-50/30 text-cyan-900/60 border-cyan-200/40 hover:border-cyan-300/60' },
  ];

  const LANGUAGES = [
    { id: 'japanese', nameJa: '#日本語', nameEn: '#Japanese', colorActive: 'bg-purple-100 text-purple-800 border-purple-300', colorInactive: 'bg-purple-50/30 text-purple-900/60 border-purple-200/40 hover:border-purple-300/60' },
    { id: 'english', nameJa: '#英語', nameEn: '#English', colorActive: 'bg-indigo-100 text-indigo-800 border-indigo-300', colorInactive: 'bg-indigo-50/30 text-indigo-900/60 border-indigo-200/40 hover:border-indigo-300/60' },
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-3 relative">
      <AnimatedBackground />
      <Card className="w-full max-w-2xl relative z-10">
        <CardContent className="pt-6">
          <ProgressBar currentStep={4} totalSteps={6} />
          <h1 className="text-xl font-bold text-center mb-1 mt-1">{t.selectThemes}</h1>
          <p className="text-sm text-muted-foreground text-center mb-4">
            {t.selectThemesDesc}
          </p>

          <div className="space-y-4 mb-4">
            <div>
              <h3 className="text-sm font-semibold mb-3">{language === 'ja' ? 'カテゴリー' : 'Categories'}</h3>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TAGS.map((tag) => (
                  <button
                    key={tag.id}
                    onClick={() => toggleTag(tag.id)}
                    className={`px-4 py-2 rounded-full border-2 transition-all text-sm ${
                      selectedTags.includes(tag.id)
                        ? tag.colorActive
                        : tag.colorInactive
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
                        ? voice.colorActive
                        : voice.colorInactive
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
                        ? lang.colorActive
                        : lang.colorInactive
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
            {tCommon.continue} ({selectedTags.length}{t.selected})
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
