"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useLocalAuth } from '@/lib/hooks/use-local-auth';
import { ProgressBar } from '@/components/onboarding/ProgressBar';

const AVAILABLE_TAGS = [
  { id: 'yoga', name: 'ヨガ', emoji: '🧘' },
  { id: 'workout', name: '筋トレ', emoji: '💪' },
  { id: 'stretch', name: 'ストレッチ', emoji: '🤸' },
  { id: 'mindfulness', name: 'マインドフルネス', emoji: '🧠' },
  { id: 'cardio', name: '有酸素運動', emoji: '🏃' },
  { id: 'pilates', name: 'ピラティス', emoji: '🤸‍♀️' },
  { id: 'meditation', name: '瞑想', emoji: '🕉️' },
  { id: 'dance', name: 'ダンス', emoji: '💃' },
];

export default function TagsPage() {
  const router = useRouter();
  const { updateProfile } = useLocalAuth();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]
    );
  };

  const handleContinue = () => {
    updateProfile({ tags: selectedTags });
    router.push('/onboarding/profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4 pb-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="pt-6">
          <ProgressBar currentStep={3} totalSteps={6} />
          <h1 className="text-2xl font-bold text-center mb-2 mt-2">興味のあるテーマを選択</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">
            あなたにぴったりのセッションをおすすめします
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
                <div className="text-3xl mb-2">{tag.emoji}</div>
                <div className="text-sm font-medium">{tag.name}</div>
                {selectedTags.includes(tag.id) && (
                  <Check className="h-4 w-4 text-primary mx-auto mt-2" />
                )}
              </button>
            ))}
          </div>

          <Button
            onClick={handleContinue}
            disabled={selectedTags.length === 0}
            className="w-full"
            size="lg"
          >
            続ける ({selectedTags.length}個選択中)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
