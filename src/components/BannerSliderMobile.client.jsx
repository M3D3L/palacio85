import {useState, useEffect} from 'react';
import {Image, Link} from '@shopify/hydrogen';

export default function BannerSliderMobile({loading}) {
  const [SliderComponent, setSliderComponent] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Dynamically import react-slick only on the client
    Promise.all([
      import('react-slick'),
      import('slick-carousel/slick/slick.css'),
      import('slick-carousel/slick/slick-theme.css'),
    ]).then(([{default: Slider}]) => {
      setSliderComponent(() => Slider);
    });
  }, []);

  const Banner1Mobile =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/banner1mobile.webp?v=1666850299';
  const Banner2Mobile =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/banner2mobile.webp?v=1666850306';
  const Banner3Mobile =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/banner3mobile.webp?v=1666881872';

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
  };

  const slides = [
    {
      to: '/collections/Whiskey',
      src: Banner1Mobile,
      alt: 'whiskey banner',
    },
    {
      to: '/products/la-santa-24k-tequila?tama%25C3%25B1o=750%2520ml',
      src: Banner2Mobile,
      alt: 'La Santa Tequila Banner',
    },
    {
      to: '/collections/all',
      src: Banner3Mobile,
      alt: 'vinos banner',
    },
  ];

  // SSR fallback: show first banner statically until JS loads
  if (!SliderComponent) {
    return (
      <div className="aspect-auto min-w-[100%] w-full lg:hidden">
        <Link to={slides[0].to} className="grid">
          <Image
            loaderOptions={{crop: 'center', scale: 2}}
            width={1920}
            height={700}
            alt={slides[0].alt}
            src={slides[0].src}
            loading={loading}
          />
        </Link>
      </div>
    );
  }

  return (
    <SliderComponent {...settings} className="scrollbar-hide overflow-x-scroll">
      {slides.map((slide) => (
        <div
          key={slide.to}
          className="aspect-auto min-w-[100%] w-full lg:hidden"
        >
          <Link to={slide.to} className="grid">
            <Image
              loaderOptions={{crop: 'center', scale: 2}}
              width={1920}
              height={700}
              alt={slide.alt}
              // @ts-ignore Stock type has `src` as optional
              src={slide.src}
              loading={loading}
            />
          </Link>
        </div>
      ))}
    </SliderComponent>
  );
}
