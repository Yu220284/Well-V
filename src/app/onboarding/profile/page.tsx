"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Camera } from 'lucide-react';
import { ProgressBar } from '@/components/onboarding/ProgressBar';
import { useLocalAuth } from '@/lib/hooks/use-local-auth';
import { useTranslations } from '@/lib/hooks/use-translations';

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
  const { t } = useTranslations();
  const initialIndex = Math.floor(Math.random() * avatarOptions.length);
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(initialIndex);
  const [displayIndex, setDisplayIndex] = useState(initialIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [profile, setProfile] = useState({
    displayName: '',
    bio: '',
    avatar: avatarOptions[initialIndex].bg
  });

  const changeAvatar = (newIndex: number, dir: 'left' | 'right') => {
    if (isAnimating) return;
    
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
    
    setDirection(dir);
    setProfile(prev => ({ ...prev, avatar: avatarOptions[newIndex].bg }));
    
    requestAnimationFrame(() => {
      setIsAnimating(true);
      
      animationTimeoutRef.current = setTimeout(() => {
        setCurrentAvatarIndex(newIndex);
        setDisplayIndex(newIndex);
        setIsAnimating(false);
        setDirection(null);
        animationTimeoutRef.current = null;
      }, 600);
    });
  };
  
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ ...profile, avatar: avatarOptions[currentAvatarIndex].bg });
    router.push('/onboarding/tags');
  };

  const getPosition = (offset: number) => {
    const basePositions: Record<number, any> = {
      '-2': { left: '-30%', right: undefined, scale: 0.5, opacity: 0, translateX: undefined },
      '-1': { left: '10%', right: undefined, scale: 0.67, opacity: 0.3, translateX: undefined },
      '0': { left: '50%', right: undefined, translateX: '-50%', scale: 1, opacity: 1 },
      '1': { left: undefined, right: '10%', scale: 0.67, opacity: 0.3, translateX: undefined },
      '2': { left: undefined, right: '-30%', scale: 0.5, opacity: 0, translateX: undefined }
    };
    
    if (!isAnimating || !direction) {
      return basePositions[offset] || basePositions['0'];
    }
    
    if (direction === 'right') {
      const animPositions: Record<number, any> = {
        '-2': { left: '-50%', right: undefined, scale: 0.3, opacity: 0, translateX: undefined },
        '-1': { left: '-30%', right: undefined, scale: 0.5, opacity: 0, translateX: undefined },
        '0': { left: '10%', right: undefined, scale: 0.67, opacity: 0.3, translateX: undefined },
        '1': { left: '50%', right: undefined, translateX: '-50%', scale: 1, opacity: 1 },
        '2': { left: undefined, right: '10%', scale: 0.67, opacity: 0.3, translateX: undefined }
      };
      return animPositions[offset] || basePositions['0'];
    } else {
      const animPositions: Record<number, any> = {
        '-2': { left: '10%', right: undefined, scale: 0.67, opacity: 0.3, translateX: undefined },
        '-1': { left: '50%', right: undefined, translateX: '-50%', scale: 1, opacity: 1 },
        '0': { left: undefined, right: '10%', scale: 0.67, opacity: 0.3, translateX: undefined },
        '1': { left: undefined, right: '-30%', scale: 0.5, opacity: 0, translateX: undefined },
        '2': { left: undefined, right: '-50%', scale: 0.3, opacity: 0, translateX: undefined }
      };
      return animPositions[offset] || basePositions['0'];
    }
  };

  const renderAvatar = (offset: number, key: string) => {
    const index = (currentAvatarIndex + offset + avatarOptions.length) % avatarOptions.length;
    const pos = getPosition(offset);
    const isClickable = offset === -1 || offset === 1;
    
    return (
      <div
        key={key}
        className={`absolute ${isAnimating ? 'transition-all duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)]' : ''} ${isClickable ? 'cursor-pointer' : ''}`}
        style={{
          left: pos.left,
          right: pos.right,
          transform: `${pos.translateX ? `translateX(${pos.translateX})` : ''} scale(${pos.scale})`,
          opacity: pos.opacity,
          pointerEvents: isClickable ? 'auto' : 'none'
        }}
        onClick={() => {
          if (!isClickable || isAnimating) return;
          const newIndex = offset === -1
            ? (currentAvatarIndex - 1 + avatarOptions.length) % avatarOptions.length
            : (currentAvatarIndex + 1) % avatarOptions.length;
          changeAvatar(newIndex, offset === -1 ? 'left' : 'right');
        }}
      >
        <div className={`h-24 w-24 rounded-full flex items-center justify-center ${avatarOptions[index].bg}`}>
          <svg className="w-12 h-12 fill-gray-600" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <ProgressBar currentStep={4} totalSteps={6} />
          <div className="text-center mb-8 mt-2">
            <h1 className="text-2xl font-bold mb-2">{t('onboarding.profileSetup')}</h1>
            <p className="text-muted-foreground">{t('onboarding.profileSetupDesc')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">{t('onboarding.selectAvatar')}</Label>
              <div className="relative h-32 overflow-hidden">
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                  {renderAvatar(-2, 'extra-left')}
                  {renderAvatar(-1, 'left')}
                  {renderAvatar(0, 'center')}
                  {renderAvatar(1, 'right')}
                  {renderAvatar(2, 'extra-right')}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="displayName">{t('onboarding.displayName')}</Label>
              <Input
                id="displayName"
                value={profile.displayName}
                onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                placeholder={t('onboarding.displayNamePlaceholder')}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">{t('onboarding.bio')}</Label>
              <Input
                id="bio"
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                placeholder={t('onboarding.bioPlaceholder')}
              />
            </div>

            <Button type="submit" className="w-full" size="lg">
              {t('continue')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}