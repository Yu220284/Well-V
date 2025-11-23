import { notFound } from "next/navigation";
import { SESSIONS } from "@/lib/data";
import { SessionDetail } from "@/components/session/SessionDetail";
import type { Metadata } from "next";
import messages from '@/../messages/ja.json';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const session = SESSIONS.find((s) => s.id === slug);
  const t = messages.Metadata;

  if (!session) {
    return {
      title: "Session Not Found",
    };
  }
  return {
    title: `${session.title} | ${t.title}`,
    description: `${session.description}`,
  };
}

export default async function SessionPage({ params }: Props) {
  const { slug } = await params;
  const session = SESSIONS.find((s) => s.id === slug);

  if (!session) {
    notFound();
  }

  return <SessionDetail session={session} />;
}

export function generateStaticParams() {
    return SESSIONS.map((session) => ({
        slug: session.id,
    }));
}
