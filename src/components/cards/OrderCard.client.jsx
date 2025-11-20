import {Image, Link, flattenConnection} from '@shopify/hydrogen';

import {Heading, Text} from '~/components';
import {statusMessage} from '~/lib/utils';

export function OrderCard({order}) {
  if (!order?.id) return null;
  const legacyOrderId = order.id.split('/').pop().split('?')[0];
  const lineItems = flattenConnection(order?.lineItems);
  const splash = 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/splash.webp?v=1666879261';

  return (
    <li className="grid text-center border rounded">
      <Link
        className="grid items-center gap-4 p-4 md:gap-6 md:p-6 md:grid-cols-2"
        to={`/account/orders/${legacyOrderId}`}
      >
        {lineItems[0].variant?.image && (
          <div className="card-image aspect-square bg-primary/5">
            <Image
              width={168}
              height={168}
              widths={[168]}
              className="w-full fadeIn cover z-0"
              alt="splash effect"
              // @ts-expect-error Stock line item variant image type has `url` as optional
              data={splash}
              loaderOptions={{scale: 2, crop: 'center'}}
            />
            <Image
              width={168}
              height={168}
              widths={[168]}
              className="w-full fadeIn cover z-10"
              alt={lineItems[0].variant?.image?.altText ?? 'Order image'}
              // @ts-expect-error Stock line item variant image type has `url` as optional
              data={lineItems[0].variant?.image}
              loaderOptions={{scale: 2, crop: 'center'}}
            />
          </div>
        )}
        <div
          className={`flex-col justify-center text-left ${
            !lineItems[0].variant?.image && 'md:col-span-2'
          }`}
        >
          <Heading as="h3" format size="copy">
            {lineItems.length > 1
              ? `${lineItems[0].title} +${lineItems.length - 1} more`
              : lineItems[0].title}
          </Heading>
          <dl className="grid grid-gap-1">
            <dt className="sr-only">ID de la Orden</dt>
            <dd>
              <Text size="fine" color="subtle">
                No. de orden {order.orderNumber}
              </Text>
            </dd>
            <dt className="sr-only">Fecha de la orden</dt>
            <dd>
              <Text size="fine" color="subtle">
                {new Date(order.processedAt).toDateString()}
              </Text>
            </dd>
            <dt className="sr-only">Estado de la órden</dt>
            <dd className="mt-2">
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  order.fulfillmentStatus === 'FULFILLED'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-primary/5 text-primary/50'
                }`}
              >
                <Text size="fine">
                  {statusMessage(order.fulfillmentStatus)}
                </Text>
              </span>
            </dd>
          </dl>
        </div>
      </Link>
      <div className="self-end border-t">
        <Link
          className="block w-full p-2 text-center"
          to={`/account/orders/${legacyOrderId}`}
        >
          <Text color="subtle" className="ml-3">
            Ver Detalles
          </Text>
        </Link>
      </div>
    </li>
  );
}
