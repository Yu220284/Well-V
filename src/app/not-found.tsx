'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-muted-foreground mt-2">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md shadow-sm hover:bg-primary/90 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Go back home</span>
      </Link>
    </div>
  );
}
