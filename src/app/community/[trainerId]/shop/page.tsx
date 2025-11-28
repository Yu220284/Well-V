"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TRAINERS } from "@/lib/data";
import { Diamond, ArrowLeft } from "lucide-react";

const generateShopItems = (trainerName: string) => [];

export default function CommunityShopPage() {
  const params = useParams();
  const trainerId = parseInt(params.trainerId as string);
  const trainer = TRAINERS.find(t => t.id === trainerId);

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

  const shopItems = generateShopItems(trainer.name);

  return (
    <div className="pb-24 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
      <Header />
      <PageTransition>
        <div className="pt-12">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="max-w-4xl mx-auto">
              <Link href={`/community/${trainerId}`} className="text-sm text-muted-foreground hover:text-primary mb-4 inline-flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                コミュニティに戻る
              </Link>

              <div className="relative mb-6">
                <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-4 mr-8 rounded-r-lg"></div>
                <h1 className="relative text-xl font-bold font-headline py-2 pl-2">{trainer.name}のオリジナルグッズ</h1>
              </div>

              {shopItems.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {shopItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="aspect-square relative bg-muted">
                        <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                      </div>
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground mb-1">{item.type}</p>
                        <p className="text-sm font-medium mb-2 line-clamp-2">{item.name}</p>
                        <div className="flex items-center gap-1 mb-3">
                          <Diamond className="h-4 w-4 text-primary fill-primary" />
                          <span className="text-lg font-bold text-primary">{item.price}</span>
                        </div>
                        <Button size="sm" className="w-full">交換する</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">現在、商品はありません</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </PageTransition>
    </div>
  );
}
