import {useRef, useState, useEffect} from 'react';
import {Link, useCart, CartLineProvider, Money} from '@shopify/hydrogen';

import {Button, Text, CartLineItem, CartEmpty} from '~/components';

function useScroll(ref) {
  const [y, setY] = useState(0);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = ref.current;
    if (!el) return;
    const handler = () => setY(el.scrollTop);
    el.addEventListener('scroll', handler, {passive: true});
    return () => el.removeEventListener('scroll', handler);
  }, [ref]);
  return {y};
}

export function CartDetails({layout, onClose}) {
  const {lines} = useCart();
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  if (lines.length === 0) {
    return <CartEmpty onClose={onClose} layout={layout} />;
  }

  const container = {
    drawer: 'grid grid-cols-1 h-screen-no-nav grid-rows-[1fr_auto]',
    page: 'pb-12 grid md:grid-cols-12 md:items-start gap-8 lg:gap-16 max-w-7xl mx-auto w-full',
  };

  const content = {
    drawer:
      'px-6 pb-6 overflow-auto transition-all duration-300 md:px-8 custom-scrollbar',
    page: 'md:col-span-7 lg:col-span-8',
  };

  const summary = {
    drawer:
      'grid gap-4 p-6 border-t border-contrast/10 bg-contrast/[0.02] backdrop-blur-md md:px-8',
    page: 'md:col-span-5 lg:col-span-4 sticky top-[var(--height-nav)] grid gap-8 p-8 bg-contrast/[0.03] border border-contrast/10 rounded-2xl shadow-sm',
  };

  return (
    <form className={container[layout]}>
      <section
        ref={scrollRef}
        aria-labelledby="cart-contents"
        className={`${content[layout]} ${
          y > 0 ? 'border-t border-contrast/10' : ''
        }`}
      >
        <ul className="divide-y divide-contrast/10">
          {lines.map((line) => (
            <li key={line.id} className="py-6 first:pt-0 last:pb-0">
              <CartLineProvider line={line}>
                <CartLineItem />
              </CartLineProvider>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="summary-heading" className={summary[layout]}>
        <h2
          id="summary-heading"
          className="text-lg font-semibold tracking-tight"
        >
          Resumen del pedido
        </h2>
        <OrderSummary />
        <CartCheckoutActions />
      </section>
    </form>
  );
}

function CartCheckoutActions() {
  const {checkoutUrl} = useCart();
  return (
    <div className="grid gap-3">
      {checkoutUrl ? (
        <Link
          to={checkoutUrl}
          prefetch={false}
          target="_self"
          className="w-full"
        >
          <Button
            as="span"
            width="full"
            variant="primary"
            className="group relative overflow-hidden bg-black text-white py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-black/10 active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Finalizar Pedido
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </Button>
        </Link>
      ) : null}
      <p className="text-center text-xs text-contrast/50">
        Impuestos y envío calculados en la pantalla de pago.
      </p>
    </div>
  );
}

function OrderSummary() {
  const {cost} = useCart();
  return (
    <dl className="space-y-3">
      <div className="flex items-center justify-between text-base font-normal text-contrast/70">
        <dt>Subtotal</dt>
        <dd>
          {cost?.subtotalAmount?.amount ? (
            <Money data={cost?.subtotalAmount} />
          ) : (
            '-'
          )}
        </dd>
      </div>
      <div className="pt-4 border-t border-contrast/10 flex items-center justify-between">
        <dt className="text-lg font-bold">Total estimado</dt>
        <dd className="text-lg font-bold">
          {cost?.subtotalAmount?.amount ? (
            <Money data={cost?.subtotalAmount} />
          ) : (
            '-'
          )}
        </dd>
      </div>
    </dl>
  );
}
