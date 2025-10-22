
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Play,
  Pause,
  RotateCcw,
  X,
  Heart,
  Volume2,
  VolumeX,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { useSessionStore } from "@/lib/hooks/use-session-store";
import type { Session } from "@/lib/types";
import { SafetyPromptDialog } from "./SafetyPromptDialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import messages from '@/../messages/ja.json';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

const Rewind10Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.2 9.8 12.4 12l1.8 2.2" />
      <path d="M10.4 9.8 8.6 12l1.8 2.2" />
      <path d="M2.5 12a9.5 9.5 0 1 0 0-1" />
      <path d="M7 6.4v10.2" />
    </svg>
);
  
const FastForward10Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
    >
        <path d="m9.8 9.8 1.8 2.2-1.8 2.2" />
        <path d="m13.8 9.8 1.8 2.2-1.8 2.2" />
        <path d="M21.5 12a9.5 9.5 0 1 1 0-1" />
        <path d="M17 6.4v10.2" />
    </svg>
);


export function Player({ session }: { session: Session }) {
  const t = messages.SessionPlayer;
  const router = useRouter();
  const { addSession, toggleFavorite, isFavorite, isLoaded } = useSessionStore();
  const { toast } = useToast();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [isSafetyPromptOpen, setIsSafetyPromptOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const isFav = isLoaded ? isFavorite(session.id) : false;
  
  const handleStartSession = () => {
    setIsSafetyPromptOpen(false);
    if (session.audioUrl) {
      if(audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
    } else {
      setIsPlaying(true);
      setIsReady(true);
    }
  };

  const handleCanPlay = () => setIsReady(true);
  
  const togglePlayPause = () => {
    if (session.audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const restart = () => {
    setCurrentTime(0);
    if (session.audioUrl && audioRef.current) {
      audioRef.current.currentTime = 0;
      if(!isPlaying) {
          audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
    } else if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const stop = () => {
    if (session.audioUrl && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    router.push("/");
  };
  
  const toggleMute = () => {
      if(audioRef.current) {
          audioRef.current.muted = !audioRef.current.muted;
          setIsMuted(audioRef.current.muted);
      }
  }

  const handleFavoriteToggle = () => {
    toggleFavorite(session.id);
    toast({
      title: isFav ? t.removed_from_favorites : t.added_to_favorites,
      description: session.title,
    });
  };
  
  const seek = (delta: number) => {
    const newTime = Math.max(0, Math.min(session.duration, currentTime + delta));
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };


  useEffect(() => {
    if (isPlaying && !session.audioUrl) {
      const timer = setInterval(() => {
        setCurrentTime(prevTime => {
          if (prevTime >= session.duration) {
            clearInterval(timer);
            addSession(session.id);
            setIsPlaying(false);
            toast({
              title: t.session_complete_title,
              description: t.session_complete_description.replace('{sessionTitle}', session.title),
            });
            setTimeout(() => router.push('/'), 2000);
            return session.duration;
          }
          return prevTime + 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, session.duration, session.id, session.audioUrl, addSession, router, toast, t, session.title]);


  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !session.audioUrl) return;

    const updateCurrentTime = () => setCurrentTime(audio.currentTime);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      addSession(session.id);
      setIsPlaying(false);
      toast({
        title: t.session_complete_title,
        description: t.session_complete_description.replace('{sessionTitle}', session.title),
      });
      setTimeout(() => router.push('/'), 2000);
    };

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("canplay", handleCanPlay);
    };
  }, [addSession, session.id, router, toast, t, session.title, session.audioUrl]);

  const progress = (currentTime / session.duration) * 100;

  return (
    <>
      <SafetyPromptDialog
        open={isSafetyPromptOpen}
        onStart={handleStartSession}
        sessionType={session.category}
      />
      {session.audioUrl && <audio ref={audioRef} src={session.audioUrl} preload="auto" />}
      <div className="relative h-screen w-screen overflow-hidden">
        <Image
          src={session.imageUrl}
          alt={session.title}
          data-ai-hint={session.imageHint}
          fill
          className="object-cover scale-110 blur-xl"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-card/80 backdrop-blur-lg border-white/20 shadow-2xl">
          <div className="p-6 space-y-6">
            <div className="text-center">
              <p className="text-sm uppercase tracking-wider text-primary font-semibold">{session.category}</p>
              <h1 className="text-3xl font-bold font-headline mt-1">{session.title}</h1>
            </div>

            <div className="space-y-2">
              <Progress value={progress} aria-label={t.progress_label} />
              <div className="flex justify-between text-xs text-muted-foreground font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>-{formatTime(session.duration - currentTime)}</span>
              </div>
            </div>

            {!isReady && !isSafetyPromptOpen && (
              <div className="flex items-center justify-center h-24">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            )}

            {isReady && (
              <div className="flex flex-col gap-4">
                <div className="flex justify-center items-center gap-4">
                  <Button variant="ghost" size="icon" onClick={() => seek(-10)} className="h-12 w-12" aria-label={t.seek_backward_aria}>
                      <Rewind10Icon className="h-8 w-8" />
                  </Button>
                  <Button variant="default" size="icon" onClick={togglePlayPause} className="h-20 w-20 rounded-full shadow-lg" aria-label={isPlaying ? t.pause_button_aria : t.play_button_aria}>
                    {isPlaying ? <Pause className="h-10 w-10 fill-primary-foreground" /> : <Play className="h-10 w-10 fill-primary-foreground" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => seek(10)} className="h-12 w-12" aria-label={t.seek_forward_aria}>
                      <FastForward10Icon className="h-8 w-8" />
                  </Button>
                </div>

                <div className="grid grid-cols-5 items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={toggleMute} aria-label={isMuted ? t.unmute_button_aria : t.mute_button_aria} disabled={!session.audioUrl}>
                    {isMuted ? <VolumeX /> : <Volume2 />}
                  </Button>

                  <div className="col-span-3 flex justify-center items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={restart} className="h-12 w-12" aria-label={t.restart_button_aria}>
                      <RotateCcw className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={handleFavoriteToggle} className="h-12 w-12" aria-label={isFav ? t.remove_from_favorites_button_aria : t.add_to_favorites_button_aria}>
                      <Heart className={cn("h-6 w-6 transition-colors", isFav && "fill-secondary text-secondary")} />
                    </Button>
                  </div>
                  
                  <Button variant="ghost" size="icon" onClick={stop} aria-label={t.stop_button_aria}>
                      <X />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

    