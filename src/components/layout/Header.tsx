import Link from "next/link";
import messages from '@/../messages/ja.json';

export function Header() {
  const t = messages.Header;
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <Link href="/" className="flex items-center gap-3 group">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary font-headline whitespace-nowrap">
            {t.title}
          </h1>
        </Link>
      </div>
    </header>
  );
}
