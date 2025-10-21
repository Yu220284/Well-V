import { notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { CATEGORIES, SESSIONS } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Play } from "lucide-react";
import type { SessionCategory } from "@/lib/types";
import { Link } from "@/navigation";
import { getTranslations } from 'next-intl/server';


export default async function CategoryPage({ params }: { params: { category: SessionCategory, locale: string } }) {
  const { category: categoryId, locale } = params;
  const t = await getTranslations({locale});

  const categoryData = CATEGORIES.find((c) => c.id === categoryId);
  const sessions = SESSIONS.filter((s) => s.category === categoryId);

  if (!categoryData) {
    notFound();
  }

  const category = {
      ...categoryData,
      name: t(`categories.${categoryData.id}`),
      description: t(`categories.${categoryData.id}_description`),
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold font-headline mb-2">{category.name}</h1>
          <p className="text-lg text-muted-foreground">{category.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
  const locales = ['en', 'ja', 'zh'];
  const paths = CATEGORIES.flatMap(category => 
    locales.map(locale => ({
      locale,
      category: category.id,
    }))
  );
  return paths;
}
