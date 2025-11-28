"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  Rewind,
  FastForward,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { useSessionStore } from "@/lib/hooks/use-session-store";
import { useFollowStore } from "@/lib/hooks/use-follow-store";
import { usePremium } from "@/lib/hooks/use-premium";
import type { Session } from "@/lib/types";
import { SafetyPromptDialog } from "./SafetyPromptDialog";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { TRAINERS } from "@/lib/data";
import messages from "@/../messages/ja.json";

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function Player({ session, trainerId = 1 }: { session: Session; trainerId?: number }) {
  const t = messages.SessionPlayer;
  const router = useRouter();
  const { addSession, toggleFavorite, isFavorite, isLoaded } = useSessionStore();
  const { toggleFollow, isFollowing } = useFollowStore();
  const { checkPremiumStatus } = usePremium();
  const { toast } = useToast();
  const selectedTrainer = TRAINERS.find(trainer => trainer.id === trainerId) || TRAINERS[0];
  const isPremium = checkPremiumStatus();
  
  const getAudioUrl = () => {
    if (selectedTrainer.id === 1 && session.audioUrl) {
      return session.audioUrl;
    }
    return '';
  };
  
  const audioUrl = getAudioUrl();
  const videoUrl = session.videoUrl || '';
  const hasVideo = isPremium && session.hasVideo && videoUrl;

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isSafetyPromptOpen, setIsSafetyPromptOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [actualDuration, setActualDuration] = useState(session.duration);
  const [playbackRate, setPlaybackRate] = useState(1.0);

  const isFav = isLoaded ? isFavorite(session.id) : false;



  const handleStartSession = () => {
    setIsSafetyPromptOpen(false);
    if (hasVideo && videoRef.current) {
      videoRef.current.play().catch((e) => console.error("Video play failed:", e));
    } else if (audioUrl && audioRef.current) {
      audioRef.current.play().catch((e) => console.error("Audio play failed:", e));
    } else {
      setIsPlaying(true);
      setIsReady(true);
    }
  };

  const handleCanPlay = () => {
    setIsReady(true);
    const media = hasVideo ? videoRef.current : audioRef.current;
    if (media && media.duration && !isNaN(media.duration) && isFinite(media.duration)) {
      setActualDuration(media.duration);
    }
  };

  const togglePlayPause = useCallback(() => {
    if (hasVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((e) => console.error("Video play failed:", e));
      }
    } else if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((e) => console.error("Audio play failed:", e));
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  }, [hasVideo, audioUrl, isPlaying]);

  const restart = useCallback(() => {
    setCurrentTime(0);
    if (hasVideo && videoRef.current) {
      videoRef.current.currentTime = 0;
      if (!isPlaying) {
        videoRef.current.play().catch((e) => console.error("Video play failed:", e));
      }
    } else if (audioUrl && audioRef.current) {
      audioRef.current.currentTime = 0;
      if (!isPlaying) {
        audioRef.current.play().catch((e) => console.error("Audio play failed:", e));
      }
    } else if (!isPlaying) {
      setIsPlaying(true);
    }
  }, [hasVideo, audioUrl, isPlaying]);

  const handleStop = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentTime(0);
    router.push("/");
  }, [router]);

  const toggleMute = () => {
    if (hasVideo && videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    } else if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  const handleFavoriteToggle = () => {
    const wasIsFav = isFav;
    toggleFavorite(session.id);
    
    // toast呼び出しを次のレンダリングサイクルまで遅延
    setTimeout(() => {
      toast({
        title: wasIsFav ? t.removed_from_favorites : t.added_to_favorites,
        description: session.title,
      });
    }, 0);
  };

  const seek = useCallback((delta: number) => {
    const mediaRef = hasVideo ? videoRef.current : audioRef.current;
    if (!mediaRef) return;
    const newTime = Math.max(0, Math.min(actualDuration, mediaRef.currentTime + delta));
    mediaRef.currentTime = newTime;
    setCurrentTime(newTime);
  }, [hasVideo, actualDuration]);

  const handleSliderChange = (value: number[]) => {
    const newTime = value[0];
    const mediaRef = hasVideo ? videoRef.current : audioRef.current;
    if (mediaRef) {
      mediaRef.currentTime = newTime;
    }
    setCurrentTime(newTime);
    
    const tutorialActive = localStorage.getItem('wellv_tutorial_active') === 'true';
    const currentStep = parseInt(localStorage.getItem('wellv_tutorial_step') || '0');
    if (tutorialActive && currentStep === 10 && newTime >= session.duration - 1) {
      localStorage.setItem('wellv_tutorial_step', '11');
    }
  };

  useEffect(() => {
    if (isPlaying && !audioUrl && !hasVideo) {
      const timer = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime >= actualDuration) {
            clearInterval(timer);
            addSession(session.id);
            setIsPlaying(false);
            const tutorialActive = localStorage.getItem('wellv_tutorial_active') === 'true';

            setTimeout(() => router.push(`/session/${session.id}/result`), tutorialActive ? 0 : 2000);
            return actualDuration;
          }
          return prevTime + 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, actualDuration, session.id, audioUrl, hasVideo, addSession, router, toast, t, session.title]);

  useEffect(() => {
    const media = hasVideo ? videoRef.current : audioRef.current;
    if (!media || (!hasVideo && !audioUrl)) return;

    const updateCurrentTime = () => setCurrentTime(media.currentTime);
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      addSession(session.id);
      setIsPlaying(false);
      const tutorialActive = localStorage.getItem('wellv_tutorial_active') === 'true';

      setTimeout(() => router.push(`/session/${session.id}/result`), tutorialActive ? 0 : 2000);
    };

    media.addEventListener("timeupdate", updateCurrentTime);
    media.addEventListener("play", onPlay);
    media.addEventListener("pause", onPause);
    media.addEventListener("ended", onEnded);
    media.addEventListener("canplay", handleCanPlay);

    return () => {
      media.removeEventListener("timeupdate", updateCurrentTime);
      media.removeEventListener("play", onPlay);
      media.removeEventListener("pause", onPause);
      media.removeEventListener("ended", onEnded);
      media.removeEventListener("canplay", handleCanPlay);
    };
  }, [addSession, session.id, router, toast, t, session.title, audioUrl, hasVideo]);

  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: session.title,
        artist: selectedTrainer.name,
        album: session.category === 'workout' ? 'ワークアウト' : session.category === 'yoga' ? 'ヨガ' : 'ストレッチ',
        artwork: [
          { src: session.imageUrl, sizes: '96x96', type: 'image/jpeg' },
          { src: session.imageUrl, sizes: '128x128', type: 'image/jpeg' },
          { src: session.imageUrl, sizes: '192x192', type: 'image/jpeg' },
          { src: session.imageUrl, sizes: '256x256', type: 'image/jpeg' },
          { src: session.imageUrl, sizes: '384x384', type: 'image/jpeg' },
          { src: session.imageUrl, sizes: '512x512', type: 'image/jpeg' },
        ],
      });

      navigator.mediaSession.setActionHandler('play', togglePlayPause);
      navigator.mediaSession.setActionHandler('pause', togglePlayPause);
      navigator.mediaSession.setActionHandler('seekbackward', () => seek(-10));
      navigator.mediaSession.setActionHandler('seekforward', () => seek(10));
      navigator.mediaSession.setActionHandler('previoustrack', restart);
      navigator.mediaSession.setActionHandler('stop', handleStop);
    }

    return () => {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = null;
        navigator.mediaSession.setActionHandler('play', null);
        navigator.mediaSession.setActionHandler('pause', null);
        navigator.mediaSession.setActionHandler('seekbackward', null);
        navigator.mediaSession.setActionHandler('seekforward', null);
        navigator.mediaSession.setActionHandler('previoustrack', null);
        navigator.mediaSession.setActionHandler('stop', null);
      }
    };
  }, [session.title, session.category, session.imageUrl, selectedTrainer.name, togglePlayPause, seek, restart, handleStop]);

  return (
    <>
      <SafetyPromptDialog
        open={isSafetyPromptOpen}
        onStart={handleStartSession}
      />

      {!hasVideo && audioUrl && <audio ref={audioRef} src={audioUrl} preload="auto" />}
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
          <div className="p-6 space-y-4">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
              {hasVideo ? (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="w-full h-full object-cover"
                  preload="auto"
                  playsInline
                />
              ) : (
                <Image
                  src={session.imageUrl}
                  alt={session.title}
                  data-ai-hint={session.imageHint}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>

            <div className="text-center">
              <p className="text-sm uppercase tracking-wider text-primary font-semibold">{session.category}</p>
              <h1 className="text-2xl font-bold font-headline mt-1">{session.title}</h1>
              <p className="text-sm text-muted-foreground mt-2">ガイド: {selectedTrainer.name}</p>
            </div>

            <div className="space-y-2">
              <Slider
                value={[currentTime]}
                max={actualDuration}
                onValueChange={handleSliderChange}
                aria-label={t.progress_label}
                disabled={!isReady}
                className="cursor-pointer"
                data-tutorial="progress"
              />
              <div className="flex justify-between text-xs text-muted-foreground font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>-{formatTime(actualDuration - currentTime)}</span>
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
                  <Button
                    variant="ghost"
                    onClick={() => seek(-10)}
                    className="relative h-16 w-16 flex flex-col items-center justify-center gap-0.5"
                    aria-label={t.seek_backward_aria}
                    data-tutorial="rewind"
                  >
                    <span className="text-sm font-bold ml-1">10</span>
                    <Rewind className="h-7 w-7" />
                  </Button>
                  <Button
                    variant="default"
                    onClick={togglePlayPause}
                    className="h-20 w-20 rounded-full shadow-lg"
                    aria-label={isPlaying ? t.pause_button_aria : t.play_button_aria}
                    data-tutorial="play-button"
                  >
                    {isPlaying ? (
                      <Pause className="h-10 w-10 fill-primary-foreground" />
                    ) : (
                      <Play className="h-10 w-10 fill-primary-foreground" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => seek(10)}
                    className="relative h-16 w-16 flex flex-col items-center justify-center gap-0.5"
                    aria-label={t.seek_forward_aria}
                    data-tutorial="forward"
                  >
                    <span className="text-sm font-bold mr-1">10</span>
                    <FastForward className="h-7 w-7" />
                  </Button>
                </div>

                <div className="grid grid-cols-5 items-center gap-2">
                  <Button
                    variant="ghost"
                    onClick={toggleMute}
                    className="h-16 w-16"
                    aria-label={isMuted ? t.unmute_button_aria : t.mute_button_aria}
                    disabled={!audioUrl && !hasVideo}
                    data-tutorial="volume"
                  >
                    {isMuted ? <VolumeX className="h-8 w-8" /> : <Volume2 className="h-8 w-8" />}
                  </Button>

                  <div className="col-span-3 flex justify-center items-center gap-2">
                    <Button variant="ghost" onClick={restart} className="h-16 w-16" aria-label={t.restart_button_aria}>
                      <RotateCcw className="h-8 w-8" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleFavoriteToggle}
                      className="h-16 w-16"
                      aria-label={isFav ? t.remove_from_favorites_button_aria : t.add_to_favorites_button_aria}
                      data-tutorial="favorite"
                    >
                      <Heart className={cn("h-8 w-8 transition-colors", isFav && "fill-red-500 text-red-500")} />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        const wasFollowing = isFollowing(selectedTrainer.id);
                        toggleFollow(selectedTrainer.id);
                        setTimeout(() => {
                          toast({
                            title: wasFollowing ? "フォローを解除しました" : "フォローしました",
                            description: selectedTrainer.name,
                          });
                        }, 0);
                      }}
                      className="h-16 w-16"
                      aria-label={isFollowing(selectedTrainer.id) ? "フォロー解除" : "フォロー"}
                    >
                      <UserPlus className={cn("h-8 w-8 transition-colors", isFollowing(selectedTrainer.id) && "text-primary")} />
                    </Button>
                  </div>

                  <Button 
                    variant="ghost" 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleStop();
                    }} 
                    className="h-16 w-16" 
                    aria-label={t.stop_button_aria}
                    type="button"
                  >
                    <X className="h-8 w-8" />
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
