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

  const {
    image,
    priceV2: price,
    compareAtPriceV2: compareAtPrice,
  } = flattenConnection(cardData?.variants)[0] || {};

  return (
    <Link to={`/products/${product.handle}`} onClick={onClick}>
      <div className="group relative flex flex-col h-full rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/20 hover:-translate-y-1">
        {/* Image area */}
        <div className="relative aspect-[3/4] overflow-hidden bg-black/20">
          {image && (
            <Image
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loaderOptions={{
                crop: 'center',
                scale: 2,
                width: 320,
                height: 400,
              }}
              data={image}
              alt={image.altText || `Picture of ${product.title}`}
              loading={loading}
            />
          )}

          {/* Discount badge */}
          {isDiscounted(price, compareAtPrice) && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
              OFERTA
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Quick buy button - appears on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button className="w-full py-2 bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded-lg transition-colors duration-150 flex items-center justify-center gap-2">
              <span className="group-hover:hidden">COMPRA 🍺</span>
              <span className="hidden group-hover:inline">¡FIESTA! 🍻</span>
            </button>
          </div>
        </div>

        {/* Info area */}
        <div className="flex flex-col gap-1 p-3">
          <h3 className="text-white text-sm font-medium truncate leading-snug">
            {product.title}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white font-bold text-sm">
              <Money withoutTrailingZeros data={price} />
            </span>
            {isDiscounted(price, compareAtPrice) && (
              <CompareAtPrice
                className="text-white/40 text-xs line-through"
                data={compareAtPrice}
              />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function CompareAtPrice({data, className}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  return (
    <span className={className}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
