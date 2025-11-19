
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Dot } from "lucide-react";
import messages from '@/../messages/ja.json';

interface SafetyPromptDialogProps {
  open: boolean;
  onStart: () => void;
}

const safetyPrompt = [
    "足元や周囲に物がないかを確認し、転倒や事故を防ぎましょう。",
    "運動前後には十分な水分を摂取してください。",
    "痛み・強い不快感・めまいなどを感じた場合はすぐに中止し、必要に応じて医療機関へ相談してください。",
];

export function SafetyPromptDialog({ open, onStart }: SafetyPromptDialogProps) {
  const t = messages.SafetyPrompt;

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
        <DialogFooter>
          <Button onClick={onStart} className="w-full">
            {t.start_button}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
