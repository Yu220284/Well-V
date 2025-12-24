"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProgressBar } from '@/components/onboarding/ProgressBar';
import { useLocalAuth } from '@/lib/hooks/use-local-auth';
import { useTranslations } from '@/lib/hooks/use-translations';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import useEmblaCarousel from 'embla-carousel-react';
import { useLanguage } from '@/lib/hooks/use-language';
import { translations } from '@/lib/i18n/translations';

const avatarOptions = [
  { bg: 'bg-gradient-to-br from-pink-200 to-rose-300' },
  { bg: 'bg-gradient-to-br from-blue-200 to-sky-300' },
  { bg: 'bg-gradient-to-br from-green-200 to-lime-300' },
  { bg: 'bg-gradient-to-br from-yellow-200 to-amber-300' },
  { bg: 'bg-gradient-to-br from-purple-200 to-violet-300' },
  { bg: 'bg-gradient-to-br from-orange-200 to-red-300' },
  { bg: 'bg-gradient-to-br from-teal-200 to-cyan-300' },
  { bg: 'bg-gradient-to-br from-indigo-200 to-blue-400' }
];

export default function ProfilePage() {
  const router = useRouter();
  const { updateProfile } = useLocalAuth();
  const { language } = useLanguage();
  const t = translations[language || 'ja'].onboarding;
  const tCommon = translations[language || 'ja'];
  const initialIndex = Math.floor(Math.random() * avatarOptions.length);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'center',
    containScroll: false
  });
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [profile, setProfile] = useState({
    displayName: '',
    bio: '',
    avatar: avatarOptions[initialIndex].bg
  });

  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      const index = emblaApi.selectedScrollSnap();
      setSelectedIndex(index);
      setProfile(prev => ({ ...prev, avatar: avatarOptions[index].bg }));
    };
    
    emblaApi.on('select', onSelect);
    onSelect();
    
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ ...profile, avatar: avatarOptions[selectedIndex].bg });
    router.push('/onboarding/tags');
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-3 relative">
      <AnimatedBackground />
      <Card className="w-full max-w-md relative z-10">
        <CardContent className="pt-6">
          <ProgressBar currentStep={4} totalSteps={6} />
          <div className="text-center mb-4 mt-1">
            <h1 className="text-xl font-bold mb-1">{t.profileSetup}</h1>
            <p className="text-muted-foreground">{t.profileSetupDesc}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 relative">
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">{t.selectAvatar}</Label>
              <div className="overflow-hidden h-[120px]" ref={emblaRef}>
                <div className="flex">
                  {avatarOptions.map((option, index) => (
                    <div 
                      key={index} 
                      className="flex-[0_0_33.333%] min-w-0 flex justify-center items-center h-[120px] cursor-pointer"
                      onClick={() => {
                        if (index !== selectedIndex) {
                          emblaApi?.scrollTo(index);
                        }
                      }}
                    >
                      <div 
                        className={`rounded-full flex items-center justify-center ${option.bg} transition-all duration-300`}
                        style={{
                          width: selectedIndex === index ? '96px' : '64px',
                          height: selectedIndex === index ? '96px' : '64px',
                          opacity: selectedIndex === index ? 1 : 0.5
                        }}
                      >
                        <svg 
                          className="fill-gray-600" 
                          viewBox="0 0 24 24"
                          style={{
                            width: selectedIndex === index ? '48px' : '32px',
                            height: selectedIndex === index ? '48px' : '32px',
                            flexShrink: 0
                          }}
                        >
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">{t.displayName}</Label>
              <Input
                id="displayName"
                value={profile.displayName}
                onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                placeholder={t.displayNamePlaceholder}
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              {tCommon.continue}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}