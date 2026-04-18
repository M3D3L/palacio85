import {useEffect} from 'react';

export default function AgePopup() {
  const slideToLeft = () => {
    if (typeof window === 'undefined') return;
    const popup = document.querySelector('.age-popup');
    if (popup) popup.style.transform = 'translateX(-100%)';
    const body = document.querySelector('body');
    if (body) body.style.overflowY = 'auto';
    document.cookie = 'age-verified=true; max-age=31536000';
  };

  const linkToOtherPage = () => {
    if (typeof window === 'undefined') return;
    alert(
      'Esta tienda es para mayores de 18 años. Si eres menor de edad, por favor, abandona la página.',
    );
    window.location.href = 'https://www.alcoholinformate.org.mx/';
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const body = document.querySelector('body');
    if (body) body.style.overflowY = 'hidden';

    const handleMouseLeave = () => {
      const popup = document.querySelector('.age-popup');
      if (popup) popup.style.display = 'none';
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (body) body.style.overflowY = 'auto';
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="w-full h-screen fixed mx-auto bg-opacity-[96%] bg-black age-popup text-white z-[1000] duration-250 transition-all">
      <div className="w-full h-screen grid content-center fade-in in-view">
        <p className="w-full text-center text-6xl md:text-7xl lg:text-8xl text-red-600 font-texas">
          Palacio 85
        </p>
        <p className="w-full text-center text-sm md:text-base lg:text-lg text-white">
          Envió gratis a tu domicilio con el código de promoción PalacioOnline.
        </p>

        <div className="w-full justify-evenly pt-2 flex mt-16 md:flex-row flex-col gap-4 hide-fade-in mx-auto max-w-md text-base px-4 md:text-xl">
          <button
            className="rounded-full border border-green-600 px-6 py-2 shadow-md shadow-green-900 hover:translate-y-[-2px] hover:bg-green-500 transition-all ease-out"
            onClick={slideToLeft}
          >
            <p>Tengo +18 años</p>
          </button>
          <button
            className="rounded-full border border-red-600 px-6 py-2 shadow-md shadow-red-900 hover:translate-y-[-2px] hover:bg-red-500 transition-all ease-out"
            onClick={linkToOtherPage}
          >
            <p>Tengo -18 años</p>
          </button>
        </div>
      </div>
    </div>
  );
}
