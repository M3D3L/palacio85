import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Image} from '@shopify/hydrogen';

export default function BannerSlider({loading}) {
  const jaegermeister =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/jaegermeister.svg?v=1665641436';
  const malibu =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/malibu.webp?v=1666878497';
  const julio =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/julio.png?v=1665641433';
  const johnnie =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/johnnie.svg?v=1665641433';
  const jimador =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/jimador.png?v=1665641433';
  const jack =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/jack.svg?v=1665641433';
  const johnbar =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/johnbar.png?v=1665641433';
  const cuervo =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/cuervo.webp?v=1668053783';
  const smirnoff =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/smirnoff.svg?v=1665641433';
  const captain =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/captain.svg?v=1665641433';
  const bacardi =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/bacardi.png?v=1665641433';
  const baileys =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/baileys.svg?v=1665641433';
  const absolut =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/absolut.svg?v=1665641423';

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
  return (
    <div className="w-full relative overflow-hidden max-w-[1920px] mx-auto">
      <Slider
        {...settings}
        className="overflow-x-scroll scrollbar-hide flex py-2 lg:py-12"
      >
        <div className="w-full h-auto cursor-pointer in-view hover:translate-y-[-4px] transform transition-all duration-150 ease-linear">
          <Image
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={200}
            height={200}
            alt="Bacardi Logo"
            // @ts-ignore Stock type has `src` as optional
            src={bacardi}
            loading={loading}
          />
        </div>
        <div className="w-full h-auto in-view cursor-pointer pt-8 hover:translate-y-[-4px] transform transition-all duration-150 ease-linear">
          <Image
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={200}
            height={200}
            alt="Absolut Logo"
            // @ts-ignore Stock type has `src` as optional
            src={absolut}
            loading={loading}
          />
        </div>
        <div className="w-full h-auto in-view cursor-pointer hover:translate-y-[-4px] transform transition-all duration-150 ease-linear">
          <Image
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={200}
            height={200}
            alt="Johnnie Logo"
            // @ts-ignore Stock type has `src` as optional
            src={johnnie}
            loading={loading}
          />
        </div>
        <div className="w-full pt-8 in-view h-auto cursor-pointer hover:translate-y-[-4px] transform transition-all duration-150 ease-linear">
          <Image
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={200}
            height={200}
            alt="Baileys Logo"
            // @ts-ignore Stock type has `src` as optional
            src={baileys}
            loading={loading}
          />
        </div>
        <div className="w-full in-view h-auto cursor-pointer hover:translate-y-[-4px] transform transition-all duration-150 ease-linear">
          <Image
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={200}
            height={200}
            alt="Jaegermeister Logo"
            // @ts-ignore Stock type has `src` as optional
            src={jaegermeister}
            loading={loading}
          />
        </div>
        <div className="w-full in-view h-auto cursor-pointer hover:translate-y-[-4px] transform transition-all duration-150 ease-linear">
          <Image
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={200}
            height={200}
            alt="Smirnoff Logo"
            // @ts-ignore Stock type has `src` as optional
            src={smirnoff}
            loading={loading}
          />
        </div>
        <div className="w-full in-view h-auto cursor-pointer hover:translate-y-[-4px] transform transition-all duration-150 ease-linear">
          <Image
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={200}
            height={200}
            alt="Captain Logo"
            // @ts-ignore Stock type has `src` as optional
            src={captain}
            loading={loading}
          />
        </div>
        <div className="w-[50%] in-view h-[50%] mt-4 rounded-full overflow-hidden cursor-pointer hover:translate-y-[-4px] transform transition-all duration-150 ease-linear">
          <Image
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={200}
            height={200}
            alt="React Logo"
            // @ts-ignore Stock type has `src` as optional
            src={malibu}
            loading={loading}
          />
        </div>
        <div className="w-full in-view h-auto cursor-pointer hover:translate-y-[-4px] transform transition-all duration-150 ease-linear">
          <Image
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={200}
            height={200}
            alt="React Logo"
            // @ts-ignore Stock type has `src` as optional
            src={jack}
            loading={loading}
          />
        </div>
        <div className="w-full in-view h-auto pt-4 cursor-pointer hover:translate-y-[-4px] transform transition-all duration-150 ease-linear">
          <Image
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={200}
            height={200}
            alt="React Logo"
            // @ts-ignore Stock type has `src` as optional
            src={julio}
            loading={loading}
          />
        </div>
        <div className="w-full in-view h-auto cursor-pointer hover:translate-y-[-4px] transform transition-all duration-150 ease-linear">
          <Image
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={200}
            height={200}
            alt="React Logo"
            // @ts-ignore Stock type has `src` as optional
            src={jimador}
            loading={loading}
          />
        </div>
        <div className="w-full in-view rounded-full  overflow-hidden h-auto cursor-pointer hover:translate-y-[-4px] transform transition-all duration-150 ease-linear">
          <Image
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={200}
            height={200}
            alt="React Logo"
            // @ts-ignore Stock type has `src` as optional
            src={cuervo}
            loading={loading}
          />
        </div>
        <div className="w-full in-view h-auto cursor-pointer hover:translate-y-[-4px] transform transition-all duration-150 ease-linear">
          <Image
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={200}
            height={200}
            alt="React Logo"
            // @ts-ignore Stock type has `src` as optional
            src={johnbar}
            loading={loading}
          />
        </div>
      </Slider>
    </div>
  );
}
