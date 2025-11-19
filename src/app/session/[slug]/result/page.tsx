
import { getSession } from '@/lib/getSession';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function SessionResultPage({
  params,
}: {
  params: { slug: string };
}) {
  const session = getSession(params.slug);

  if (!session) {
    return <div>Session not found</div>;
  }

  const minutes = Math.floor(session.duration / 60);
  const seconds = session.duration % 60;

  return (
    <div className="container mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>セッション完了！</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4">{session.title}</h2>
          <div className="relative w-full h-60 mb-4">
            <Image
              src={session.imageUrl}
              alt={session.imageHint}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="text-lg mb-4">
            時間: {minutes}分{seconds}秒
          </p>
          <div className="flex space-x-4 mb-4">
            <Button>SNSで共有</Button>
            <Button>グループに投稿</Button>
          </div>
          <Link href="/">
            <Button variant="outline">ホームに戻る</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
