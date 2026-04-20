import useEmblaCarousel from 'embla-carousel-react';
import {ProductCard} from '~/components';

export default function SimpleSlider({products}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: false,
  });

  const scroll = (dir) => {
    if (!emblaApi) return;
    dir === -1 ? emblaApi.scrollPrev() : emblaApi.scrollNext();
  };

  return (
    <div className="relative px-6">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-2 py-2">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-[0_0_80%] sm:flex-[0_0_45%] md:flex-[0_0_32%] lg:flex-[0_0_23%] xl:flex-[0_0_18%] min-w-0 in-view px-1"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 shadow-sm shadow-red-700 hover:shadow-md bg-red-500 border border-red-300 w-12 h-12 rounded-full transition-all text-white focus:outline-none hover:text-gray-500 hover:bg-gray-100"
        onClick={() => scroll(-1)}
      >
        <div className="w-12 h-12 rounded-full grid content-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 mx-auto"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </div>
      </button>

      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 shadow-sm shadow-red-700 hover:shadow-md bg-red-500 border border-red-300 w-12 h-12 rounded-full transition-all text-white focus:outline-none hover:text-gray-500 hover:bg-gray-100"
        onClick={() => scroll(1)}
      >
        <div className="w-12 h-12 rounded-full grid content-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 transform mx-auto rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </div>
      </button>
    </div>
  );
}
