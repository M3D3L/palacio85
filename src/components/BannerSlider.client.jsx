import {useState, useEffect} from 'react';
import {Image, Link} from '@shopify/hydrogen';

export default function BannerSlider({loading, banners}) {
  const [SliderComponent, setSliderComponent] = useState(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    import('react-slick').then(({ default: Slider }) => {
      setSliderComponent(() => Slider);
    });
  }, []);

  const Banner1 = banners[0];
  const Banner2 = banners[1];
  const Banner3 = banners[2];

  const slides = [
    {to: '/collections/Whiskey', src: Banner2, alt: 'Banner Whiskey'},
    {
      to: '/products/la-santa-24k-tequila?tama%25C3%25B1o=750%2520ml',
      src: Banner1,
      alt: 'Banner Vinos',
    },
    {to: '/collections/All', src: Banner3, alt: 'La Santa Tequila Banner'},
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
  };

  if (!SliderComponent) {
    return (
      <div
        className="aspect-auto min-w-[100%] in-view w-full"
        style={{minHeight: '400px'}}
      >
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
    <SliderComponent {...settings} className="scrollbar-hide">
      {slides.map((slide) => (
        <div key={slide.to} className="aspect-auto min-w-[100%] in-view w-full">
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
