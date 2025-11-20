import {useRef} from 'react';
import {useScroll} from 'react-use';
import {fetchSync} from '@shopify/hydrogen';
import {Button, Text, ProductCard, Heading, Skeleton} from '~/components';
import {Suspense} from 'react';

export function CartEmpty({onClose, layout = 'drawer'}) {
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  const container = {
    drawer: `grid content-start gap-4 px-6 pb-8 transition overflow-y-scroll md:gap-12 md:px-12 h-screen-no-nav md:pb-12 ${
      y > 0 ? 'border-t' : ''
    }`,
    page: `grid pb-12 w-full md:items-start gap-4 md:gap-8 lg:gap-12`,
  };

  const topProductsContainer = {
    drawer: '',
    page: 'md:grid-cols-4 sm:grid-col-4',
  };

  return (
    <div ref={scrollRef} className={container[layout]}>
      <section className="grid gap-6">
        <Text format>
          Aún no has agregado productos a tu carrito de compras. Mira los
          productos más vendidos.
        </Text>
        <div>
          <Button
            onClick={onClose}
            className="border-2 border-green-600 hover:translate-y-[-4px] hover:bg-green-600 shadow-green-600 shadow-md transition-all duration-150 ease-in-out transform bg-transparent text-lg rounded-lg px-4 py-2"
          >
            Seguir Comprando
          </Button>
        </div>
      </section>
      <section className="grid gap-8 pt-4">
        <Heading format size="copy">
          Lo mas vendido
        </Heading>
        <div
          className={`flex flex-col justify-center ${topProductsContainer[layout]}`}
        >
          <Suspense fallback={<Loading />}>
            <TopProducts onClose={onClose} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

function TopProducts({onClose}) {
  const products = fetchSync('/api/bestSellers').json();

  if (products.length === 0) {
    return <Text format>No se encontraron productos.</Text>;
  }

  return (
    <>
      {products.map((product) => (
        <ProductCard product={product} key={product.id} onClick={onClose} />
      ))}
    </>
  );
}

function Loading() {
  return (
    <>
      {[...new Array(4)].map((_, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="grid gap-2">
          <Skeleton className="aspect-[3/4]" />
          <Skeleton className="w-32 h-4" />
        </div>
      ))}
    </>
  );
}
