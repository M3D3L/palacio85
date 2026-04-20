import {Suspense} from 'react';
import {
  gql,
  ProductOptionsProvider,
  Seo,
  ShopifyAnalyticsConstants,
  useLocalization,
  useRouteParams,
  useServerAnalytics,
  useShopQuery,
} from '@shopify/hydrogen';

import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {getExcerpt} from '~/lib/utils';
import {NotFound, Layout, ProductSwimlane} from '~/components/index.server';
import {
  Heading,
  ProductDetail,
  ProductForm,
  ProductGallery,
  Section,
  Text,
} from '~/components';

import FadeInViewWrapper from '../../components/FadeInViewWrapper.client';

export default function Product() {
  const {handle} = useRouteParams();
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {
    data: {product, shop},
  } = useShopQuery({
    query: PRODUCT_QUERY,
    variables: {
      country: countryCode,
      language: languageCode,
      handle,
    },
    preload: true,
  });

  if (!product) {
    return <NotFound type="product" />;
  }

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.product,
      resourceId: product.id,
    },
  });

  const {media, title, vendor, descriptionHtml, id} = product;
  const {shippingPolicy, refundPolicy} = shop;

  return (
    <Layout>
      <Suspense>
        <Seo type="product" data={product} />
      </Suspense>
      <ProductOptionsProvider data={product}>
        <Section padding="x" className="px-0">
          <div className="flex md:flex-row flex-col w-full max-w-[1920px] mx-auto">
            <div className="md:w-1/2 lg:w-2/5 w-full m-auto h-auto inline-block">
              <ProductGallery media={media.nodes} />
            </div>

            <div className="sticky px-4 m-auto w-full md:w-1/2 lg:w-3/5">
              <section className="flex flex-col w-full max-w-xl md:mx-auto md:max-w-sm md:px-0">
                <div className="grid lg:pt-8 md:gap-2">
                  <Heading
                    as="h1"
                    className="whitespace-normal text-2xl md:text-3xl"
                  >
                    {title}
                  </Heading>
                  {/* {vendor && (
                    <Text className={'opacity-50 font-medium'}>{vendor}</Text>
                  )} */}
                </div>
                <ProductForm />
                <div className="grid py-4">
                  {descriptionHtml && (
                    <ProductDetail
                      title="Detalles del producto"
                      content={descriptionHtml}
                    />
                  )}
                  {shippingPolicy?.body && (
                    <ProductDetail
                      title="Envio"
                      content={getExcerpt(shippingPolicy.body)}
                      learnMore={`/policies/${shippingPolicy.handle}`}
                    />
                  )}
                  {refundPolicy?.body && (
                    <ProductDetail
                      title="Devoluciones"
                      content={getExcerpt(refundPolicy.body)}
                      learnMore={`/policies/${refundPolicy.handle}`}
                    />
                  )}
                </div>
              </section>
            </div>
          </div>
        </Section>
        <Suspense>
          <FadeInViewWrapper>
            <div className="max-w-[1920px] mx-auto">
              <ProductSwimlane
                title="Productos Relacionados"
                color={'#db162f'}
                data={id}
              />
            </div>
          </FadeInViewWrapper>
        </Suspense>
      </ProductOptionsProvider>
    </Layout>
  );
}

const PRODUCT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      descriptionHtml
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      variants(first: 100) {
        nodes {
          id
          availableForSale
          selectedOptions {
            name
            value
          }
          image {
            id
            url
            altText
            width
            height
          }
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
          sku
          title
          unitPrice {
            amount
            currencyCode
          }
        }
      }
      seo {
        description
        title
      }
    }
    shop {
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
`;
