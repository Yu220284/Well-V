'use client';

import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Crown, Ban } from 'lucide-react';
import { usePremium } from '@/lib/hooks/use-premium';
import { useTranslations } from '@/lib/hooks/use-translations';

export default function SubscriptionPage() {
  const router = useRouter();
  const { checkPremiumStatus, showAds, toggleAds, setPremium } = usePremium();
  const { t } = useTranslations();
  const isPremium = checkPremiumStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-24">
      <Header />
      <PageTransition>
        <div className="pt-12">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="max-w-2xl mx-auto">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('back')}
              </Button>

              <div className="relative mb-4">
                <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-4 mr-8 rounded-r-lg"></div>
                <h1 className="relative text-xl font-bold font-headline py-1.5 pl-2">サブスクリプション</h1>
              </div>

              <div className="space-y-4">
                {isPremium ? (
                  <>
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-200 via-violet-200 to-indigo-200 flex items-center justify-center">
                            <Crown className="h-6 w-6 text-purple-700" />
                          </div>
                          <div>
                            <CardTitle>プレミアム会員</CardTitle>
                            <CardDescription>すべての機能をご利用いただけます</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            if (confirm('プレミアム会員を解約しますか？')) {
                              setPremium(false);
                              alert('プレミアム会員を解約しました');
                            }
                          }}
                        >
                          プレミアムを解約
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-4">
                          <div className="bg-accent/80 p-3 rounded-lg">
                            <Ban className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-base">{t('settings.adDisplay')}</CardTitle>
                            <CardDescription className="text-xs">{t('settings.adDisplayDesc')}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{t('settings.showAds')}</span>
                          <Switch checked={showAds} onCheckedChange={toggleAds} />
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>無料プラン</CardTitle>
                      <CardDescription>基本機能をご利用いただけます</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        className="w-full bg-gradient-to-r from-purple-200 via-violet-200 to-indigo-200 hover:from-purple-300 hover:via-violet-300 hover:to-indigo-300 text-purple-700 font-semibold"
                        onClick={() => router.push('/premium')}
                      >
                        <Crown className="h-5 w-5 mr-2" />
                        プレミアムにアップグレード
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </main>
        </div>
      </PageTransition>
    </div>
  );
}
