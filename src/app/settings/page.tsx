'use client';

import { Header } from '@/components/layout/Header';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

// 仮のメッセージ。将来的にはi18n対応が必要です。
const messages = {
    settings: "設定",
    language: "言語",
    language_description: "アプリ内で使用される言語を変更します。",
    profile: "プロフィール",
    profile_description: "あなたのプロフィール情報を編集します。（準備中）",
    select_language: "言語を選択",
    english: "英語 (English)",
    japanese: "日本語",
    chinese: "中国語 (中文)",
};


export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline mb-2">{messages.settings}</h1>
          </div>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>{messages.language}</CardTitle>
                <CardDescription>{messages.language_description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                    <Label htmlFor="language-select">{messages.select_language}</Label>
                    <Select defaultValue="ja">
                        <SelectTrigger id="language-select">
                            <SelectValue placeholder={messages.select_language} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">{messages.english}</SelectItem>
                            <SelectItem value="ja">{messages.japanese}</SelectItem>
                            <SelectItem value="zh">{messages.chinese}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>{messages.profile}</CardTitle>
                <CardDescription>{messages.profile_description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">この機能は現在準備中です。</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
