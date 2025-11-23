import { notFound } from "next/navigation";
import { SESSIONS } from "@/lib/data";
import { Player } from "@/components/session/Player";
import type { Metadata } from "next";
import messages from '@/../messages/ja.json';

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ trainer?: string }>;
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
    description: `Start your ${session.category} session: ${session.title}.`,
  };
}

export default async function SessionPlayPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { trainer } = await searchParams;
  const session = SESSIONS.find((s) => s.id === slug);

  if (!session) {
    notFound();
  }

  return <Player session={session} trainerId={trainer ? parseInt(trainer) : 1} />;
}