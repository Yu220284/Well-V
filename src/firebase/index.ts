import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getFirebaseConfig } from './config';

function initializeFirebase(): {
  app: FirebaseApp;
  auth: Auth;
  firestore: Firestore;
} {
  const apps = getApps();
  if (apps.length) {
    const app = apps[0];
    const auth = getAuth(app);
    const firestore = getFirestore(app);
    return { app, auth, firestore };
  }

  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  return { app, auth, firestore };
}

// Re-export providers and hooks
export { initializeFirebase };
export * from './provider';
export * from './client-provider';

// Dummy hooks for now, to be implemented
const useCollection = () => ({ data: [], loading: true, error: null });
const useDoc = () => ({ data: null, loading: true, error: null });
const useUser = () => ({ user: null, loading: true });

export { useCollection, useDoc, useUser };
