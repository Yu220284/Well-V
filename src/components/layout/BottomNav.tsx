
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Layers, Settings, Contact } from "lucide-react";
import { cn } from "@/lib/utils";
import messages from '@/../messages/ja.json';

export function BottomNav() {
  const pathname = usePathname();
  const t = messages.BottomNav;

  const navItems = [
    { href: "/sessions", label: t.sessions, icon: Layers },
    { href: "/trainers", label: t.trainers, icon: Contact },
    { href: "/community", label: t.group, icon: Users },
    { href: "/settings", label: t.settings, icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-card border-t border-border">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "inline-flex flex-col items-center justify-center px-5 hover:bg-muted/50 group",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
