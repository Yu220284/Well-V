import { notFound } from "next/navigation";
import { SESSIONS } from "@/lib/data";
import { Player } from "@/components/session/Player";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

type Props = {
  params: { slug: string; locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = SESSIONS.find((s) => s.id === params.slug);
  const t = await getTranslations({locale: params.locale, namespace: 'Metadata'});

  if (!session) {
    return {
      title: "Session Not Found",
    };
  }
  return {
    title: `${session.title} | ${t('title')}`,
    description: `Start your ${session.category} session: ${session.title}.`,
  };
}

export default function SessionPage({ params }: Props) {
  const session = SESSIONS.find((s) => s.id === params.slug);

  if (!session) {
    notFound();
  }

  return <Player session={session} />;
}

export function generateStaticParams() {
    const locales = ['en', 'ja', 'zh'];
    const paths = SESSIONS.flatMap(session => 
      locales.map(locale => ({
        locale,
        slug: session.id,
      }))
    );
    return paths;
}
