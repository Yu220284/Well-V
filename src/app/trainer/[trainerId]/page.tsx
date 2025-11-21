
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { TRAINERS, SESSIONS } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Play, Dumbbell, Zap, Shield } from "lucide-react";
import { AdBanner } from "@/components/layout/AdBanner";
import { Button } from "@/components/ui/button";

export default async function TrainerPage({ params }: { params: Promise<{ trainerId: string }> }) {
  const { trainerId } = await params;
  const trainer = TRAINERS.find((t) => t.id.toString() === trainerId);
  const sessions = SESSIONS.filter((s) => s.trainerId === trainerId);

  if (!trainer) {
    notFound();
  }

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PageTransition>
        <div className="pt-24">
          <AdBanner />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trainer Profile Section */}
        <section className="mb-12">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-card to-card/60 shadow-lg">
                <div className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                    <Image
                        src={trainer.imageUrl}
                        alt={`Portrait of ${trainer.name}`}
                        data-ai-hint={trainer.imageHint}
                        fill
                        className="rounded-full object-cover border-4 border-primary/50 shadow-xl"
                    />
                </div>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl md:text-4xl font-bold font-headline">{trainer.name}</h1>
                    <p className="text-lg text-primary font-semibold mt-1">{trainer.specialty}</p>
                    <p className="text-muted-foreground mt-3 max-w-lg">{trainer.bio}</p>
                    <Button className="mt-4">{`フォロー (+${trainer.followers.toLocaleString()})`}</Button>
                </div>
            </div>
        </section>

        {/* Sessions by this Trainer Section */}
        <section>
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-8 mr-8 rounded-r-lg"></div>
            <h2 className="relative text-2xl font-bold font-headline py-2 pl-2">{`${trainer.name}のセッション`}</h2>
          </div>
          {sessions.length > 0 ? (
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
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Play className="h-12 w-12 text-white fill-white" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-lg">{session.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1.5" />
                    <span>{formatDuration(session.duration)}</span>
                  </CardContent>
                </Card>
              </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">このトレーナーのセッションはまだありません。</p>
            </div>
          )}
        </section>
      </main>
        </div>
      </PageTransition>
    </div>
  );
}

export function generateStaticParams() {
  return TRAINERS.map((trainer) => ({
    trainerId: trainer.id.toString(),
  }));
}
