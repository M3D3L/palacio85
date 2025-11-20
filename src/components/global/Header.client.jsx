import {Link, useUrl, useCart, Image} from '@shopify/hydrogen';
import {useWindowScroll} from 'react-use';

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
 * A client component that specifies the content of the header on the website
 */
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

  const styles = {
    button: 'relative flex items-center justify-center w-8 h-8',
    container: `${
      isHome
        ? 'bg-contrast/60 text-primary shadow-darkHeader'
        : 'bg-contrast/80 text-primary'
    } ${
      y > 50 && !isHome ? 'shadow-lightHeader ' : ''
    }flex lg:hidden items-center h-nav sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 px-4 md:px-8`,
  };

  const logo =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/85logo.png?v=1665643264';

  return (
    <header role="banner" className={styles.container}>
      <div className="flex items-center justify-start w-full gap-4">
        <button
          className="flex flex-col items-center justify-center h-8 w-8 relative"
          onClick={openMenu}
        >
          <IconMenu className="h-12 w-11 text-red-600 absolute z-0" />
          <p className="z-10">Mas</p>
        </button>
        <form
          action={`/${countryCode ? countryCode + '/' : ''}search`}
          className="items-center gap-2 sm:flex"
        >
          <button type="submit" className={styles.button}>
            <IconSearch />
          </button>
          <Input
            className={
              isHome ? 'focus:border-primary/20' : 'focus:border-primary/20'
            }
            type="search"
            variant="minisearch"
            placeholder="Búsqueda"
            name="q"
          />
        </form>
      </div>

      <Link
        className="flex items-center self-stretch leading-[3rem] md:leading-[4rem] justify-center flex-grow w-full h-full"
        to="/"
      >
        <Heading
          className="font-bold text-center font-texas text-xl flex"
          as={isHome ? 'h1' : 'h2'}
        >
          <div className="flex flex-row">
            <div className="mt-[0.23rem]">Palacio</div>
            <Image
              className="w-7 h-7"
              loaderOptions={{
                crop: 'center',
                scale: 2,
              }}
              width={50}
              height={50}
              alt="all products"
              src={logo}
              loading={loading}
            />
          </div>
        </Heading>
      </Link>
      <div className="flex items-center justify-end w-full gap-4">
        <Link to={'/account'} className={styles.button}>
          <IconAccount />
        </Link>
        <button onClick={openCart} className={styles.button}>
          <IconBag />
          <CartBadge />
        </button>
      </div>
    </header>
  );
}
function DesktopHeader({countryCode, isHome, loading, openCart}) {
  const gin =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/Gin.png?v=1665642190';
  const wine =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/Wine.png?v=1665642189';
  const all =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/All.png?v=1665642189';
  const digestivos =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/Digestivo.png?v=1665642189';
  const vodka =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/Vodka.png?v=1665642189';
  const whiskey =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/Whiskey.png?v=1665642190';
  const tequila =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/Tequila.png?v=1665642189';
  const cognac =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/Cognac.png?v=1665642189';

  const {y} = useWindowScroll();

  const styles = {
    button:
      'relative flex items-center justify-center w-8 h-8 focus:ring-primary/5',
    container: `${
      isHome
        ? 'bg-contrast/60 text-primary shadow-darkHeader'
        : 'bg-contrast/80 text-primary'
    } ${
      y > 50 && !isHome ? 'shadow-lightHeader ' : ''
    }hidden h-nav lg:flex items-center bg-opacity-10 sticky transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8 px-12 py-8`,
  };

  const logo =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/85logo.png?v=1665643264';

  return (
    <header role="banner" className={styles.container}>
      <div className="flex gap-12 w-full">
        <Link className={`font-bold`} to="/">
          <div className="flex flex-row mt-2">
            <p className="lg:text-3xl xl:text-4xl mr-2 mt-2 font-texas tracking-widest neonText font-light text-red-600">
              Palacio
            </p>
            <Image
              className="w-10 h-10 mt-1"
              loaderOptions={{
                crop: 'center',
                scale: 2,
              }}
              width={100}
              height={100}
              alt="all products"
              src={logo}
              loading={loading}
            />
          </div>
        </Link>
        <nav className="flex justify-evenly py-1 w-full">
          {/* List of all the Collections */}
          <Link
            to={'/collections/all'}
            className="flex justify-center flex-col opacity-90 group hover:opacity-100 transition-all duration-150 ease-in-out"
          >
            <Image
              className="w-10 h-10 mb-[0.2rem] mx-auto"
              loaderOptions={{
                crop: 'center',
                scale: 2,
              }}
              width={100}
              height={100}
              alt="all products"
              // @ts-ignore Stock type has `src` as optional
              src={all}
              loading={loading}
            />
            <p className="text-sm">Todos</p>
          </Link>
          {whiskey && (
            <Link
              to={'/collections/Whiskey'}
              className="group opacity-90 hover:opacity-100 text-white flex-col justify-center transition-all duration-150 ease-in-out"
            >
              <Image
                className="w-7 h-7 mt-2 mb-[0.35rem] mx-auto"
                loaderOptions={{
                  crop: 'center',
                  scale: 2,
                }}
                width={400}
                height={400}
                alt="whiskey"
                // @ts-ignore Stock type has `src` as optional
                src={whiskey}
                loading={loading}
              />
              <p className="text-sm mt-1">Whiskey</p>
            </Link>
          )}
          {gin && (
            <Link
              to={'/collections/Ginebra'}
              className="group opacity-90 hover:opacity-100 text-white flex-col flex justify-center transition-all duration-150 ease-in-out"
            >
              <Image
                className="w-5 h-9 mb-1 mx-auto"
                loaderOptions={{
                  crop: 'center',
                  scale: 2,
                }}
                width={400}
                height={400}
                alt="ginebra"
                // @ts-ignore Stock type has `src` as optional
                src={gin}
                loading={loading}
              />
              <p className="text-sm">Ginebra</p>
            </Link>
          )}
          {vodka && (
            <Link
              to={'/collections/Tequila'}
              className="group opacity-90 hover:opacity-100 flex flex-col justify-center transition-all duration-150 ease-in-out"
            >
              <Image
                className="w-10 h-10 mx-auto"
                loaderOptions={{
                  crop: 'center',
                  scale: 2,
                }}
                width={100}
                height={100}
                alt="tequila"
                // @ts-ignore Stock type has `src` as optional
                src={tequila}
                loading={loading}
              />
              <p className="text-sm">Tequila</p>
            </Link>
          )}
          {/* <Link
            to={'/collections/Ginebra'}
            className="group opacity-90 hover:opacity-100 text-white flex-col flex justify-center transition-all duration-150 ease-in-out"
          >
            <Image
              className="w-6 h-6 mt-2  mb-2 transform mx-auto group-hover:animate-bounce"
              loaderOptions={{
                crop: 'center',
                scale: 2,
              }}
              width={400}
              height={400}
              alt="cognac"
              // @ts-ignore Stock type has `src` as optional
              src={cognac}
              loading={loading}
            />
            <p className="text-sm">Cognac</p>
          </Link> */}
          {vodka && (
            <Link
              to={'/collections/Vodka'}
              className="group opacity-90 hover:opacity-100 flex flex-col justify-center transition-all duration-150 ease-in-out"
            >
              <Image
                className="w-6 h-7 mb-1 mx-auto mt-1"
                loaderOptions={{
                  crop: 'center',
                  scale: 2,
                }}
                width={100}
                height={100}
                alt="vodka"
                // @ts-ignore Stock type has `src` as optional
                src={vodka}
                loading={loading}
              />
              <p className="text-sm">Vodka</p>
            </Link>
          )}
          {/* List of all the Collections */}
          {/* <Link
            to={'/collections/Vino'}
            className="flex justify-center flex-col group transition-all duration-150 ease-in-out opacity-90 hover:opacity-100"
          >
            <Image
              className="w-8 h-8 mb-2 group-hover:animate-bounce mx-auto transform"
              loaderOptions={{
                crop: 'center',
                scale: 2,
              }}
              width={100}
              height={100}
              alt="wine"
              // @ts-ignore Stock type has `src` as optional
              src={wine}
              loading={loading}
            />
            <p className="text-sm">Vinos</p>
          </Link> */}
          {digestivos && (
            <Link
              to={'/collections/vino'}
              className="flex justify-center flex-col group transition-all duration-150 ease-in-out opacity-90 hover:opacity-100"
            >
              <Image
                className="w-8 h-8 mb-1 mx-auto"
                loaderOptions={{
                  crop: 'center',
                  scale: 2,
                }}
                width={100}
                height={100}
                alt="vino"
                // @ts-ignore Stock type has `src` as optional
                src={wine}
                loading={loading}
              />
              <p className="text-sm">Vino</p>
            </Link>
          )}
          {digestivos && (
            <Link
              to={'/collections/Digestivo'}
              className="flex justify-center flex-col group transition-all duration-150 ease-in-out opacity-90 hover:opacity-100"
            >
              <Image
                className="w-5 h-8 mb-1 mx-auto"
                loaderOptions={{
                  crop: 'center',
                  scale: 2,
                }}
                width={100}
                height={100}
                alt="digestivos"
                // @ts-ignore Stock type has `src` as optional
                src={digestivos}
                loading={loading}
              />
              <p className="text-sm">Digestivos</p>
            </Link>
          )}

          <Link
            to={'/collections/Otros'}
            className="flex justify-center flex-col group transition-all duration-150 ease-in-out opacity-90 hover:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 mb-[0.15rem] mt-2 mx-auto"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <p className="text-sm">Otros</p>
          </Link>
        </nav>
      </div>
      <div className="flex items-center gap-1">
        <form
          action={`/${countryCode ? countryCode + '/' : ''}search`}
          className="flex items-center gap-2"
        >
          <button type="submit" className={styles.button}>
            <IconSearch />
          </button>
        </form>
        <Link to={'/account'} className={styles.button}>
          <IconAccount />
        </Link>
        <button onClick={openCart} className={styles.button}>
          <IconBag />
          <CartBadge />
        </button>
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
    <>
      <div
        className={`absolute z-0 bottom-1 right-1 animate-ping transform text-[1rem] bg-red-600 font-medium subpixel-antialiased h-6 w-6 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full px-[0.125rem] pb-px`}
      ></div>
      <div
        className={`absolute bottom-1 z-10 right-1 text-[1rem] bg-red-600 font-medium subpixel-antialiased h-6 w-6 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full px-[0.125rem] pb-px`}
      >
        <span>{totalQuantity}</span>
      </div>
    </>
  );
}
