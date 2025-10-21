import { notFound } from "next/navigation";
import { SESSIONS } from "@/lib/data";
import { Player } from "@/components/session/Player";
import type { Metadata } from "next";
import messages from '@/../messages/ja.json';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const session = SESSIONS.find((s) => s.id === params.slug);
  const t = messages.Metadata;

  if (!session) {
    return {
      title: "Session Not Found",
    };
  }
  return {
    title: `${session.title} | ${t.title}`,
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
    return SESSIONS.map((session) => ({
        slug: session.id,
    }));
}
