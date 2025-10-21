import { Header } from "@/components/layout/Header";
import { ProgressTracker } from "@/components/home/ProgressTracker";
import { CategoryCard } from "@/components/home/CategoryCard";
import { FirstLaunchModal } from "@/components/home/FirstLaunchModal";
import { CATEGORIES } from "@/lib/data";
import { Sparkles } from "lucide-react";
import messages from '@/../messages/ja.json';
import React from "react";

export default function Home() {
  const t = messages.Home;
  const tCat = messages.categories;
  const categories = CATEGORIES.map(c => ({
    ...c,
    name: (tCat as any)[c.id],
    description: (tCat as any)[`${c.id}_description`],
  }));

  const footerText = t.footer_text.replace('{sparkles}', '');

  return (
    <>
      <FirstLaunchModal />
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold font-headline mb-4">{t.progress}</h2>
              <ProgressTracker />
            </section>

            <section>
              <h2 className="text-2xl font-bold font-headline mb-4">{t.start_session}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <CategoryCard
                    name={t.favorites_card_name}
                    description={t.favorites_card_description}
                    href="/favorites"
                    imageUrl="https://picsum.photos/seed/favorites/600/400"
                    imageHint="heart shape"
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
    </>
  );
}
