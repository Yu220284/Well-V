
'use client';

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { usePremium } from "@/lib/hooks/use-premium";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const banners = [
  { id: 1, imageUrl: 'https://picsum.photos/seed/ad1/600/120', imageHint: 'running shoes on pavement', alt: 'Ad for new running shoes' },
  { id: 2, imageUrl: 'https://picsum.photos/seed/ad2/600/120', imageHint: 'protein shake and fruit', alt: 'Ad for protein supplements' },
  { id: 3, imageUrl: 'https://picsum.photos/seed/ad3/600/120', imageHint: 'yoga mat and water bottle', alt: 'Ad for yoga accessories' },
];

export function AdBanner() {
  const { checkPremiumStatus, showAds } = usePremium();
  const isPremium = checkPremiumStatus();
  
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  if (isPremium && !showAds) return null;

  return (
    <div className="flex justify-center px-4 mt-2">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-2xl h-[120px]"
        opts={{
          align: "center",
          loop: true,
        }}
      >
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <div className="relative h-[120px] w-full overflow-hidden rounded-lg">
              <Image
                src={banner.imageUrl}
                alt={banner.alt}
                data-ai-hint={banner.imageHint}
                fill
                sizes="600px"
                className="object-cover rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      </Carousel>
    </div>
  );
}
