"use client";

import Link from "next/link";
import { Settings, Bell, Diamond, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/auth/AuthButton";
import { useAuth } from "@/lib/auth/auth-context";
import { useDiamonds } from "@/lib/hooks/use-diamonds";

export function Header() {
  const { user } = useAuth();
  const { diamonds } = useDiamonds();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-1 px-3 bg-background/80 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto relative flex items-center justify-between">
        {/* 左端：設定アイコン */}
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </Link>
        
        {/* 中央：WellVロゴとダイヤモンド */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
          <Link href="/">
            <h1 className="text-sm font-bold tracking-tight text-primary font-headline">
              Well-V
            </h1>
          </Link>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-100 to-blue-100">
            <Diamond className="h-3 w-3 text-cyan-600 fill-cyan-600" />
            <span className="text-xs font-semibold text-cyan-700">{diamonds}</span>
          </div>
        </div>
        
        {/* 右端：お知らせアイコン */}
        <Link href="/menu/notifications">
          <Button variant="ghost" size="icon" className="h-7 w-7 relative">
            <Bell className="h-3.5 w-3.5" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
