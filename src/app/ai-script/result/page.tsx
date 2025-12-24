'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Play, Download, Share2, Edit2, Save, X } from 'lucide-react'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function AIScriptResultPage() {
  const router = useRouter()
  const [script, setScript] = useState<any>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedScript, setEditedScript] = useState<any>(null)

  useEffect(() => {
    const saved = localStorage.getItem('wellv_generated_script')
    if (saved) {
      const parsed = JSON.parse(saved)
      setScript(parsed)
      setEditedScript(parsed)
    } else {
      router.push('/ai-script')
    }
  }, [])

  const handleSave = () => {
    setScript(editedScript)
    localStorage.setItem('wellv_generated_script', JSON.stringify(editedScript))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedScript(script)
    setIsEditing(false)
  }

  if (!script) return null

  return (
    <ProtectedRoute>
      <div className="pb-24 bg-gradient-to-br from-background to-secondary/20 min-h-screen">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-8">
          <div className="max-w-3xl mx-auto">
            <Card className="mb-6">
              <CardContent className="pt-6">
                {isEditing ? (
                  <>
                    <Input
                      value={editedScript.title}
                      onChange={(e) => setEditedScript({...editedScript, title: e.target.value})}
                      className="text-2xl font-bold mb-4"
                    />
                    <div className="space-y-4 mb-6">
                      {editedScript.steps.map((step: any, idx: number) => (
                        <div key={idx} className="flex gap-4">
                          <Input
                            value={step.time}
                            onChange={(e) => {
                              const newSteps = [...editedScript.steps]
                              newSteps[idx].time = e.target.value
                              setEditedScript({...editedScript, steps: newSteps})
                            }}
                            className="w-20 text-sm"
                          />
                          <Textarea
                            value={step.text}
                            onChange={(e) => {
                              const newSteps = [...editedScript.steps]
                              newSteps[idx].text = e.target.value
                              setEditedScript({...editedScript, steps: newSteps})
                            }}
                            className="flex-1 text-sm"
                            rows={2}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold mb-2">{script.title}</h1>
                    <div className="flex gap-4 text-sm text-muted-foreground mb-6">
                      <span>{script.duration}</span>
                      <span>•</span>
                      <span>{script.level}</span>
                    </div>

                    <div className="space-y-4 mb-6">
                      {script.steps.map((step: any, idx: number) => (
                        <div key={idx} className="flex gap-4">
                          <div className="text-sm text-muted-foreground w-12 flex-shrink-0">{step.time}</div>
                          <div className="text-sm">{step.text}</div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {isEditing ? (
                  <div className="flex gap-3">
                    <Button onClick={handleSave} className="flex-1" size="lg">
                      <Save className="mr-2 h-4 w-4" />
                      保存
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="lg">
                      <X className="mr-2 h-4 w-4" />
                      キャンセル
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Button className="flex-1" size="lg">
                      <Play className="mr-2 h-4 w-4" />
                      セッション開始
                    </Button>
                    <Button onClick={() => setIsEditing(true)} variant="outline" size="lg">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="lg">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="lg">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Button variant="outline" onClick={() => { localStorage.removeItem('wellv_generated_script'); router.push('/ai-script') }} className="w-full">
              新しい台本を生成
            </Button>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
