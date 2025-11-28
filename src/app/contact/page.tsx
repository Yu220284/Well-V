"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, MessageSquare, User, Sparkles } from "lucide-react";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("お問い合わせを受け付けました。\n確認後、メールにてご返信いたします。");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        alert("エラーが発生しました。もう一度お試しください。");
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert("エラーが発生しました。もう一度お試しください。");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-20">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          戻る
        </Button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">お問い合わせ</h1>
          <p className="text-muted-foreground">
            ご意見・ご要望をお聞かせください
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>お問い合わせフォーム</CardTitle>
            <CardDescription>
              内容を確認後、メールにてご返信いたします
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  <User className="h-4 w-4 inline mr-2" />
                  お名前
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="山田太郎"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="h-4 w-4 inline mr-2" />
                  メールアドレス
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">
                  <MessageSquare className="h-4 w-4 inline mr-2" />
                  件名
                </Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="お問い合わせの件名"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">お問い合わせ内容</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="お問い合わせ内容を詳しくご記入ください"
                  rows={6}
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                <Mail className="h-5 w-5 mr-2" />
                {isSubmitting ? '送信中...' : '送信する'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>よくある質問</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-1">プレミアムプランについて</h3>
              <p className="text-sm text-muted-foreground">
                プレミアムプランの詳細は、メニューの「メンバーシップ」からご確認いただけます。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">セッションが再生できない</h3>
              <p className="text-sm text-muted-foreground">
                ネットワーク接続を確認し、アプリを再起動してください。問題が解決しない場合はお問い合わせください。
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">アカウントの削除について</h3>
              <p className="text-sm text-muted-foreground">
                アカウント削除をご希望の場合は、お問い合わせフォームよりご連絡ください。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
