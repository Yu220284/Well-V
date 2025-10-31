import { Header } from "@/components/layout/Header";

export default function CommunityPage() {
  return (
    <div className="pb-24">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <h1 className="text-3xl font-bold font-headline mb-4">コミュニティ</h1>
            <div className="bg-card p-8 rounded-lg shadow-sm text-center">
              <p className="text-muted-foreground">コミュニティのダッシュボード機能は現在開発中です。</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}