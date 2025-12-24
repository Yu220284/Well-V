"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/lib/hooks/use-language";
import { translations } from "@/lib/i18n/translations";
import type { RecordingScript, ScriptSegment } from "@/lib/types";
import { Mic, Square, Play, Pause, ChevronLeft, ChevronRight, Check, ArrowLeft } from "lucide-react";
import { RecordingReview } from "./RecordingReview";

interface RecordingStudioProps {
  script: RecordingScript;
  onBack: () => void;
}

export function RecordingStudio({ script, onBack }: RecordingStudioProps) {
  const { language } = useLanguage();
  const t = translations[language || 'ja'].recording;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [segments, setSegments] = useState<ScriptSegment[]>(script.segments);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showReview, setShowReview] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentSegment = segments[currentIndex];

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        
        setSegments(prev => prev.map((seg, idx) => 
          idx === currentIndex ? { ...seg, audioBlob: blob, audioUrl: url } : seg
        ));
        
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTimer(0);
      
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 0.1);
      }, 100);
    } catch (err) {
      console.error("Recording error:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < segments.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setTimer(0);
    } else {
      setShowReview(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setTimer(0);
    }
  };

  const progress = ((currentIndex + 1) / segments.length) * 100;

  if (showReview) {
    return <RecordingReview segments={segments} script={script} onBack={() => setShowReview(false)} />;
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onBack} className="mb-2">
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t.selectScript}
      </Button>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                {t.segment} {currentIndex + 1} / {segments.length}
              </span>
              <span className="text-sm font-mono">
                {timer.toFixed(1)}s / {currentSegment.duration}s
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="bg-secondary/30 p-6 rounded-lg min-h-[120px] flex items-center justify-center">
            <p className="text-lg text-center leading-relaxed">
              {currentSegment.text}
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            {!currentSegment.audioUrl ? (
              <Button
                size="lg"
                onClick={isRecording ? stopRecording : startRecording}
                className={`w-32 h-32 rounded-full ${isRecording ? 'bg-red-500 hover:bg-red-600' : ''}`}
              >
                {isRecording ? (
                  <Square className="h-12 w-12" />
                ) : (
                  <Mic className="h-12 w-12" />
                )}
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-sm text-muted-foreground">{t.recorded}</span>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                {t.prevSegment}
              </Button>
              
              {currentSegment.audioUrl && (
                <Button variant="outline" onClick={startRecording}>
                  {t.reRecord}
                </Button>
              )}

              <Button
                onClick={handleNext}
                disabled={!currentSegment.audioUrl}
              >
                {currentIndex === segments.length - 1 ? t.finish : t.nextSegment}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
