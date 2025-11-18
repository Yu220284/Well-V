
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { generateSafetyPrompt } from "@/ai/flows/generate-safety-prompt";
import type { SessionCategory } from "@/lib/types";
import { Loader2, ShieldCheck, Dot } from "lucide-react";
import messages from '@/../messages/ja.json';

interface SafetyPromptDialogProps {
  open: boolean;
  onStart: () => void;
  sessionType: SessionCategory;
}

const defaultSafetyPrompt = [
    "セッションを始める前に、周囲の安全を確かめてください。",
    "水分補給を忘れずに、ご自身の体の声に耳を傾けましょう。",
    "痛みや不快感があった場合はすぐに中止してください。",
];


export function SafetyPromptDialog({ open, onStart, sessionType }: SafetyPromptDialogProps) {
  const t = messages.SafetyPrompt;
  const [safetyPrompt, setSafetyPrompt] = useState<string[]>(defaultSafetyPrompt);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      setSafetyPrompt(defaultSafetyPrompt); // Reset to default when opening

      generateSafetyPrompt({ sessionType })
        .then(response => {
          setSafetyPrompt(response.safetyPrompt);
        })
        .catch(error => {
          console.error("Failed to generate safety prompt:", error);
          // Keep default prompt on error
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [open, sessionType]);

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            {t.title}
          </DialogTitle>
          <DialogDescription asChild className="pt-4 text-left">
            <ul className="space-y-3 text-base text-foreground/90">
                {safetyPrompt.map((item, index) => (
                    <li key={index} className="flex items-start">
                        <Dot className="h-6 w-6 text-primary flex-shrink-0 -ml-1" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2">
            {isLoading && (
                 <div className="flex items-center justify-center text-xs text-muted-foreground">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <p>AIがあなたに合わせたアドバイスを生成中...</p>
                </div>
            )}
          <Button onClick={onStart} disabled={isLoading} className="w-full">
            {isLoading ? t.loading : t.start_button}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
