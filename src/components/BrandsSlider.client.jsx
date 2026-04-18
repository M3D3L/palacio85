import {useState, useEffect} from 'react';
import {Image} from '@shopify/hydrogen';

export default function BrandsSlider({loading}) {
  const [SliderComponent, setSliderComponent] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    Promise.all([
      import('react-slick'),
    ]).then(([{default: Slider}]) => {
      setSliderComponent(() => Slider);
    });
  }, []);

  const brands = [
    {
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/bacardi.png?v=1665641433',
      alt: 'Bacardi Logo',
      className: 'w-full h-auto',
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/absolut.svg?v=1665641423',
      alt: 'Absolut Logo',
      className: 'w-full h-auto pt-8',
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/johnnie.svg?v=1665641433',
      alt: 'Johnnie Logo',
      className: 'w-full h-auto',
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/baileys.svg?v=1665641433',
      alt: 'Baileys Logo',
      className: 'w-full h-auto pt-8',
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/jaegermeister.svg?v=1665641436',
      alt: 'Jaegermeister Logo',
      className: 'w-full h-auto',
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/smirnoff.svg?v=1665641433',
      alt: 'Smirnoff Logo',
      className: 'w-full h-auto',
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/captain.svg?v=1665641433',
      alt: 'Captain Logo',
      className: 'w-full h-auto',
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/malibu.webp?v=1666878497',
      alt: 'Malibu Logo',
      className: 'w-[50%] h-[50%] mt-4 rounded-full overflow-hidden',
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/jack.svg?v=1665641433',
      alt: 'Jack Daniels Logo',
      className: 'w-full h-auto',
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/julio.png?v=1665641433',
      alt: 'Julio Logo',
      className: 'w-full h-auto pt-4',
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/jimador.png?v=1665641433',
      alt: 'Jimador Logo',
      className: 'w-full h-auto',
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/cuervo.webp?v=1668053783',
      alt: 'Cuervo Logo',
      className: 'w-full h-auto rounded-full overflow-hidden',
    },
    {
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/johnbar.png?v=1665641433',
      alt: 'Johnbar Logo',
      className: 'w-full h-auto',
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 12,
    slidesToScroll: 6,
    autoplay: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 8.25,
          slidesToScroll: 8.25,
          autoplay: false,
          centerMode: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4.25,
          slidesToScroll: 4.25,
          autoplay: false,
          centerMode: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3.25,
          slidesToScroll: 3.25,
          autoplay: false,
          centerMode: false,
        },
      },
    ],
  };

  // SSR fallback: render brand logos as a static flex row
  if (!SliderComponent) {
    return (
      <div className="w-full relative overflow-hidden max-w-[1920px] mx-auto">
        <div className="flex py-2 lg:py-12 overflow-x-hidden">
          {brands.slice(0, 6).map((brand) => (
            <div
              key={brand.alt}
              className={`${brand.className} cursor-pointer in-view hover:translate-y-[-4px] transform transition-all duration-150 ease-linear`}
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
    );
  }

  return (
    <div className="w-full relative overflow-hidden max-w-[1920px] mx-auto">
      <SliderComponent
        {...settings}
        className="overflow-x-scroll scrollbar-hide flex py-2 lg:py-12"
      >
        {brands.map((brand) => (
          <div
            key={brand.alt}
            className={`${brand.className} cursor-pointer in-view hover:translate-y-[-4px] transform transition-all duration-150 ease-linear`}
          >
            <Image
              loaderOptions={{crop: 'center', scale: 2}}
              width={200}
              height={200}
              alt={brand.alt}
              // @ts-ignore Stock type has `src` as optional
              src={brand.src}
              loading={loading}
            />
          </div>
        ))}
      </SliderComponent>
    </div>
  );
}
