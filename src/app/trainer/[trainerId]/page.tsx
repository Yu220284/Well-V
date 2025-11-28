"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { TRAINERS, SESSIONS } from "@/lib/data";
import { TrainerSessions } from "@/components/trainer/TrainerSessions";
import { Users, Heart, ExternalLink } from "lucide-react";
import { AdBanner } from "@/components/layout/AdBanner";
import { Button } from "@/components/ui/button";
import { useFollowStore } from "@/lib/hooks/use-follow-store";

export default function TrainerPage() {
  const params = useParams();
  const trainerId = params?.trainerId as string;
  const { toggleFollow, isFollowing, isLoaded } = useFollowStore();
  const trainer = TRAINERS.find((t) => t.id.toString() === trainerId);
  const allSessions = trainer ? SESSIONS.filter((s) => s.trainerId === trainer.id) : [];

  if (!trainer) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground">トレーナーが見つかりません</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      <PageTransition>
        <div className="pt-12">
          <AdBanner />
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Trainer Profile Section */}
        <section className="mb-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-card to-card/60 shadow-lg">
                <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                        src={trainer.imageUrl}
                        alt={`Portrait of ${trainer.name}`}
                        data-ai-hint={trainer.imageHint}
                        fill
                        className="rounded-full object-cover border-4 border-primary/50 shadow-xl"
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h1 className="text-2xl md:text-3xl font-bold font-headline">{trainer.name}</h1>
                    <p className="text-base text-primary font-semibold mt-1">{trainer.specialty}</p>
                    {(trainer as any).streamLinks && (trainer as any).streamLinks.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(trainer as any).streamLinks.map((link: any, idx: number) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                          >
                            {link.platform}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground mt-2">{trainer.bio}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                        <Button
                            size="sm"
                            variant={isLoaded && isFollowing(trainer.id) ? "default" : "outline"}
                            onClick={() => toggleFollow(trainer.id)}
                            disabled={!isLoaded}
                        >
                            <Heart className={`w-3 h-3 mr-1 ${isLoaded && isFollowing(trainer.id) ? 'fill-current' : ''}`} />
                            {!isLoaded ? '読み込み中...' : isFollowing(trainer.id) ? 'フォロー中' : 'フォロー'}
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                            <Link href={`/community?tab=${trainer.communityId}`}>
                                <Users className="w-3 h-3 mr-1" />
                                コミュニティ
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>

        {/* Sessions by this Trainer Section */}
        <section data-tutorial="session-list">
          <div className="relative mb-3">
            <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-8 mr-8 rounded-r-lg"></div>
            <h2 className="relative text-2xl font-bold font-headline py-1.5 pl-2">{`${trainer.name}のセッション`}</h2>
          </div>
          
          <TrainerSessions sessions={allSessions} />
        </section>
      </main>
        </div>
      </PageTransition>
    </div>
  );
}
