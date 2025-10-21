import { Header } from "@/components/layout/Header";
import { ProgressTracker } from "@/components/home/ProgressTracker";
import { CategoryCard } from "@/components/home/CategoryCard";
import { FirstLaunchModal } from "@/components/home/FirstLaunchModal";
import { CATEGORIES } from "@/lib/data";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <>
      <FirstLaunchModal />
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold font-headline mb-4">Your Progress</h2>
              <ProgressTracker />
            </section>

            <section>
              <h2 className="text-2xl font-bold font-headline mb-4">Start a Session</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <CategoryCard
                    name="Favorites"
                    description="Your collection of saved sessions."
                    href="/favorites"
                    imageUrl="https://picsum.photos/seed/favorites/600/400"
                    imageHint="heart shape"
                    isFavorite
                />
                {CATEGORIES.map((category) => (
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
            <p>Made with <Sparkles className="inline-block h-4 w-4 text-primary" /> by VoiceZen</p>
        </footer>
      </div>
    </>
  );
}
