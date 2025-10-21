import Link from "next/link";
import { Logo } from "@/components/icons/Logo";
import messages from '@/../messages/ja.json';
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";

export function Header() {
  const t = messages.Header;
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-white/20 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="group-hover:scale-110 transition-transform duration-300 ease-in-out" />
          <h1 className="text-2xl font-bold tracking-tight text-primary font-headline">
            {t.title}
          </h1>
        </Link>
        <Link href="/add-session">
          <Button variant="ghost" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            セッションを追加
          </Button>
        </Link>
      </div>
    </header>
  );
}
