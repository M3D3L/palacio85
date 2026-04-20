import {Image} from '@shopify/hydrogen';
import useEmblaCarousel from 'embla-carousel-react';

export default function BrandsSlider({loading}) {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: true,
  });

  const brands = [
    {src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/bacardi.png?v=1665641433', alt: 'Bacardi Logo'},
    {src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/absolut.svg?v=1665641423', alt: 'Absolut Logo'},
    {src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/johnnie.svg?v=1665641433', alt: 'Johnnie Logo'},
    {src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/baileys.svg?v=1665641433', alt: 'Baileys Logo'},
    {src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/jaegermeister.svg?v=1665641436', alt: 'Jaegermeister Logo'},
    {src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/smirnoff.svg?v=1665641433', alt: 'Smirnoff Logo'},
    {src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/captain.svg?v=1665641433', alt: 'Captain Logo'},
    {src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/malibu.webp?v=1666878497', alt: 'Malibu Logo'},
    {src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/jack.svg?v=1665641433', alt: 'Jack Daniels Logo'},
    {src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/julio.png?v=1665641433', alt: 'Julio Logo'},
    {src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/jimador.png?v=1665641433', alt: 'Jimador Logo'},
    {src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/cuervo.webp?v=1668053783', alt: 'Cuervo Logo'},
    {src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/johnbar.png?v=1665641433', alt: 'Johnbar Logo'},
  ];

  return (
    <div className="w-full max-w-[1920px] mx-auto py-2 lg:py-12">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex gap-4">
          {brands.map((brand) => (
            <div
              key={brand.alt}
              className="flex-[0_0_calc(100%/3.25)] lg:flex-[0_0_calc(100%/12)] min-w-0 cursor-pointer hover:translate-y-[-4px] transform transition-all duration-150 ease-linear"
            >
              <Image
                loaderOptions={{crop: 'center', scale: 2}}
                width={200}
                height={200}
                alt={brand.alt}
                src={brand.src}
                loading={loading}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
