
'use client';

import React, { useState } from 'react';
import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MessageSquare, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { SESSIONS } from '@/lib/data';
import { useSessionStore } from '@/lib/hooks/use-session-store';
import { AdBanner } from "@/components/layout/AdBanner";

export default function HomePage() {
  const { sessionHistory, isLoaded } = useSessionStore();

  // Generate Monday-starting weekly calendar
  const generateWeeklyCalendar = () => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, ...
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay; // Calculate days to Monday
    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    const days = [];
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const hasSession = Math.random() > 0.3; // Mock session data
      const isToday = date.toDateString() === today.toDateString();
      
      days.push({
        date: date.getDate(),
        day: dayNames[i],
        hasSession,
        isToday,
        fullDate: date
      });
    }
    return days;
  };

  const weeklyCalendar = generateWeeklyCalendar();
  
  // Calculate weekly stats
  const weeklyMinutes = 145; // Mock data
  const daysWithSessions = weeklyCalendar.filter(day => day.hasSession).length;
  const isGreatWeek = weeklyMinutes >= 60;
  const isPerfectWeek = daysWithSessions === 7;
  const weekStatus = isPerfectWeek ? 'Perfect Week' : isGreatWeek ? 'Great Week' : null;
  
  // Mock streak data
  const weeklyStreak = 3;
  const hasDiamond = isPerfectWeek;
  
  const lastPost = {
    content: "今日のヨガセッション、すごく気持ちよかった！新しいポーズにも挑戦できた。",
    time: "2時間前",
    reactions: [
      { emoji: "👏", count: 8 },
      { emoji: "🔥", count: 5 },
      { emoji: "👍", count: 12 }
    ]
  };
  
  // Mock interrupted session (set to null if no interrupted session)
  const interruptedSession = Math.random() > 0.5 ? SESSIONS[1] : null;
  const recentSessions = sessionHistory.slice(-3).map(h => SESSIONS.find(s => s.id === h.sessionId)).filter(Boolean);

  return (
    <div className="pb-24 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
      <Header />
      <AdBanner />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* 連続記録 & 今週の分数 */}
          <section>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <div className="text-2xl font-bold text-primary">{weeklyStreak}</div>
                    {hasDiamond && <span className="text-lg">💎</span>}
                  </div>
                  <div className="text-sm text-muted-foreground">連続達成週</div>
                  {weekStatus && (
                    <div className={cn(
                      "text-xs px-2 py-1 rounded-full mt-2",
                      isPerfectWeek ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    )}>
                      {weekStatus}
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-primary">{weeklyMinutes}分</div>
                  <div className="text-sm text-muted-foreground">今週のセッション</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {daysWithSessions}/7日 達成
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* ウィークリーカレンダー */}
          <section>
            <h2 className="text-lg font-bold mb-3">今週のアクティビティ</h2>
            <Card>
              <CardContent className="p-4">
                <div className="grid grid-cols-7 gap-2">
                  {weeklyCalendar.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-muted-foreground mb-1 font-medium">{day.day}</div>
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all",
                        day.isToday && day.hasSession ? "bg-primary text-primary-foreground border-primary shadow-lg scale-110" :
                        day.isToday ? "bg-primary/20 text-primary border-primary" :
                        day.hasSession ? "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700" :
                        "bg-muted text-muted-foreground border-muted"
                      )}>
                        {day.date}
                        {day.hasSession && (
                          <div className="absolute w-2 h-2 bg-green-500 rounded-full -top-1 -right-1" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                {weekStatus && (
                  <div className="mt-4 text-center">
                    <div className={cn(
                      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
                      isPerfectWeek ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    )}>
                      {isPerfectWeek && <span>💎</span>}
                      {weekStatus}
                      {isPerfectWeek && <span>💎</span>}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>

          {/* 中断したセッション */}
          {interruptedSession && (
            <section>
              <h2 className="text-lg font-bold mb-3">中断したセッション</h2>
              <Link href={`/session/${interruptedSession.id}`}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={interruptedSession.imageUrl}
                          alt={interruptedSession.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-sm mb-1">{interruptedSession.title}</div>
                        <div className="text-xs text-muted-foreground mb-2">続きから再開できます</div>
                        <Button size="sm" className="h-7 text-xs">セッションを再開</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </section>
          )}

          {/* 前回のグループ投稿 */}
          <section>
            <h2 className="text-lg font-bold mb-3">最新の投稿</h2>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm mb-3">{lastPost.content}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{lastPost.time}</span>
                  <div className="flex items-center gap-3">
                    {lastPost.reactions.map((reaction, index) => (
                      <div key={index} className="flex items-center gap-1">
                        <span className="text-sm">{reaction.emoji}</span>
                        <span className="text-xs text-muted-foreground">{reaction.count}</span>
                      </div>
                    ))}
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* セッション履歴 */}
          <section>
            <h2 className="text-lg font-bold mb-3">最近のセッション</h2>
            <div className="space-y-3">
              {recentSessions.length > 0 ? (
                recentSessions.map((session, index) => (
                  <Link key={index} href={`/session/${session.id}`}>
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={session.imageUrl}
                              alt={session.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm">{session.title}</div>
                            <div className="text-xs text-muted-foreground">{session.duration}</div>
                          </div>
                          <Play className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-sm text-muted-foreground">まだセッション履歴がありません</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
