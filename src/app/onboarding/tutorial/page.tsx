"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Diamond, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocalAuth } from '@/lib/hooks/use-local-auth';
import { ProgressBar } from '@/components/onboarding/ProgressBar';
import { useTranslations } from '@/lib/hooks/use-translations';



export default function TutorialPage() {
  const router = useRouter();
  const { updateProfile } = useLocalAuth();
  const { t } = useTranslations();
  const [currentStep, setCurrentStep] = useState(0);
  
  const TUTORIAL_STEPS = [
    {
      icon: Play,
      title: t('tutorial.startSession'),
      description: t('tutorial.startSessionDesc'),
    },
    {
      icon: Diamond,
      title: t('tutorial.collectDiamonds'),
      description: t('tutorial.collectDiamondsDesc'),
    },
    {
      icon: Users,
      title: t('tutorial.joinCommunity'),
      description: t('tutorial.joinCommunityDesc'),
    },
  ];

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleStart();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStart = () => {
    updateProfile({ onboardingCompleted: true });
    router.push('/');
  };

  const step = TUTORIAL_STEPS[currentStep];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4 pb-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <ProgressBar currentStep={5} totalSteps={6} />
          <div className="text-center mb-8 mt-2">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <step.icon className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
            <p className="text-muted-foreground">{step.description}</p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            {TUTORIAL_STEPS.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep ? 'w-8 bg-primary' : 'w-2 bg-muted'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button onClick={handlePrev} variant="outline" size="lg">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            <Button onClick={handleNext} className="flex-1" size="lg">
              {currentStep === TUTORIAL_STEPS.length - 1 ? t('tutorial.start') : t('tutorial.next')}
              {currentStep < TUTORIAL_STEPS.length - 1 && <ChevronRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
