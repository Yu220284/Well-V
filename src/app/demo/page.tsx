"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DemoPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('wellv_demo_mode', 'true');
    localStorage.setItem('wellv_seen_splash', 'true');
    
    const demoUser = {
      id: 'demo-user',
      email: 'demo@wellv.app',
      displayName: 'Demo User',
      avatar: 'bg-gradient-to-br from-blue-200 to-sky-300'
    };
    localStorage.setItem('wellv_user', JSON.stringify(demoUser));
    
    setTimeout(() => router.push('/'), 1000);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-pink-400 rounded-full animate-pulse" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Well-V Demo</h1>
        <p className="text-gray-600">Starting demo mode...</p>
      </div>
    </div>
  );
}
