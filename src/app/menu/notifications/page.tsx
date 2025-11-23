
'use client';

import { Header } from '@/components/layout/Header';
import { PageTransition } from '@/components/layout/PageTransition';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const notifications = [
  {
    id: 1,
    title: '「ユメカタリ 学生生成AIコンテスト」に参加しました！',
    date: '2025年11月21日',
    read: false,
  },
  {
    id: 4,
    title: 'ホリデー期間中の特別セッションに参加しよう！',
    date: '2025年11月1日',
    read: true,
  },
  {
    id: 2,
    title: '新しいワークアウトシリーズが追加されました！',
    date: '2024年5月18日',
    read: false,
  },
  {
    id: 3,
    title: 'システムメンテナンスのお知らせ（5月20日 2:00-4:00）',
    date: '2024年5月17日',
    read: true,
  },
];

export default function NotificationsPage() {
  return (
    <div className="pb-24">
      <Header />
      <PageTransition>
        <div className="pt-24">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-white/80 dark:bg-white/10 shadow-sm transform -skew-x-12 -ml-8 mr-8 rounded-r-lg"></div>
            <h1 className="relative text-2xl font-bold font-headline py-2 pl-2">お知らせ</h1>
          </div>

          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card key={notification.id} className={cn(
                "transition-colors",
                notification.read ? "bg-card" : "bg-primary/10"
              )}>
                <CardContent className="p-4 flex items-start gap-4">
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5"></div>
                  )}
                  <div className={cn(!notification.read ? "" : "pl-4")}>
                    <p className="font-semibold">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.date}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
        </div>
      </PageTransition>
    </div>
  );
}
