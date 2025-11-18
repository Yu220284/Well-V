
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
import messages from '@/../messages/ja.json';
import { SubmittedSessions } from '@/components/settings/SubmittedSessions';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function SettingsPage() {
  const t = messages.SettingsPage;
  const tProfile = { // Dummy data for profile card
    profile_card_title: "プロフィール",
    profile_card_description: "あなたのプロフィール情報を編集します。",
    profile_wip: "プロフィール編集機能は現在開発中です。"
  }
  const tAddSession = messages.AddSessionPage;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 pb-24">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-headline mb-2">{t.title}</h1>
          </div>
          <div className="space-y-8">
            <Link href="/add-session" className="block">
              <Card className="hover:bg-muted/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{tAddSession.title}</CardTitle>
                    <CardDescription>{tAddSession.description}</CardDescription>
                  </div>
                  <PlusCircle className="h-8 w-8 text-primary" />
                </CardHeader>
              </Card>
            </Link>

            <Card>
              <CardHeader>
                <CardTitle>{tProfile.profile_card_title}</CardTitle>
                <CardDescription>{tProfile.profile_card_description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{tProfile.profile_wip}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.language_card_title}</CardTitle>
                <CardDescription>{t.language_card_description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                    <Label htmlFor="language-select">{t.language_select_label}</Label>
                    <Select defaultValue="ja">
                        <SelectTrigger id="language-select">
                            <SelectValue placeholder={t.language_select_label} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="en">{t.language_english}</SelectItem>
                            <SelectItem value="ja">{t.language_japanese}</SelectItem>
                            <SelectItem value="zh">{t.language_chinese}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </CardContent>
            </Card>
            
            <SubmittedSessions />
          </div>
        </div>
      </main>
    </div>
  );
}
