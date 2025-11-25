"use client";

import Link from "next/link";
import { Settings, Bell, Diamond, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/auth/AuthButton";
import { useAuth } from "@/lib/auth/auth-context";

export function Header() {
  const { user } = useAuth();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-2 px-3 bg-background/80 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto relative flex items-center justify-between">
        {/* 左端：設定アイコン */}
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
        
        {/* 中央：WellVロゴ（絶対中央配置） */}
        <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-lg font-bold tracking-tight text-primary font-headline">
            Well-V
          </h1>
        </Link>
        
        {/* 右端：お知らせアイコン */}
        <Link href="/menu/notifications">
          <Button variant="ghost" size="icon" className="h-9 w-9 relative">
            <Bell className="h-5 w-5" />
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
