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

const FIRST_VISIT_KEY = "wellv_first_visit";

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
          <AlertDialogTitle>うぇるぶいへようこそ！</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4 pt-4 text-foreground/80">
            <p>
              最初のセッションを開始する前に、少し時間を取ってこの重要な安全情報をお読みください。
            </p>
            <p className="font-semibold">
              常に安全で快適な環境にいることを確認してください。水分を補給し、自分の体に耳を傾けてください。痛みや不快感を感じた場合は、直ちにセッションを中止し、必要に応じて医療専門家にご相談ください。
            </p>
            <p>
              マインドフルネスへの旅をお楽しみください！
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={handleAcknowledge}>
            理解しました
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
