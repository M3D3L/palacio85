import {Image, Link} from '@shopify/hydrogen';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function BannerSliderMobile({loading}) {
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

  return (
    <Slider {...settings} className="scrollbar-hide overflow-x-scroll">
      <div className="aspect-auto min-w-[100%] w-full lg:hidden">
        <Link to={`/collections/Whiskey`} className="grid">
          <Image
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={1920}
            height={700}
            alt="whiskey banner"
            // @ts-ignore Stock type has `src` as optional
            src={Banner1Mobile}
            loading={loading}
          />
        </Link>
      </div>
      <div className="aspect-auto min-w-[100%] w-full lg:hidden">
        <Link
          to={`/products/la-santa-24k-tequila?tama%25C3%25B1o=750%2520ml`}
          className="grid"
        >
          <Image
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={1920}
            height={700}
            alt="La Santa Tequila Banner"
            // @ts-ignore Stock type has `src` as optional
            src={Banner2Mobile}
            loading={loading}
          />
        </Link>
      </div>
      <div className="aspect-auto min-w-[100%] w-full lg:hidden">
        <Link to={`/collections/all`} className="grid">
          <Image
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={1920}
            height={700}
            alt="vinos banner"
            // @ts-ignore Stock type has `src` as optional
            src={Banner3Mobile}
            loading={loading}
          />
        </Link>
      </div>
    </Slider>
  );
}
