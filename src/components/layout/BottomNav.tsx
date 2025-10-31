"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Layers, Users, Globe, Settings, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "ホーム", icon: Home },
  { href: "/sessions", label: "セッション", icon: Layers },
  { href: "/add-session", label: "追加", icon: PlusCircle, isCentral: true },
  { href: "/trainers", label: "トレーナー", icon: Users },
  { href: "/settings", label: "設定", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-card border-t border-border">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = (pathname === "/" && item.href === "/") || (pathname !== "/" && pathname.startsWith(item.href) && item.href !== "/");
          const Icon = item.icon;

          if (item.isCentral) {
            return (
              <div key={item.href} className="flex items-center justify-center">
                <Link href={item.href} className="inline-flex flex-col items-center justify-center -mt-8 bg-primary text-primary-foreground rounded-full h-16 w-16 shadow-lg border-4 border-background">
                  <Icon className="h-6 w-6" />
                  <span className="sr-only">{item.label}</span>
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
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}