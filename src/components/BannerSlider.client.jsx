import {useState, useEffect, Suspense} from 'react';
import {Image, Link} from '@shopify/hydrogen';
// REMOVED: import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function BannerSlider({loading, banners}) {
  const [Slider, setSlider] = useState(null);

  useEffect(() => {
    // This dynamically imports the library ONLY in the browser.
    // The Oxygen worker will never execute this block.
    import('react-slick').then((module) => {
      setSlider(() => module.default);
    });
  }, []);

  const Banner1 = banners[0];
  const Banner2 = banners[1];
  const Banner3 = banners[2];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
  };

  // While loading the library or on the server, show a static placeholder
  if (!Slider) {
    return (
      <div
        className="aspect-auto min-w-[100%] in-view w-full"
        style={{minHeight: '400px'}}
      >
        <Image
          loaderOptions={{crop: 'center', scale: 2}}
          width={1920}
          height={700}
          src={Banner2}
          alt="Loading..."
        />
      </div>
    );
  }

  return (
    <Slider {...settings} className="scrollbar-hide">
      <div className="aspect-auto min-w-[100%] in-view w-full">
        <Link to={`/collections/Whiskey`} className="grid">
          <Image
            loaderOptions={{crop: 'center', scale: 2}}
            width={1920}
            height={700}
            alt="Banner Whiskey"
            src={Banner2}
            loading={loading}
          />
        </Link>
      </div>
      <div className="aspect-auto min-w-[100%] in-view w-full">
        <Link
          to={`/products/la-santa-24k-tequila?tama%25C3%25B1o=750%2520ml`}
          className="grid"
        >
          <Image
            loaderOptions={{crop: 'center', scale: 2}}
            width={1920}
            height={700}
            alt="Banner Vinos"
            src={Banner1}
            loading={loading}
          />
        </Link>
      </div>
      <div className="aspect-auto min-w-[100%] in-view w-full">
        <Link to={`/collections/All`} className="grid">
          <Image
            loaderOptions={{crop: 'center', scale: 2}}
            width={1920}
            height={700}
            alt="La Santa Tequila Banner"
            src={Banner3}
            loading={loading}
          />
        </Link>
      </div>
    </Slider>
  );
}
