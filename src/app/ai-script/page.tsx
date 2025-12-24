'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sparkles, Loader2 } from 'lucide-react'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { PremiumDialog } from '@/components/premium/PremiumDialog'

export default function AIScriptPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [showPremiumDialog, setShowPremiumDialog] = useState(false)
  const [form, setForm] = useState({
    category: '',
    duration: '',
    level: '',
    include: '',
    exclude: '',
    language: 'ja'
  })

  useEffect(() => {
    const data = localStorage.getItem('wellv-premium')
    if (data) {
      const { isPremium, premiumUntil } = JSON.parse(data)
      if (!premiumUntil || new Date() <= new Date(premiumUntil)) {
        setIsPremium(isPremium)
      } else {
        setShowPremiumDialog(true)
      }
    } else {
      setShowPremiumDialog(true)
    }
  }, [])

  const handleGenerate = async () => {
    setLoading(true)
    const { generateScript } = await import('@/lib/ai/generate-script')
    const script = await generateScript(form)
    localStorage.setItem('wellv_generated_script', JSON.stringify(script))
    setLoading(false)
    router.push('/ai-script/result')
  }

  return (
    <ProtectedRoute>
      <div className="pb-24 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold mb-2">AI台本生成</h1>
              <p className="text-muted-foreground">あなた専用のセッション台本をAIが自動生成します</p>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <Label>言語</Label>
                  <Select value={form.language} onValueChange={(v) => setForm({...form, language: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ja">日本語</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>カテゴリ</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({...form, category: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yoga">ヨガ</SelectItem>
                      <SelectItem value="workout">筋トレ</SelectItem>
                      <SelectItem value="stretch">ストレッチ</SelectItem>
                      <SelectItem value="meditation">瞑想</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>時間</Label>
                  <Select value={form.duration} onValueChange={(v) => setForm({...form, duration: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5分</SelectItem>
                      <SelectItem value="10">10分</SelectItem>
                      <SelectItem value="15">15分</SelectItem>
                      <SelectItem value="20">20分</SelectItem>
                      <SelectItem value="30">30分</SelectItem>
                      <SelectItem value="45">45分</SelectItem>
                      <SelectItem value="60">60分</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>レベル</Label>
                  <Select value={form.level} onValueChange={(v) => setForm({...form, level: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">初心者</SelectItem>
                      <SelectItem value="intermediate">中級者</SelectItem>
                      <SelectItem value="advanced">上級者</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>希望するエクササイズ（任意）</Label>
                  <Textarea
                    placeholder="例: 腕立て伏せ、プランク、上半身中心"
                    value={form.include}
                    onChange={(e) => setForm({...form, include: e.target.value})}
                    rows={3}
                  />
                </div>

                <div>
                  <Label>希望しないエクササイズ（任意）</Label>
                  <Textarea
                    placeholder="例: スクワット、大腿筋を使う動き、下半身"
                    value={form.exclude}
                    onChange={(e) => setForm({...form, exclude: e.target.value})}
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleGenerate}
                  disabled={loading || !form.category || !form.duration || !form.level}
                  className="w-full"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      台本を生成
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
            
            <PremiumDialog 
              open={showPremiumDialog && !isPremium} 
              onOpenChange={setShowPremiumDialog}
              feature="AI台本生成機能"
            />
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
