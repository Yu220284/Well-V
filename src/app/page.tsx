import { Header } from "@/components/layout/Header";
import { ProgressTracker } from "@/components/home/ProgressTracker";

export default function HomePage() {
  // TODO: Implement weekly exercise calendar
  // TODO: Show last interrupted exercise
  return (
    <div className="pb-24">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold font-headline mb-4">あなたの記録</h2>
            <ProgressTracker />
          </section>
          <section>
            <h2 className="text-2xl font-bold font-headline mb-4">1週間の計画</h2>
            <div className="bg-card p-4 rounded-lg shadow-sm text-center">
              <p className="text-muted-foreground">カレンダー機能は開発中です。</p>
            </div>
          </section>
           <section>
            <h2 className="text-2xl font-bold font-headline mb-4">中断したセッション</h2>
            <div className="bg-card p-4 rounded-lg shadow-sm text-center">
              <p className="text-muted-foreground">中断したセッションはありません。</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}