import { Link } from "@/navigation";
import { Logo } from "@/components/icons/Logo";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const t = useTranslations("Header");
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 border-b border-white/20 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo className="group-hover:scale-110 transition-transform duration-300 ease-in-out" />
          <h1 className="text-2xl font-bold tracking-tight text-primary-foreground bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-violet-500 font-headline">
            {t('title')}
          </h1>
        </Link>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
