
import { Header } from "@/components/layout/Header";
import { AdBanner } from "@/components/layout/AdBanner";
import Image from "next/image";
import Link from "next/link";
import { TRAINERS } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";

export default function TrainersPage() {
  const trainers = TRAINERS;

  return (
    <div className="pb-24 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
      <Header />
      <AdBanner />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-4 mr-8 rounded-r-lg"></div>
          <h1 className="relative text-xl font-bold font-headline py-2 pl-2">トレーナー</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {trainers.map((trainer) => (
            <Link key={trainer.id} href={`/trainer/${trainer.id}`} className="group block">
              <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1">
                <div className="aspect-square w-full relative overflow-hidden">
                  <Image
                    src={trainer.imageUrl}
                    alt={`Portrait of ${trainer.name}`}
                    data-ai-hint={trainer.imageHint}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardContent className="p-3 text-center">
                  <h3 className="font-semibold text-sm truncate">{trainer.name}</h3>
                  <p className="text-xs text-muted-foreground">{trainer.specialty}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
