
'use client';

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const banners = [
  { id: 1, imageUrl: 'https://picsum.photos/seed/ad1/1200/100', imageHint: 'running shoes on pavement', alt: 'Ad for new running shoes' },
  { id: 2, imageUrl: 'https://picsum.photos/seed/ad2/1200/100', imageHint: 'protein shake and fruit', alt: 'Ad for protein supplements' },
  { id: 3, imageUrl: 'https://picsum.photos/seed/ad3/1200/100', imageHint: 'yoga mat and water bottle', alt: 'Ad for yoga accessories' },
];

export function AdBanner() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <div className="relative h-16 md:h-20 w-full overflow-hidden">
              <Image
                src={banner.imageUrl}
                alt={banner.alt}
                data-ai-hint={banner.imageHint}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
