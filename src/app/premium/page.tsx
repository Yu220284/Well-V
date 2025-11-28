"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Crown, Video, Sparkles as SparklesIcon, Mic, Radio, Gauge, ArrowLeft, Ban } from "lucide-react";
import { usePremium } from "@/lib/hooks/use-premium";

export default function PremiumPage() {
  const router = useRouter();
  const { isPremium, setPremium, checkPremiumStatus } = usePremium();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly");
  const isCurrentlyPremium = checkPremiumStatus();

  const features = [
    {
      icon: Ban,
      title: "広告非表示",
      description: "すべての広告を非表示にして快適に利用できます",
    },
    {
      icon: Video,
      title: "動画セッション再生",
      description: "トレーナーの動きを見ながら正しいフォームで運動できます",
    },
    {
      icon: SparklesIcon,
      title: "AI台本生成",
      description: "あなた専用のセッション台本をAIが自動生成します",
    },
    {
      icon: Mic,
      title: "収録支援機能",
      description: "オリジナルセッションを簡単に収録・編集できます",
    },
    {
      icon: Radio,
      title: "バックグラウンド再生",
      description: "画面を閉じても音声ガイドが継続します",
    },
    {
      icon: Gauge,
      title: "速度調整機能",
      description: "0.5倍〜2.0倍まで再生速度を自由に調整できます",
    },
  ];

  const plans = {
    monthly: {
      price: "¥980",
      period: "/月",
      description: "いつでもキャンセル可能",
    },
    yearly: {
      price: "¥9,800",
      period: "/年",
      description: "2ヶ月分お得！",
      badge: "人気",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background pb-20">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          戻る
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-200 via-violet-200 to-indigo-200 mb-4">
            <Crown className="h-8 w-8 text-purple-700" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Well-V Premium</h1>
          <p className="text-muted-foreground">
            すべての機能を解放して、最高のフィットネス体験を
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>プレミアム機能</CardTitle>
            <CardDescription>
              プレミアムプランで利用できるすべての機能
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-purple-200 via-violet-200 to-indigo-200 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-purple-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>プランを選択</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedPlan("monthly")}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  selectedPlan === "monthly"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="text-left">
                  <div className="font-semibold mb-1">月額プラン</div>
                  <div className="text-2xl font-bold mb-1">
                    {plans.monthly.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      {plans.monthly.period}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {plans.monthly.description}
                  </div>
                </div>
                {selectedPlan === "monthly" && (
                  <div className="absolute top-2 right-2">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                )}
              </button>

              <button
                onClick={() => setSelectedPlan("yearly")}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  selectedPlan === "yearly"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {plans.yearly.badge && (
                  <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-200 via-violet-200 to-indigo-200 text-purple-700">
                    {plans.yearly.badge}
                  </Badge>
                )}
                <div className="text-left">
                  <div className="font-semibold mb-1">年額プラン</div>
                  <div className="text-2xl font-bold mb-1">
                    {plans.yearly.price}
                    <span className="text-sm font-normal text-muted-foreground">
                      {plans.yearly.period}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {plans.yearly.description}
                  </div>
                </div>
                {selectedPlan === "yearly" && (
                  <div className="absolute top-2 right-2">
                    <Check className="h-5 w-5 text-primary" />
                  </div>
                )}
              </button>
            </div>

            {isCurrentlyPremium ? (
              <Button
                size="lg"
                variant="outline"
                className="w-full"
                disabled
              >
                <Check className="h-5 w-5 mr-2" />
                プレミアム会員です
              </Button>
            ) : (
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-200 via-violet-200 to-indigo-200 hover:from-purple-300 hover:via-violet-300 hover:to-indigo-300 text-purple-700 font-semibold"
                onClick={() => {
                  const until = selectedPlan === "yearly" 
                    ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
                    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
                  setPremium(true, until);
                  alert(`プレミアムプラン（${selectedPlan === "yearly" ? "年額" : "月額"}）に登録しました！\n\n※これはデモ機能です。実際の決済は行われていません。`);
                  router.push('/');
                }}
              >
                <Crown className="h-5 w-5 mr-2" />
                プレミアムにアップグレード
              </Button>
            )}

            <p className="text-xs text-center text-muted-foreground">
              7日間の無料トライアル付き。いつでもキャンセル可能です。
            </p>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>お支払いは安全に処理されます</p>
          <p className="mt-2">
            ご質問がある場合は
            <button className="text-primary hover:underline ml-1">
              サポートセンター
            </button>
            までお問い合わせください
          </p>
        </div>
      </div>
    </div>
  );
}
