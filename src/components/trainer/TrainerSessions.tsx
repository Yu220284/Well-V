"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Play } from "lucide-react";
import type { Session, SessionCategory } from "@/lib/types";

interface TrainerSessionsProps {
  sessions: Session[];
}

export function TrainerSessions({ sessions }: TrainerSessionsProps) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const getSessionsByCategory = (category: SessionCategory) => {
    return sessions.filter(session => session.category === category);
  };

  return (
    <Tabs defaultValue="workout" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="workout">ワークアウト</TabsTrigger>
        <TabsTrigger value="yoga">ヨガ</TabsTrigger>
        <TabsTrigger value="stretch">ストレッチ</TabsTrigger>
      </TabsList>
      
      {(['workout', 'yoga', 'stretch'] as SessionCategory[]).map((category) => {
        const categorySessions = getSessionsByCategory(category);
        return (
          <TabsContent key={category} value={category} className="mt-6">
            {categorySessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorySessions.map((session) => (
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
                <p className="text-muted-foreground">このカテゴリのセッションはまだありません。</p>
              </div>
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}