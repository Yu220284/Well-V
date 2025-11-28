"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, Layers, Menu, Contact } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "../icons/Logo";

export function BottomNav() {
  const pathname = usePathname();

  if (pathname.startsWith('/onboarding') || pathname === '/language-select' || pathname === '/splash' || pathname.startsWith('/auth/login') || pathname.startsWith('/auth/signup') || pathname.includes('/tutorial') || pathname.includes('/play')) {
    return null;
  }


  const navItems = [
    { href: "/sessions", label: "Sessions", icon: Layers },
    { href: "/trainers", label: "Trainers", icon: Contact, dataTutorial: "trainer-list" },
    { href: "/", label: "Home", icon: Logo, isCentral: true },
    { href: "/community", label: "Group", icon: Users },
    { href: "/menu", label: "Menu", icon: Menu },
  ];

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-12 bg-card border-t border-border">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navItems.map((item) => {
          const isActive = (item.href === "/" && pathname === "/") || (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          if (item.isCentral) {
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className="relative flex justify-center"
              >
                <div className={cn(
                    "absolute -top-5 flex h-12 w-12 items-center justify-center rounded-full border-3 border-background bg-card shadow-md transition-transform duration-300 hover:scale-110",
                    isActive ? "bg-primary" : "bg-card"
                )}>
                  <Icon className={cn(
                    "h-6 w-6 transition-colors",
                    isActive ? "text-primary-foreground" : "text-primary"
                  )} />
                </div>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={cn(
                "inline-flex flex-col items-center justify-center px-4 hover:bg-primary/5 group",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
              data-tutorial={item.dataTutorial}
            >
              <Icon className="w-5 h-5" />
              <span className="sr-only">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}