"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';

const DOWNLOAD_ITEMS = [
  { id: 1, nameJa: '基本データ', nameEn: 'Basic Data', sizeMB: 2.5 },
  { id: 2, nameJa: 'セッション音声', nameEn: 'Session Audio', sizeMB: 15.3 },
  { id: 3, nameJa: 'トレーナー画像', nameEn: 'Trainer Images', sizeMB: 8.7 },
  { id: 4, nameJa: 'UI素材', nameEn: 'UI Assets', sizeMB: 3.2 },
];

const TOTAL_SIZE_MB = DOWNLOAD_ITEMS.reduce((sum, item) => sum + item.sizeMB, 0);

export default function DownloadPage() {
  const router = useRouter();
  const { t, language } = useTranslations();
  const [isStarted, setIsStarted] = useState(false);
  const [currentItem, setCurrentItem] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isStarted) return;
    
    if (currentItem >= DOWNLOAD_ITEMS.length) {
      setTimeout(() => router.push('/onboarding/tutorial'), 1000);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setCurrentItem(c => c + 1);
          return 0;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [currentItem, router, isStarted]);

  const totalProgress = ((currentItem * 100 + progress) / (DOWNLOAD_ITEMS.length * 100)) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-3 relative">
      <AnimatedBackground />
      <Card className="w-full max-w-md relative z-10">
        <CardContent className="pt-6">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <Download className={`h-10 w-10 text-primary ${isStarted ? 'animate-bounce' : ''}`} />
            </div>
            <h2 className="text-xl font-bold mb-1">{isStarted ? t('onboarding.downloading') : t('onboarding.dataDownload')}</h2>
            <p className="text-muted-foreground text-sm">
              {isStarted
                ? currentItem < DOWNLOAD_ITEMS.length
                  ? `${language === 'ja' ? DOWNLOAD_ITEMS[currentItem].nameJa : DOWNLOAD_ITEMS[currentItem].nameEn}...`
                  : t('onboarding.downloadComplete')
                : `${t('onboarding.downloadDesc')} (${TOTAL_SIZE_MB.toFixed(1)}MB)`}
            </p>
          </div>

          {!isStarted ? (
            <Button onClick={() => setIsStarted(true)} className="w-full" size="lg">
              {t('onboarding.startDownload')}
            </Button>
          ) : (
            <div className="space-y-4">
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-200 via-blue-200 to-yellow-200 transition-all duration-300 relative"
                style={{ width: `${totalProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer" />
              </div>
            </div>

            <div className="space-y-2">
              {DOWNLOAD_ITEMS.map((item, idx) => (
                <div
                  key={item.id}
                  className={`flex items-center justify-between text-sm ${
                    idx < currentItem
                      ? 'text-primary'
                      : idx === currentItem
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground'
                  }`}
                >
                  <span>{language === 'ja' ? item.nameJa : item.nameEn}</span>
                  <span className="text-xs">
                    {idx < currentItem ? '✓' : idx === currentItem ? `${progress}%` : `${item.sizeMB}MB`}
                  </span>
                </div>
              ))}
            </div>

              <p className="text-center text-xs text-muted-foreground mt-6">
                {Math.round(totalProgress)}% {t('onboarding.completed')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
