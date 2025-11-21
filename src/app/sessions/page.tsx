'use client';

import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { AdBanner } from "@/components/layout/AdBanner";
import { CategoryCard } from "@/components/home/CategoryCard";
import { CATEGORIES } from "@/lib/data";
import { Sparkles } from "lucide-react";
import messages from '@/../messages/ja.json';
import React from "react";
import { useSupabaseSessions } from "@/lib/hooks/use-supabase-sessions";
import type { Session } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function SessionsPage() {
  const t = messages.Home;
  const tCat = messages.categories;

  const { sessions, loading } = useSupabaseSessions();
  
  const categories = CATEGORIES.map(c => ({
    ...c,
    name: c.name,
    description: c.description,
  }));

  const footerText = t.footer_text.replace('{sparkles}', '');

  return (
    <div className="pb-24 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
      <Header />
      <PageTransition>
        <div className="pt-24">
          <AdBanner />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-8 mr-8 rounded-r-lg"></div>
              <h2 className="relative text-lg font-bold font-headline py-2 pl-2">セッション</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
              <CategoryCard
                  name={t.favorites_card_name}
                  description={t.favorites_card_description}
                  href="/favorites"
                  imageUrl="https://picsum.photos/seed/stylish-favorites/600/400"
                  imageHint="glowing heart illustration"
                  isFavorite
              />
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  description={category.description}
                  href={`/category/${category.id}`}
                  imageUrl={category.imageUrl}
                  imageHint={category.imageHint}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-muted-foreground">
          <p className="inline-flex items-center">
            {footerText.split(' ')[0]}
            <Sparkles className="inline-block h-4 w-4 text-primary mx-1" />
            {footerText.split(' ')[1]}
          </p>
      </footer>
        </div>
      </PageTransition>
    </div>
  );
}
