"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight, Clock, Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SESSIONS } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const generateMonthCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - ((firstDay.getDay() + 6) % 7));

    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      
      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.toDateString() === today.toDateString();
      const isPast = date < today && !isToday;
      const hasSession = isCurrentMonth && (isPast || isToday) ? Math.random() > 0.4 : false;
      
      days.push({
        date: date.getDate(),
        fullDate: date,
        isCurrentMonth,
        isToday,
        isPast,
        hasSession,
      });
    }
    return days;
  };

  const monthCalendar = generateMonthCalendar();
  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  const dayNames = ['月', '火', '水', '木', '金', '土', '日'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const handleDateClick = (day: any) => {
    if (day.isCurrentMonth) {
      setSelectedDate(day.fullDate);
      setIsDialogOpen(true);
    }
  };

  const getSessionsForDate = (date: Date) => {
    if (!date) return [];
    const today = new Date();
    const isPastOrToday = date <= today;
    if (!isPastOrToday) return [];
    
    // Mock sessions for the selected date
    const mockSessions = SESSIONS.slice(0, Math.floor(Math.random() * 3) + 1);
    return mockSessions;
  };

  const selectedDateSessions = selectedDate ? getSessionsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-24">
      <Header />
      <PageTransition>
        <div className="pt-12">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="max-w-2xl mx-auto">
              <div className="mb-8">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-4 mr-8 rounded-r-lg"></div>
                  <h1 className="relative text-xl font-bold font-headline py-2 pl-2">アクティビティカレンダー</h1>
                </div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <Button variant="ghost" size="icon" onClick={() => navigateMonth('prev')}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-lg font-semibold">
                      {currentDate.getFullYear()}年 {monthNames[currentDate.getMonth()]}
                    </h2>
                    <Button variant="ghost" size="icon" onClick={() => navigateMonth('next')}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {monthCalendar.map((day, index) => (
                      <button
                        key={index}
                        onClick={() => handleDateClick(day)}
                        className={cn(
                          "relative aspect-square flex items-center justify-center text-sm rounded-lg transition-all",
                          !day.isCurrentMonth && "text-muted-foreground/50 cursor-not-allowed",
                          day.isCurrentMonth && "cursor-pointer hover:bg-primary/5",
                          day.isToday && day.hasSession ? "bg-primary text-primary-foreground font-bold" :
                          day.isToday ? "bg-primary/20 text-primary font-bold" :
                          day.hasSession ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" :
                          day.isPast ? "text-muted-foreground" : ""
                        )}
                      >
                        {day.date}
                        {day.hasSession && (
                          <div className="absolute w-1.5 h-1.5 bg-green-500 rounded-full bottom-1 right-1" />
                        )}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>セッション実施日</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                      <span>今日</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {selectedDate?.toLocaleDateString('ja-JP', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    {selectedDateSessions.length > 0 ? (
                      selectedDateSessions.map((session, index) => (
                        <Link key={index} href={`/session/${session.id}`}>
                          <Card className="hover:bg-primary/5 transition-colors cursor-pointer">
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
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">この日はセッションを実施していません</p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </main>
        </div>
      </PageTransition>
    </div>
  );
}