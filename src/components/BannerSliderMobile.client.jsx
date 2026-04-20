import {useEffect, useRef, useState} from 'react';
import {Image, Link} from '@shopify/hydrogen';
import useEmblaCarousel from 'embla-carousel-react';

export default function BannerSliderMobile({loading}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true});
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const slides = [
    {to: '/collections/Whiskey', src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/banner1mobile.webp?v=1666850299', alt: 'whiskey banner'},
    {to: '/products/la-santa-24k-tequila?tama%25C3%25B1o=750%2520ml', src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/banner2mobile.webp?v=1666850306', alt: 'La Santa Tequila Banner'},
    {to: '/collections/all', src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/banner3mobile.webp?v=1666881872', alt: 'vinos banner'},
  ];

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', () => setCurrent(emblaApi.selectedScrollSnap()));
    timerRef.current = setInterval(() => emblaApi.scrollNext(), 3000);
    return () => {
      clearInterval(timerRef.current);
      emblaApi.off('select', () => {});
    };
  }, [emblaApi]);

  return (
    <div className="relative w-full overflow-hidden lg:hidden">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide) => (
            <div key={slide.to} className="flex-[0_0_100%] min-w-0">
              <Link to={slide.to} className="grid">
                <Image
                  loaderOptions={{crop: 'center', scale: 2}}
                  width={1920}
                  height={700}
                  alt={slide.alt}
                  src={slide.src}
                  loading={loading}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white scale-125' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}
