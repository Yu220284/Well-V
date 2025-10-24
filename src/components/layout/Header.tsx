import Link from "next/link";
import { Logo } from "@/components/icons/Logo";
import messages from '@/../messages/ja.json';
import { Button } from "../ui/button";
import { History, PlusCircle, Settings } from "lucide-react";

export function Header() {
  const t = messages.Header;
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-white/20 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="group-hover:scale-110 transition-transform duration-300 ease-in-out" />
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary font-headline">
            {t.title}
          </h1>
        </Link>
        <div className="flex items-center gap-2">
            <Link href="/add-session">
              <Button variant="ghost" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                {t.add_session}
              </Button>
            </Link>
            <Link href="/submitted">
              <Button variant="ghost" size="sm">
                <History className="mr-2 h-4 w-4" />
                {t.submitted}
              </Button>
            </Link>
            <Link href="/settings">
                <Button variant="ghost" size="icon" aria-label={t.settings_aria}>
                    <Settings className="h-5 w-5" />
                </Button>
            </Link>
        </div>
      </div>
    </header>
  );
}
