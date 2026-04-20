import useEmblaCarousel from 'embla-carousel-react';
import {ProductCard} from '~/components';

export default function SimpleSlider({products}) {
  // Use 'center' as the default for mobile, but 'start' for larger screens if needed
  // Or simply keep 'center' globally for a more balanced look
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center', // This centers the active slide
    dragFree: false,
    containScroll: 'trimSnaps', // Prevents excessive whitespace at the ends
  });

  const scroll = (dir) => {
    if (!emblaApi) return;
    dir === -1 ? emblaApi.scrollPrev() : emblaApi.scrollNext();
  };

  return (
    <div className="relative px-4 md:px-12">
      <div ref={emblaRef} className="overflow-hidden">
        {/* Added 'ml-[-1rem]' to account for slide padding and keep centering true */}
        <div className="flex gap-2 py-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_32%] lg:flex-[0_0_24%] min-w-0 px-2"
            >
              <div className="transition-transform duration-300 hover:scale-[1.02]">
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modernized Navigation Buttons */}
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-contrast/10 shadow-sm transition-all hover:bg-white hover:scale-110 active:scale-95 text-contrast"
        onClick={() => scroll(-1)}
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-contrast/10 shadow-sm transition-all hover:bg-white hover:scale-110 active:scale-95 text-contrast"
        onClick={() => scroll(1)}
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
