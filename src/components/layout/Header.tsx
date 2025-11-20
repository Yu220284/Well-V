"use client";

import Link from "next/link";
import { Settings, Bell, Diamond } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/auth/AuthButton";
import { useSupabaseFavorites } from "@/lib/hooks/use-supabase-favorites";

export function Header() {
  const { user } = useSupabaseFavorites();
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="container mx-auto relative flex items-center">
        {/* 左側エリア */}
        <div className="flex items-center gap-4 flex-1">
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
          <AuthButton />
        </div>
        
        {/* 中央：WellVロゴ（絶対中央配置） */}
        <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary font-headline">
            Well-V
          </h1>
        </Link>
        
        {/* 右側エリア */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          {user && (
            <div className="flex items-center gap-1 px-3 py-1 bg-primary/10 rounded-full">
              <Diamond className="h-4 w-4 text-primary fill-primary" />
              <span className="text-sm font-semibold text-primary">1,250</span>
            </div>
          )}
          <Link href="/menu/notifications">
            <Button variant="ghost" size="icon" className="h-10 w-10 relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
