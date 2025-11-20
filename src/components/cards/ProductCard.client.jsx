import clsx from 'clsx';
import {
  flattenConnection,
  Image,
  Link,
  Money,
  useMoney,
} from '@shopify/hydrogen';

import {Text} from '~/components';
import {isDiscounted} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';

export function ProductCard({product, loading, onClick}) {
  const cardData = product?.variants ? product : getProductPlaceholder();
  const splash = 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/splash.webp?v=1666879261';

  const {
    image,
    priceV2: price,
    compareAtPriceV2: compareAtPrice,
  } = flattenConnection(cardData?.variants)[0] || {};

  return (
    <Link to={`/products/${product.handle}`}>
      <div
        className={`group h-auto px-2 pb-2 group mx-auto pt-4 w-full mt-2 transition-all duration-150 hover:translate-y-[-0.5rem] transform shadow-lg rounded-[.25rem]`}
      >
        <div className="aspect-[4/5] relative h-auto">
          {image && (
            <div
              className={`border-white group-hover:border-red-600 shadow-white group-hover:shadow-red-800 shadow-lg  border-2 rounded-sm p-1`}
            >
              <div
                className={`border-white overflow-hidden group-hover:bg-red-600 group-hover:border-red-600 glassmorph duration-150 relative transition-all ease-out rounded-sm border`}
              >
                <Image
                  className="ml-4 absolute z-0"
                  loaderOptions={{
                    crop: 'center',
                    scale: 2,
                  }}
                  width={400}
                  height={400}
                  // @ts-ignore Stock type has `src` as optional
                  src={splash}
                  alt="efecto splash"
                  loading={loading}
                />
                <Image
                  className="aspect-[4/5] w-full fadeIn object-cover z-10 opacity-100 relative"
                  loaderOptions={{
                    crop: 'center',
                    scale: 2,
                    width: 320,
                    height: 400,
                  }}
                  // @ts-ignore Stock type has `src` as optional
                  data={image}
                  alt={image.altText || `Picture of ${product.title}`}
                  loading={loading}
                />
              </div>
            </div>
          )}
        </div>
        <div className="grid gap-1 text-center">
          <Text
            className="w-full overflow-hidden mt-6 whitespace-nowrap text-ellipsis font-saira text-center"
            as="h3"
          >
            {product.title}
          </Text>

          <div className="flex gap-4 justify-center">
            <Text className="flex gap-4 ">
              <Money withoutTrailingZeros data={price} />
              {isDiscounted(price, compareAtPrice) && (
                <CompareAtPrice
                  className={'opacity-50'}
                  data={compareAtPrice}
                />
              )}
            </Text>
          </div>
          <div className="w-full flex justify-center">
            <button className="lg:w-48 px-4 flex py-1 rounded-md h-9 bg-red-600 shadow-red-800 font-bold transition-all  duration-150 justify-center text-sm shadow-md mt-2">
              <span className="group-hover:hidden mt-[0.3rem]">COMPRA</span>
              <span className="group-hover:flex hidden mt-[0.3rem]">
                ¡FIESTA!
              </span>

              <span className="group-hover:hidden text-xl -mt-[.15rem]">
                🍺
              </span>
              <span className="group-hover:block hidden text-2xl -mt-[.15rem]">
                🍻
              </span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

function CompareAtPrice({data, className}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
