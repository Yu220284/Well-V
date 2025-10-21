"use client";

import { Flame, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSessionStore } from "@/lib/hooks/use-session-store";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";

function StatCard({ icon, title, value, unit }: { icon: React.ReactNode; title: string; value: number; unit: string; }) {
  return (
    <Card className="bg-white/70 backdrop-blur-sm border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {value}
          <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProgressTracker() {
  const t = useTranslations("ProgressTracker");
  const { getTodayCount, getCurrentStreak, isLoaded } = useSessionStore();

  const sessionsToday = getTodayCount();
  const currentStreak = getCurrentStreak();

  if (!isLoaded) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-[125px] w-full" />
        <Skeleton className="h-[125px] w-full" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <StatCard
        icon={<Target className="h-5 w-5 text-accent" />}
        title={t('sessions_today')}
        value={sessionsToday}
        unit={t('done')}
      />
      <StatCard
        icon={<Flame className="h-5 w-5 text-secondary" />}
        title={t('current_streak')}
        value={currentStreak}
        unit={currentStreak === 1 ? t('day') : t('days')}
      />
    </div>
  );
}
