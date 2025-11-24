"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useTranslations } from '@/lib/hooks/use-translations';

const DOWNLOAD_ITEMS = [
  { id: 1, name: '基本データ', size: '2.5MB' },
  { id: 2, name: 'セッション音声', size: '15.3MB' },
  { id: 3, name: 'トレーナー画像', size: '8.7MB' },
  { id: 4, name: 'UI素材', size: '3.2MB' },
];

export default function DownloadPage() {
  const router = useRouter();
  const { t } = useTranslations();
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4 pb-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <Download className={`h-10 w-10 text-primary ${isStarted ? 'animate-bounce' : ''}`} />
            </div>
            <h2 className="text-2xl font-bold mb-2">{isStarted ? t('onboarding.downloading') : t('onboarding.dataDownload')}</h2>
            <p className="text-muted-foreground text-sm">
              {isStarted
                ? currentItem < DOWNLOAD_ITEMS.length
                  ? `${DOWNLOAD_ITEMS[currentItem].name}...`
                  : t('onboarding.downloadComplete')
                : t('onboarding.downloadDesc')}
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
                  <span>{item.name}</span>
                  <span className="text-xs">
                    {idx < currentItem ? '✓' : idx === currentItem ? `${progress}%` : item.size}
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
