"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AVAILABLE_LANGUAGES, setSelectedLanguage, downloadLanguagePack, Language } from '@/lib/i18n/language-pack';
import { Check } from 'lucide-react';
import { ProgressBar } from '@/components/onboarding/ProgressBar';

export default function LanguageSelectPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<Language | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSelect = async () => {
    if (!selected) return;
    setIsDownloading(true);
    await downloadLanguagePack(selected);
    setSelectedLanguage(selected);
    router.push('/auth/signup');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4 pb-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <ProgressBar currentStep={1} totalSteps={6} />
          <h1 className="text-2xl font-bold text-center mb-2">言語を選択 / Select Language</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">あなたの言語を選んでください</p>
          
          <div className="space-y-3 mb-6">
            {AVAILABLE_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setSelected(lang.code)}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selected === lang.code
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-semibold">{lang.nativeName}</p>
                    <p className="text-sm text-muted-foreground">{lang.name}</p>
                  </div>
                  {selected === lang.code && (
                    <Check className="h-6 w-6 text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <Button
            onClick={handleSelect}
            disabled={!selected || isDownloading}
            className="w-full"
            size="lg"
          >
            {isDownloading ? 'ダウンロード中... / Downloading...' : '続ける / Continue'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
