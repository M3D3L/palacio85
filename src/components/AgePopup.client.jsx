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
    <div
      className="age-popup fixed inset-0 z-[1000] flex items-center justify-center transition-all duration-300"
      style={{background: 'rgba(0,0,0,0.97)'}}
    >
      {/* Subtle red glow in background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,38,38,0.08)_0%,_transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-6 max-w-md w-full text-center">
        {/* Logo / Title */}
        <div>
          <p className="text-7xl md:text-8xl text-red-600 font-texas tracking-widest">
            Palacio 85
          </p>
          <p className="text-white/60 text-sm mt-2">De Cuidad Obregón</p>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-red-600/50" />

        {/* Age check */}
        <div>
          <p className="text-white text-lg font-medium mb-1">
            ¿Cuántos años tienes?
          </p>
          <p className="text-white/50 text-sm">
            Este sitio contiene alcohol. Debes ser mayor de 18 años para
            continuar.
          </p>
        </div>

        {/* Promo */}
        <p className="text-white/40 text-xs">
          Envío gratis con el código{' '}
          <span className="text-red-400 font-medium">PalacioOnline</span>
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={slideToLeft}
            className="flex-1 py-3 rounded-xl border border-green-500 text-white font-semibold hover:bg-green-600 hover:border-green-600 transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-green-900/30"
          >
            Tengo +18 años
          </button>
          <button
            onClick={linkToOtherPage}
            className="flex-1 py-3 rounded-xl border border-white/20 text-white/60 font-semibold hover:bg-red-600/20 hover:border-red-500 hover:text-white transition-all duration-200 hover:translate-y-[-2px]"
          >
            Tengo -18 años
          </button>
        </div>
      </div>
    </div>
  );
}
