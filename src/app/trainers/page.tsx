import { Header } from "@/components/layout/Header";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function TrainersPage() {
  // TODO: Fetch trainers data
  const trainers = [
    { id: 1, name: 'Sora', imageUrl: 'https://picsum.photos/seed/trainer1/800/600', imageHint: 'female trainer portrait' },
    { id: 2, name: 'Kaito', imageUrl: 'https://picsum.photos/seed/trainer2/800/600', imageHint: 'male trainer portrait' },
    { id: 3, name: 'Yui', imageUrl: 'https://picsum.photos/seed/trainer3/800/600', imageHint: 'female trainer smiling' },
  ];

  const banners = [
    { id: 1, imageUrl: 'https://picsum.photos/seed/banner1/1200/400', imageHint: 'fitness equipment', alt: 'New workout series banner' },
    { id: 2, imageUrl: 'https://picsum.photos/seed/banner2/1200/400', imageHint: 'yoga class sunset', alt: 'Summer yoga challenge banner' },
    { id: 3, imageUrl: 'https://picsum.photos/seed/banner3/1200/400', imageHint: 'meditation nature', alt: 'Mindfulness retreat banner' },
  ]

  return (
    <div className="pb-24">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section>
            <h1 className="text-3xl font-bold font-headline mb-4">トレーナー</h1>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {banners.map((banner) => (
                  <CarouselItem key={banner.id}>
                    <div className="relative h-48 md:h-64 w-full rounded-lg overflow-hidden">
                      <Image
                        src={banner.imageUrl}
                        alt={banner.alt}
                        data-ai-hint={banner.imageHint}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </section>

          <section>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {trainers.map((trainer) => (
                <div key={trainer.id} className="group relative">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                    <Image
                      src={trainer.imageUrl}
                      alt={`Portrait of ${trainer.name}`}
                      data-ai-hint={trainer.imageHint}
                      fill
                      className="object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{trainer.name}</h3>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}