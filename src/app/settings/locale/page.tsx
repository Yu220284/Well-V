"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { AVAILABLE_LANGUAGES, setSelectedLanguage, getSelectedLanguage, Language } from '@/lib/i18n/language-pack';
import { useTranslations } from '@/lib/hooks/use-translations';
import { BottomNav } from '@/components/layout/BottomNav';

const REGIONS = [
  { code: 'jp', name: '日本', flag: '🇯🇵' },
  { code: 'us', name: 'アメリカ合衆国', flag: '🇺🇸' },
  { code: 'cn', name: '中国', flag: '🇨🇳' },
  { code: 'kr', name: '韓国', flag: '🇰🇷' },
  { code: 'tw', name: '台湾', flag: '🇹🇼' },
  { code: 'hk', name: '香港', flag: '🇭🇰' },
  { code: 'sg', name: 'シンガポール', flag: '🇸🇬' },
  { code: 'th', name: 'タイ', flag: '🇹🇭' },
  { code: 'vn', name: 'ベトナム', flag: '🇻🇳' },
  { code: 'ph', name: 'フィリピン', flag: '🇵🇭' },
  { code: 'my', name: 'マレーシア', flag: '🇲🇾' },
  { code: 'id', name: 'インドネシア', flag: '🇮🇩' },
  { code: 'in', name: 'インド', flag: '🇮🇳' },
  { code: 'au', name: 'オーストラリア', flag: '🇦🇺' },
  { code: 'nz', name: 'ニュージーランド', flag: '🇳🇿' },
  { code: 'ca', name: 'カナダ', flag: '🇨🇦' },
  { code: 'mx', name: 'メキシコ', flag: '🇲🇽' },
  { code: 'br', name: 'ブラジル', flag: '🇧🇷' },
  { code: 'ar', name: 'アルゼンチン', flag: '🇦🇷' },
  { code: 'gb', name: 'イギリス', flag: '🇬🇧' },
  { code: 'de', name: 'ドイツ', flag: '🇩🇪' },
  { code: 'fr', name: 'フランス', flag: '🇫🇷' },
  { code: 'it', name: 'イタリア', flag: '🇮🇹' },
  { code: 'es', name: 'スペイン', flag: '🇪🇸' },
  { code: 'nl', name: 'オランダ', flag: '🇳🇱' },
  { code: 'se', name: 'スウェーデン', flag: '🇸🇪' },
  { code: 'no', name: 'ノルウェー', flag: '🇳🇴' },
  { code: 'dk', name: 'デンマーク', flag: '🇩🇰' },
  { code: 'fi', name: 'フィンランド', flag: '🇫🇮' },
  { code: 'ch', name: 'スイス', flag: '🇨🇭' },
  { code: 'at', name: 'オーストリア', flag: '🇦🇹' },
  { code: 'be', name: 'ベルギー', flag: '🇧🇪' },
  { code: 'pl', name: 'ポーランド', flag: '🇵🇱' },
  { code: 'cz', name: 'チェコ', flag: '🇨🇿' },
  { code: 'hu', name: 'ハンガリー', flag: '🇭🇺' },
  { code: 'ru', name: 'ロシア', flag: '🇷🇺' },
  { code: 'ua', name: 'ウクライナ', flag: '🇺🇦' },
  { code: 'tr', name: 'トルコ', flag: '🇹🇷' },
  { code: 'il', name: 'イスラエル', flag: '🇮🇱' },
  { code: 'ae', name: 'アラブ首長国連邦', flag: '🇦🇪' },
  { code: 'sa', name: 'サウジアラビア', flag: '🇸🇦' },
  { code: 'eg', name: 'エジプト', flag: '🇪🇬' },
  { code: 'za', name: '南アフリカ', flag: '🇿🇦' },
  { code: 'ng', name: 'ナイジェリア', flag: '🇳🇬' },
  { code: 'ke', name: 'ケニア', flag: '🇰🇪' },
];

export default function LocaleSettingsPage() {
  const router = useRouter();
  const { t } = useTranslations();
  const [selectedLanguage, setSelectedLanguageState] = useState<Language>(getSelectedLanguage());
  const [selectedRegion, setSelectedRegion] = useState(
    typeof window !== 'undefined' ? localStorage.getItem('wellv_region') || 'jp' : 'jp'
  );

  const handleSave = () => {
    setSelectedLanguage(selectedLanguage);
    localStorage.setItem('wellv_region', selectedRegion);
    router.back();
    setTimeout(() => window.location.reload(), 100);
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-24">
      <Header />
      <PageTransition>
        <div className="pt-12">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="max-w-2xl mx-auto">
              <div className="mb-3">
                <div className="relative mb-2">
                  <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-4 mr-8 rounded-r-lg"></div>
                  <h1 className="relative text-xl font-bold font-headline py-1.5 pl-2">{t('settings.localeSettings')}</h1>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="region" className="text-lg font-semibold">{t('settings.region')}</Label>
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="w-full mt-4">
                      <SelectValue placeholder={t('settings.selectRegion')} />
                    </SelectTrigger>
                    <SelectContent>
                      {REGIONS.map((region) => (
                        <SelectItem key={region.code} value={region.code}>
                          <div className="flex items-center gap-2">
                            <span>{region.flag}</span>
                            <span>{region.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4">{t('settings.language')}</h2>
                  <div className="space-y-3">
                    {AVAILABLE_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setSelectedLanguageState(lang.code)}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${
                          selectedLanguage === lang.code ? 'border-primary bg-primary/10' : 'border-border'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-left">
                            <p className="font-semibold">{lang.nativeName}</p>
                            <p className="text-sm text-muted-foreground">{lang.name}</p>
                          </div>
                          {selectedLanguage === lang.code && <Check className="h-6 w-6 text-primary" />}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full" size="lg">
                  {t('save')}
                </Button>
              </div>
            </div>
          </main>
        </div>
      </PageTransition>
    </div>
    <BottomNav />
    </>
  );
}