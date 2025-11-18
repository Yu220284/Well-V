'use client';

import React, { useState, useEffect } from 'react';
import { initializeFirebase } from '.';
import { FirebaseProvider, type FirebaseServices } from './provider';

export function FirebaseClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [firebase, setFirebase] = useState<FirebaseServices | null>(null);

  useEffect(() => {
    const services = initializeFirebase();
    setFirebase(services);
  }, []);

  if (!firebase) {
    // You can show a loading spinner here
    return <div>Loading...</div>;
  }

  return <FirebaseProvider {...firebase}>{children}</FirebaseProvider>;
}
