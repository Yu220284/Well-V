"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/hooks/use-language";
import { translations } from "@/lib/i18n/translations";
import type { RecordingScript, ScriptSegment } from "@/lib/types";
import { Play, Pause, RotateCcw, Wand2, Save, ArrowLeft } from "lucide-react";

interface RecordingReviewProps {
  segments: ScriptSegment[];
  script: RecordingScript;
  onBack: () => void;
}

export function RecordingReview({ segments, script, onBack }: RecordingReviewProps) {
  const { language } = useLanguage();
  const t = translations[language || 'ja'].recording;
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [processingIndex, setProcessingIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (index: number) => {
    const segment = segments[index];
    if (!segment.audioUrl) return;

    if (playingIndex === index) {
      audioRef.current?.pause();
      setPlayingIndex(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const audio = new Audio(segment.audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => setPlayingIndex(null);
      audio.play();
      setPlayingIndex(index);
    }
  };

  const handleRemoveNoise = async (index: number) => {
    setProcessingIndex(index);
    // Simulate noise removal processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessingIndex(null);
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate saving session
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSaving(false);
    alert("セッションを保存しました！");
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t.recording}
      </Button>

      <div>
        <h2 className="text-2xl font-bold mb-2">{t.reviewTitle}</h2>
        <p className="text-muted-foreground">{script.title}</p>
      </div>

      <div className="space-y-3">
        {segments.map((segment, index) => (
          <Card key={segment.id}>
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-sm">
                  {index + 1}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm mb-2">{segment.text}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePlay(index)}
                      disabled={!segment.audioUrl}
                    >
                      {playingIndex === index ? (
                        <>
                          <Pause className="h-3 w-3 mr-1" />
                          {t.pause}
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 mr-1" />
                          {t.play}
                        </>
                      )}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={!segment.audioUrl || processingIndex === index}
                    >
                      <RotateCcw className="h-3 w-3 mr-1" />
                      {t.reRecord}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRemoveNoise(index)}
                      disabled={!segment.audioUrl || processingIndex === index}
                    >
                      <Wand2 className="h-3 w-3 mr-1" />
                      {processingIndex === index ? t.processing : t.removeNoise}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onBack}>
          {t.back}
        </Button>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? t.saving : t.saveSession}
        </Button>
      </div>
    </div>
  );
}
