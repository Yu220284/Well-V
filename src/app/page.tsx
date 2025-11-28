
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSelectedLanguage } from '@/lib/i18n/language-pack';
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MessageSquare, Play, Languages, ThumbsUp, Heart, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { SESSIONS } from '@/lib/data';
import { useSessionStore } from '@/lib/hooks/use-session-store';
import { useSupabaseSessions } from '@/lib/hooks/use-supabase-sessions';
import { AdBanner } from "@/components/layout/AdBanner";
import { getUserSessionHistory } from '@/lib/supabase/session-history';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useTranslations } from '@/lib/hooks/use-translations';

export default function HomePage() {
  const router = useRouter();
  const { t } = useTranslations();
  const { sessionHistory, isLoaded } = useSessionStore();
  const { sessions: supabaseSessions, loading: sessionsLoading } = useSupabaseSessions();
  const [userSessionHistory, setUserSessionHistory] = useState([]);
  const [isTranslated, setIsTranslated] = useState(false);
  
  useEffect(() => {
    const hasSeenSplash = typeof window !== 'undefined' && localStorage.getItem('wellv_seen_splash');
    
    if (!hasSeenSplash) {
      router.push('/splash');
    }
    
    // ユーザーのセッション履歴を取得
    getUserSessionHistory()
      .then(setUserSessionHistory)
      .catch(() => {});
  }, [router]);
  
  // Supabaseセッションが利用可能な場合は使用、そうでなければ静的データ
  const sessions = supabaseSessions.length > 0 ? supabaseSessions : SESSIONS;

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
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today && !isToday;
      const hasSession = isPast || isToday ? Math.random() > 0.3 : false; // Only past/today can have sessions
      
      days.push({
        date: date.getDate(),
        day: dayNames[i],
        hasSession,
        isToday,
        isPast,
        fullDate: date
      });
    }
    return days;
  };

  const weeklyCalendar = generateWeeklyCalendar();
  
  // Calculate weekly stats
  const weeklyMinutes = 145; // Mock data
  const daysWithSessions = weeklyCalendar.filter(day => day.hasSession).length;
  const weeklyDays = daysWithSessions; // New: days with sessions this week
  const isGreatWeek = weeklyMinutes >= 60;
  const isPerfectWeek = daysWithSessions === 7;
  const weekStatus = isPerfectWeek ? 'Perfect Week' : isGreatWeek ? 'Great Week' : null;
  
  // Mock streak data
  const weeklyStreak = 3;
  const hasDiamond = isPerfectWeek;
  
  const lastPost = {
    content: "今日のヨガセッション、すごく気持ちよかった！新しいポーズにも挑戦できた。",
    translatedContent: "Today's yoga session felt so good! I was able to try new poses too.",
    time: "2時間前",
    reactions: [
      { icon: ThumbsUp, count: 8 },
      { icon: Heart, count: 5 },
      { icon: Flame, count: 12 }
    ]
  };
  
  // Mock interrupted session (set to null if no interrupted session)
  const interruptedSession = Math.random() > 0.5 ? sessions[1] : null;
  const recentSessions = userSessionHistory.slice(0, 3).map(h => sessions.find(s => s.id === h.session_id)).filter(Boolean);

  return (
    <ProtectedRoute>
      <div className="pb-24 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
      <Header />
      <PageTransition>
        <div className="pt-12">
          <AdBanner />
          <main className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-3">
        <div className="space-y-3">
          {/* 週間統計 3列表示 */}
          <section>
            <div className="grid grid-cols-3 gap-3">
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="text-xl font-bold text-primary">{weeklyDays}{t('home.days')}</div>
                  <div className="text-xs text-muted-foreground">{t('home.thisWeek')}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <div className="text-xl font-bold text-primary">{weeklyStreak}</div>
                    {hasDiamond && <span className="text-sm">💎</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">{t('home.consecutiveWeeks')}</div>
                  {weekStatus && (
                    <div className={cn(
                      "text-xs px-1 py-0.5 rounded-full mt-1",
                      isPerfectWeek ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" :
                      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    )}>
                      {weekStatus}
                    </div>
                  )}
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-3 text-center">
                  <div className="text-xl font-bold text-primary">{weeklyMinutes}{t('home.minutes')}</div>
                  <div className="text-xs text-muted-foreground">{t('home.weeklySession')}</div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* ウィークリーカレンダー */}
          <section>
            <div className="relative mb-2">
              <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-8 mr-8 rounded-r-lg"></div>
              <h2 className="relative text-base sm:text-lg font-bold py-1.5 pl-2">{t('home.weeklyActivity')}</h2>
            </div>
            <Link href="/calendar">
              <Card className="hover:bg-primary/5 transition-colors cursor-pointer">
                <CardContent className="p-3">
                  <div className="grid grid-cols-7 gap-2">
                    {weeklyCalendar.map((day, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="text-xs text-muted-foreground mb-1 font-medium">{day.day}</div>
                        <div className={cn(
                          "relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all",
                          day.isToday && day.hasSession ? "bg-primary text-primary-foreground border-primary shadow-lg scale-110" :
                          day.isToday ? "bg-primary/20 text-primary border-primary" :
                          day.hasSession ? "bg-green-100 text-green-800 border-green-300 dark:bg-green-900 dark:text-green-200 dark:border-green-700" :
                          day.isPast ? "bg-muted text-muted-foreground border-muted" :
                          "bg-gray-50 text-gray-400 border-gray-200 dark:bg-gray-800 dark:text-gray-500 dark:border-gray-700"
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
                    <div className="mt-3 text-center">
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
            </Link>
          </section>

          {/* 中断したセッション */}
          {interruptedSession && (
            <section>
              <div className="relative mb-2">
                <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-8 mr-8 rounded-r-lg"></div>
                <h2 className="relative text-lg font-bold py-1.5 pl-2">{t('home.interruptedSession')}</h2>
              </div>
              <Link href={`/session/${interruptedSession.id}`}>
                <Card className="hover:bg-primary/5 transition-colors">
                  <CardContent className="p-3">
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
                        <Button size="sm" className="h-7 text-xs">{t('home.resumeSession')}</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </section>
          )}

          {/* 前回のグループ投稿 */}
          <section>
            <div className="relative mb-2">
              <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-8 mr-8 rounded-r-lg"></div>
              <h2 className="relative text-lg font-bold py-1.5 pl-2">{t('home.latestPost')}</h2>
            </div>
            <Link href="/post/1">
              <Card data-tutorial="post" className="hover:bg-primary/5 transition-colors cursor-pointer">
                <CardContent className="p-3">
                  <p className="text-sm mb-2">{isTranslated ? lastPost.translatedContent : lastPost.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">{lastPost.time}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setIsTranslated(!isTranslated);
                        }}
                        className="flex items-center gap-1 text-xs text-primary hover:underline"
                      >
                        <Languages className="h-3 w-3" />
                        {isTranslated ? t('community.original') : t('community.translate')}
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      {lastPost.reactions.map((reaction, index) => {
                        const Icon = reaction.icon;
                        return (
                          <div key={index} className="flex items-center gap-1">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{reaction.count}</span>
                          </div>
                        );
                      })}
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </section>

          {/* セッション履歴 */}
          <section>
            <div className="relative mb-2">
              <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-8 mr-8 rounded-r-lg"></div>
              <h2 className="relative text-lg font-bold py-1.5 pl-2">{t('home.recentSessions')}</h2>
            </div>
            <div className="space-y-2" data-tutorial="session-list">
              {recentSessions.length > 0 ? (
                recentSessions.map((session, index) => (
                  <Link key={index} href={`/session/${session.id}`}>
                    <Card className="hover:bg-primary/5 transition-colors" data-tutorial={index === 0 ? "session-card" : undefined}>
                      <CardContent className="p-3">
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
                            <div className="text-xs text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {Math.floor(session.duration / 60)}分
                            </div>
                          </div>
                          <Play className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : (
                <Card>
                  <CardContent className="p-3 text-center">
                    <p className="text-sm text-muted-foreground">{t('home.noHistory')}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </section>
        </div>
      </main>
        </div>
      </PageTransition>
      </div>
    </ProtectedRoute>
  );
}
