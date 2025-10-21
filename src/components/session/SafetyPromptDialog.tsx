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
import { Loader2, ShieldCheck } from "lucide-react";
import messages from '@/../messages/ja.json';

interface SafetyPromptDialogProps {
  open: boolean;
  onStart: () => void;
  sessionType: SessionCategory;
}

export function SafetyPromptDialog({ open, onStart, sessionType }: SafetyPromptDialogProps) {
  const t = messages.SafetyPrompt;
  const [safetyPrompt, setSafetyPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      generateSafetyPrompt({ sessionType })
        .then(response => {
          setSafetyPrompt(response.safetyPrompt);
        })
        .catch(error => {
          console.error("Failed to generate safety prompt:", error);
          setSafetyPrompt("Before starting, ensure you are in a safe environment. Stay hydrated and listen to your body. If you experience any pain or discomfort, stop immediately.");
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
          <DialogDescription className="pt-4 text-left">
            {isLoading ? (
              <div className="flex items-center justify-center h-24">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <p className="text-base text-foreground/90">{safetyPrompt}</p>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onStart} disabled={isLoading} className="w-full">
            {isLoading ? t.loading : t.start_button}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
