
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Layers, Settings, Contact } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "../icons/Logo";

export function BottomNav() {
  const pathname = usePathname();

  // Temporary fix: Define labels directly in the component to avoid i18n issues.
  const t = {
    group: "グループ",
    sessions: "セッション",
    home: "ホーム",
    trainers: "トレーナー",
    settings: "設定"
  };

  const navItems = [
    { href: "/community", label: t.group, icon: Users },
    { href: "/sessions", label: t.sessions, icon: Layers },
    { href: "/", label: t.home, icon: Logo, isCentral: true },
    { href: "/trainers", label: t.trainers, icon: Contact },
    { href: "/settings", label: t.settings, icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-card border-t border-border">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = (pathname === "/" && item.href === "/") || (pathname !== "/" && pathname.startsWith(item.href) && item.href !== "/");
          const Icon = item.icon;

          if (item.isCentral) {
            return (
              <div key={item.href} className="flex items-center justify-center">
                <Link href={item.href} className={cn(
                  "inline-flex flex-col items-center justify-center -mt-7 rounded-full h-14 w-14 shadow-lg border-4 border-background transition-colors duration-300",
                  isActive ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
                )}>
                  <Icon className={cn("h-7 w-7", isActive ? "text-primary-foreground" : "text-primary" )} />
                  <span className="text-[10px] whitespace-nowrap">{item.label}</span>
                </Link>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50 group",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
