'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

export default function AdminImportPage() {
  const [importedData, setImportedData] = useState<any>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        setImportedData(json);
        setError('');
      } catch (err) {
        setError('JSONファイルの解析に失敗しました');
        setImportedData(null);
      }
    };
    reader.readAsText(file);
  };

  const handleSaveToSupabase = async () => {
    if (!importedData) return;
    
    setIsLoading(true);
    try {
      const sessionData = {
        session_id: importedData.id,
        title: importedData.title,
        category: importedData.category,
        duration: importedData.duration,
        segments: importedData.segments,
        audio_url: importedData.audioUrl || null,
        video_url: importedData.videoUrl || null,
        has_video: importedData.hasVideo || false,
        image_url: importedData.imageUrl,
        image_hint: importedData.imageHint,
        tags: importedData.tags || [],
        trainer_id: importedData.trainerId || 1,
        is_premium: importedData.isPremium || false
      };

      const { data, error } = await supabase
        .from('sessions')
        .insert(sessionData)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        alert('エラー詳細: ' + JSON.stringify(error, null, 2));
        toast({
          title: 'エラー',
          description: error.message || 'エラーが発生しました',
          variant: 'destructive'
        });
      } else {
        toast({
          title: '成功',
          description: 'セッションを追加しました'
        });
        setImportedData(null);
      }
    } catch (err: any) {
      console.error('Error:', err);
      alert('エラー詳細: ' + (err?.message || '不明なエラー'));
      toast({
        title: 'エラー',
        description: err?.message || '保存に失敗しました',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>台本インポート</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed rounded-lg p-8 text-center">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button asChild variant="outline">
                <span>JSONファイルを選択</span>
              </Button>
            </label>
          </div>

          {error && (
            <div className="p-4 bg-red-100 text-red-800 rounded-lg">
              {error}
            </div>
          )}

          {importedData && (
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">プレビュー</h3>
                <div className="text-sm space-y-1">
                  <p><strong>ID:</strong> {importedData.id}</p>
                  <p><strong>タイトル:</strong> {importedData.title}</p>
                  <p><strong>カテゴリ:</strong> {importedData.category}</p>
                  <p><strong>合計時間:</strong> {importedData.duration}秒</p>
                  <p><strong>セグメント数:</strong> {importedData.segments?.length || 0}</p>
                </div>
              </div>

              {importedData.segments && (
                <div className="space-y-2">
                  <h3 className="font-semibold">セグメント</h3>
                  {importedData.segments.map((seg: any, i: number) => (
                    <div key={i} className="p-3 bg-muted/50 rounded text-sm">
                      <p><strong>{i + 1}.</strong> {seg.action}</p>
                      <p className="text-muted-foreground">
                        実行: {seg.duration}秒 / 休憩: {seg.pauseAfter || 0}秒
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <Button onClick={handleSaveToSupabase} className="w-full" disabled={isLoading}>
                {isLoading ? '保存中...' : 'Supabaseに保存'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
