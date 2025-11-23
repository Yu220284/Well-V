"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/icons/Logo';
import { useLocalAuth } from '@/lib/hooks/use-local-auth';

export default function SplashPage() {
  const router = useRouter();
  const { user, isLoaded } = useLocalAuth();

  useEffect(() => {
    if (!isLoaded) return;
    
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('wellv_seen_splash', 'true');
      }
      
      if (user) {
        router.push('/');
      } else {
        router.push('/language-select');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [router, user, isLoaded]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 via-background to-secondary/30">
      <div className="text-center animate-pulse">
        <div className="mb-8">
          <Logo className="h-32 w-32 mx-auto text-primary drop-shadow-lg" />
        </div>
        <h1 className="text-4xl font-bold text-primary mb-2">Well-V</h1>
      </div>
    </div>
  );
}