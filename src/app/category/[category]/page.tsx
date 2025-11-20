import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { CATEGORIES, SESSIONS } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Play } from "lucide-react";
import type { SessionCategory } from "@/lib/types";
import messages from '@/../messages/ja.json';
import { AdBanner } from "@/components/layout/AdBanner";


export default async function CategoryPage({ params }: { params: Promise<{ category: SessionCategory }> }) {
  const { category: categoryId } = await params;
  
  const categoryData = CATEGORIES.find((c) => c.id === categoryId);
  const sessions = SESSIONS.filter((s) => s.category === categoryId);

  if (!categoryData) {
    notFound();
  }

  const category = {
    ...categoryData,
    name: categoryData.name,
    description: categoryData.description,
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      <AdBanner />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-8 mr-8 rounded-r-lg"></div>
            <h1 className="relative text-2xl font-bold font-headline py-2 pl-2">{category.name}</h1>
          </div>
          <p className="text-lg text-muted-foreground">{category.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessions.map((session) => (
            <Link key={session.id} href={`/session/${session.id}`} className="group">
              <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
                <div className="relative h-40 w-full">
                  <Image
                    src={session.imageUrl}
                    alt={session.title}
                    data-ai-hint={session.imageHint}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="h-12 w-12 text-white fill-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-lg">{session.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1.5" />
                    <span>{formatDuration(session.duration)}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category: category.id,
  }));
}
