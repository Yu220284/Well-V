'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import type { SessionCategory, SessionSegment } from '@/lib/types';

export default function AdminScriptsPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<SessionCategory>('workout');
  const [segments, setSegments] = useState<SessionSegment[]>([
    { id: '1', action: '', duration: 5, pauseAfter: 2 }
  ]);

  const addSegment = () => {
    setSegments([...segments, { 
      id: String(segments.length + 1), 
      action: '', 
      duration: 5, 
      pauseAfter: 2 
    }]);
  };

  const removeSegment = (index: number) => {
    setSegments(segments.filter((_, i) => i !== index));
  };

  const updateSegment = (index: number, field: keyof SessionSegment, value: string | number) => {
    const updated = [...segments];
    updated[index] = { ...updated[index], [field]: value };
    setSegments(updated);
  };

  const handleExport = () => {
    const totalDuration = segments.reduce((sum, seg) => sum + seg.duration + (seg.pauseAfter || 0), 0);
    const sessionData = {
      id: `custom-${Date.now()}`,
      title,
      category,
      duration: totalDuration,
      segments,
      audioUrl: '',
      imageUrl: 'https://picsum.photos/seed/custom/600/400',
      imageHint: 'custom session',
      trainerId: 1
    };

    const blob = new Blob([JSON.stringify(sessionData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `session-${title.replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>台本作成</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>セッション名</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例: 朝のヨガ" />
          </div>

          <div className="space-y-2">
            <Label>カテゴリ</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as SessionCategory)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workout">ワークアウト</SelectItem>
                <SelectItem value="yoga">ヨガ</SelectItem>
                <SelectItem value="stretch">ストレッチ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>セグメント</Label>
              <Button onClick={addSegment} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-1" /> 追加
              </Button>
            </div>

            {segments.map((segment, index) => (
              <Card key={segment.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">セグメント {index + 1}</span>
                    {segments.length > 1 && (
                      <Button onClick={() => removeSegment(index)} size="sm" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs">動作</Label>
                    <Textarea
                      value={segment.action}
                      onChange={(e) => updateSegment(index, 'action', e.target.value)}
                      placeholder="例: ゆっくり息を吐きます"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs">実行時間（秒）</Label>
                      <Input
                        type="number"
                        value={segment.duration}
                        onChange={(e) => updateSegment(index, 'duration', parseInt(e.target.value) || 0)}
                        min={1}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs">休憩時間（秒）</Label>
                      <Input
                        type="number"
                        value={segment.pauseAfter || 0}
                        onChange={(e) => updateSegment(index, 'pauseAfter', parseInt(e.target.value) || 0)}
                        min={0}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="pt-4 border-t">
            <div className="text-sm text-muted-foreground mb-4">
              合計時間: {segments.reduce((sum, seg) => sum + seg.duration + (seg.pauseAfter || 0), 0)}秒
            </div>
            <Button onClick={handleExport} className="w-full" disabled={!title || segments.some(s => !s.action)}>
              JSONをエクスポート
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
