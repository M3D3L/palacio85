import {ProductCard} from '~/components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {useRef} from 'react';

export default function SimpleSlider({products}) {
  const sliderRef = useRef(null);
  const handlePrevious = () => {
    sliderRef.current.slickPrev();
  };
  const handleNext = () => {
    sliderRef.current.slickNext();
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    centerMode: false,
    slidesToShow: 6,
    slidesToScroll: 6,
    autoplay: true,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          centerMode: false,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          centerMode: false,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          centerMode: true,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: true,
          autoplay: false,
        },
      },
    ],
  };

  return (
    <div className="relative overflow-x-scroll scrollbar-hide">
      <Slider {...settings} ref={sliderRef}>
        {products.map((product) => (
          <div key={product.id} className="min-w-[150px] in-view">
            <ProductCard product={product} key={product.id} />
          </div>
        ))}
      </Slider>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 shadow-sm shadow-red-700 hover:shadow-md bg-red-500 border border-red-300 w-12 h-12 rounded-full transition-all text-white focus:outline-none hover:text-gray-500 hover:bg-gray-100"
        onClick={handlePrevious}
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
        onClick={handleNext}
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
