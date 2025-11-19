import Link from "next/link";
import { Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import messages from '@/../messages/ja.json';

export function Header() {
  const t = messages.Header;
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/settings">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Settings className="h-5 w-5" />
          </Button>
        </Link>
        
        <Link href="/" className="flex items-center gap-3 group">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary font-headline whitespace-nowrap">
            {t.title}
          </h1>
        </Link>
        
        <Link href="/menu/notifications">
          <Button variant="ghost" size="icon" className="h-10 w-10 relative">
            <Bell className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full" />
          </Button>
        </Link>
      </div>
    </header>
  );
}
