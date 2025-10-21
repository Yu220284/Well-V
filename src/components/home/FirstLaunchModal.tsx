"use client";

import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const FIRST_VISIT_KEY = "voicezen_first_visit";

export function FirstLaunchModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const firstVisit = localStorage.getItem(FIRST_VISIT_KEY);
    if (!firstVisit) {
      setIsOpen(true);
    }
  }, []);

  const handleAcknowledge = () => {
    localStorage.setItem(FIRST_VISIT_KEY, "false");
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Welcome to VoiceZen!</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4 pt-4 text-foreground/80">
            <p>
              Before starting your first session, please take a moment to read this important safety information.
            </p>
            <p className="font-semibold">
              Always ensure you are in a safe, comfortable environment. Stay hydrated and listen to your body. If you experience any pain or discomfort, please stop the session immediately and consult a healthcare professional if necessary.
            </p>
            <p>
              Enjoy your journey to mindfulness!
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleAcknowledge}>
            I Understand
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
