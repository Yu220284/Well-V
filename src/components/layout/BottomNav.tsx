
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Layers, Settings, Contact } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "../icons/Logo";

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/community", icon: Users },
    { href: "/sessions", icon: Layers },
    { href: "/", icon: Logo, isCentral: true },
    { href: "/trainers", icon: Contact },
    { href: "/settings", icon: Settings },
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
                <Link href={item.href} aria-label="Home" className={cn(
                  "inline-flex flex-col items-center justify-center -mt-8 rounded-full h-16 w-16 shadow-lg border-4 border-background transition-colors duration-300",
                  isActive ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:bg-muted"
                )}>
                  <Icon className={cn("h-8 w-8", isActive ? "text-primary-foreground" : "text-primary" )} />
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
              <Icon className="w-6 h-6" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
