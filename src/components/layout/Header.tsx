"use client";

import Link from "next/link";
import { Settings, Bell, Diamond, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/components/auth/AuthButton";
import { useAuth } from "@/lib/auth/auth-context";

export function Header() {
  const { user } = useAuth();
  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-md border-b border-border/20">
      <div className="container mx-auto relative flex items-center">
        {/* 左側エリア */}
        <div className="flex items-center gap-0 flex-1 mr-20">
          <Link href="/settings">
            <Button variant="ghost" size="icon" className="h-12 w-12">
              <Settings className="h-6 w-6" />
            </Button>
          </Link>
          {user ? (
            <Link href="/menu/profile">
              <Button variant="ghost" className="rounded-full h-10 px-3">
                <div className="flex items-center gap-2">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="Profile" className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <span className="text-sm font-semibold truncate max-w-20">{user.user_metadata?.name || user.email?.split('@')[0]}</span>
                </div>
              </Button>
            </Link>
          ) : (
            <AuthButton />
          )}
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
            <Button variant="ghost" size="icon" className="h-12 w-12 relative">
              <Bell className="h-6 w-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
