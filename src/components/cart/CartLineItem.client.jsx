import {
  useCart,
  useCartLine,
  CartLineQuantityAdjustButton,
  CartLinePrice,
  CartLineQuantity,
  Image,
  Link,
} from '@shopify/hydrogen';

import {IconRemove, Text} from '~/components';

export function CartLineItem() {
  const {linesRemove} = useCart();
  const {id: lineId, quantity, merchandise} = useCartLine();

  return (
    <li key={lineId} className="flex items-start gap-4 py-4">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <Image
          width={112}
          height={112}
          widths={[112]}
          data={merchandise.image}
          loaderOptions={{
            scale: 2,
            crop: 'center',
          }}
          className="object-cover object-center w-24 h-24 border border-contrast/10 rounded-xl bg-contrast/[0.03] md:w-28 md:h-28"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between flex-grow min-h-[96px] md:min-h-[112px]">
        <div className="flex justify-between items-start gap-4">
          <div className="grid gap-1">
            <Link
              to={`/products/${merchandise.product.handle}`}
              className="group"
            >
              <h3 className="text-base font-bold leading-snug transition-colors group-hover:text-primary/70">
                {merchandise.product.title}
              </h3>
            </Link>

            {/* Options Labels */}
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {(merchandise?.selectedOptions || []).map((option) => (
                <p
                  key={option.name}
                  className="text-xs text-contrast/60 uppercase tracking-wider"
                >
                  {option.name}:{' '}
                  <span className="text-contrast">{option.value}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="text-right">
            <Text className="font-semibold text-base">
              <CartLinePrice as="span" />
            </Text>
          </div>
        </div>

        {/* Quantity and Actions */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <CartLineQuantityAdjust lineId={lineId} quantity={quantity} />

            <button
              type="button"
              onClick={() => linesRemove([lineId])}
              className="flex items-center justify-center p-2 text-contrast/40 hover:text-red-500 transition-colors"
            >
              <span className="sr-only">Remover</span>
              <IconRemove aria-hidden="true" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

function CartLineQuantityAdjust({lineId, quantity}) {
  return (
    <div className="flex items-center bg-contrast/[0.05] rounded-lg p-1 border border-contrast/10">
      <label htmlFor={`quantity-${lineId}`} className="sr-only">
        Cantidad, {quantity}
      </label>

      <CartLineQuantityAdjustButton
        adjust="decrease"
        aria-label="Decrease quantity"
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all disabled:opacity-30"
      >
        <span className="text-lg leading-none">&#8722;</span>
      </CartLineQuantityAdjustButton>

      <CartLineQuantity
        as="div"
        className="px-3 text-sm font-medium tabular-nums min-w-[2rem] text-center"
      />

      <CartLineQuantityAdjustButton
        adjust="increase"
        aria-label="Increase quantity"
        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all disabled:opacity-30"
      >
        <span className="text-lg leading-none">&#43;</span>
      </CartLineQuantityAdjustButton>
    </div>
  );
}
