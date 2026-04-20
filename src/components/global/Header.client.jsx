import {useState, useEffect} from 'react';
import {Link, useUrl, useCart, Image} from '@shopify/hydrogen';

import {
  Heading,
  IconAccount,
  IconBag,
  IconMenu,
  IconSearch,
  Input,
} from '~/components';

import {CartDrawer} from './CartDrawer.client';
import {MenuDrawer} from './MenuDrawer.client';
import {useDrawer} from './Drawer.client';

/**
 * Hook to track scroll position for the sticky glass effect
 */
function useWindowScroll() {
  const [y, setY] = useState(0);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = () => setY(window.scrollY);
    window.addEventListener('scroll', handler, {passive: true});
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return {y};
}

export function Header({title, menu}) {
  const {pathname} = useUrl();
  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;
  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();
  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
      <DesktopHeader
        countryCode={countryCode}
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
      />
      <MobileHeader
        countryCode={countryCode}
        isHome={isHome}
        title={title}
        openCart={openCart}
        openMenu={openMenu}
      />
    </>
  );
}

function MobileHeader({
  countryCode,
  title,
  isHome,
  openCart,
  openMenu,
  loading,
}) {
  const {y} = useWindowScroll();
  const logo =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/85logo.png?v=1665643264';

  const containerStyles = `
    sticky top-0 z-40 flex items-center justify-between w-full h-nav px-4 transition-all duration-300
    ${
      y > 50
        ? 'bg-black/80 backdrop-blur-lg shadow-lg border-b border-white/10 text-white'
        : 'bg-transparent text-white'
    }
  `;

  return (
    <header role="banner" className={containerStyles + ' lg:hidden'}>
      {/* 1/3 Left: Menu */}
      <div className="flex items-center w-1/3">
        <button onClick={openMenu} className="p-2 -ml-2 group">
          <IconMenu className="w-6 h-6 transition-transform group-active:scale-90" />
        </button>
      </div>

      {/* 1/3 Center: Branding */}
      <div className="flex items-center justify-center w-1/3">
        <Link to="/" className="flex items-center gap-1">
          <span className="font-texas text-2xl font-bold tracking-tighter">
            Palacio
          </span>
          <Image
            className="w-6 h-6 object-contain invert"
            width={48}
            height={48}
            alt="Logo"
            src={logo}
            loading={loading}
          />
        </Link>
      </div>

      {/* 1/3 Right: Actions */}
      <div className="flex items-center justify-end w-1/3 gap-1">
        <Link to="/search" className="p-2">
          <IconSearch className="w-5 h-5" />
        </Link>
        <button
          onClick={openCart}
          className="relative p-2 flex items-center justify-center"
        >
          <IconBag className="w-6 h-6" />
          <CartBadge />
        </button>
      </div>
    </header>
  );
}

function DesktopHeader({countryCode, isHome, loading, openCart}) {
  const {y} = useWindowScroll();
  const logo =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/85logo.png?v=1665643264';

  const categories = [
    {
      name: 'Todos',
      handle: 'all',
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/All.png?v=1665642189',
    },
    {
      name: 'Whiskey',
      handle: 'Whiskey',
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/Whiskey.png?v=1665642190',
    },
    {
      name: 'Tequila',
      handle: 'Tequila',
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/Tequila.png?v=1665642189',
    },
    {
      name: 'Vodka',
      handle: 'Vodka',
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/Vodka.png?v=1665642189',
    },
    {
      name: 'Vino',
      handle: 'vino',
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/Wine.png?v=1665642189',
    },
    {
      name: 'Digestivos',
      handle: 'Digestivo',
      src: 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/Digestivo.png?v=1665642189',
    },
  ];

  const headerStyles = `
    hidden lg:flex sticky top-0 z-40 items-center justify-between w-full px-12 py-4 transition-all duration-500
    ${
      y > 50
        ? 'bg-black/85 backdrop-blur-xl shadow-2xl h-[80px] text-white'
        : 'bg-transparent h-[100px] text-white'
    }
  `;

  return (
    <header role="banner" className={headerStyles}>
      <div className="flex items-center gap-12 w-full">
        {/* Brand */}
        <Link to="/" className="flex items-center group">
          <span className="text-3xl font-texas font-bold tracking-widest mr-2 transition-colors group-hover:text-red-500">
            Palacio
          </span>
          <Image
            className="w-8 h-8 invert"
            width={64}
            height={64}
            src={logo}
            loading={loading}
          />
        </Link>

        {/* Navigation Grid */}
        <nav className="flex items-center justify-center flex-grow gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.handle}
              to={`/collections/${cat.handle}`}
              className="flex flex-col items-center group"
            >
              <div className="relative w-10 h-10 flex items-center justify-center overflow-hidden">
                <Image
                  src={cat.src}
                  className="w-full h-full object-contain brightness-0 invert transition-transform duration-300 group-hover:scale-110"
                  width={80}
                  height={80}
                />
              </div>
              <span className="text-[10px] uppercase tracking-widest mt-1 opacity-60 group-hover:opacity-100 transition-opacity font-semibold">
                {cat.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6">
          <Link to="/search" className="hover:text-red-500 transition-colors">
            <IconSearch className="w-5 h-5" />
          </Link>
          <Link to="/account" className="hover:text-red-500 transition-colors">
            <IconAccount className="w-5 h-5" />
          </Link>
          <button
            onClick={openCart}
            className="relative group p-1 flex items-center justify-center"
          >
            <IconBag className="w-6 h-6 transition-transform group-hover:-rotate-12" />
            <CartBadge />
          </button>
        </div>
      </div>
    </header>
  );
}

function CartBadge() {
  const {totalQuantity} = useCart();

  if (totalQuantity < 1) {
    return null;
  }

  return (
    <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
      <div className="relative flex items-center justify-center">
        {/* Ping Animation */}
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>

        {/* The Badge */}
        <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white tabular-nums shadow-sm border border-black/10">
          {totalQuantity}
        </span>
      </div>
    </div>
  );
}
