import {Suspense} from 'react';
import {
  CacheLong,
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useLocalization,
  useShopQuery,
} from '@shopify/hydrogen';

import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {FeaturedCollections} from '~/components';
import {Layout, ProductSwimlane} from '~/components/index.server';
import BannerSlider from '../components/BannerSlider.client';
import BrandsSlider from '../components/BrandsSlider.client';
import MixodologiaSlider from '../components/MixodologiaSlider.client';
import AgePopup from '../components/AgePopup.client';
import FadeInViewWrapper from '../components/FadeInViewWrapper.client';

const Banner1 =
  'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/Banner1.webp?v=1666850023';
const Banner2 =
  'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/Banner2.webp?v=1666849638';
const Banner3 =
  'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/Banner3.webp?v=1666850127';

export default function Homepage() {
  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.home,
    },
  });

  return (
    <>
      <AgePopup />
      <Layout>
        <Suspense>
          <SeoForHomepage />
        </Suspense>
        <Suspense>
          <FadeInViewWrapper>
            <HomepageContent />
          </FadeInViewWrapper>
        </Suspense>
      </Layout>
    </>
  );
}

function HomepageContent() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery({
    query: HOMEPAGE_CONTENT_QUERY,
    variables: {
      language: languageCode,
      country: countryCode,
    },
    preload: true,
  });

  const {
    featuredCollections,
    featuredProducts,
    vinoProducts,
    tequilaProducts,
    whiskeyProducts,
  } = data;

  return (
    <div className="w-full h-full relative overflow-x-hidden max-w-[1920px] mx-auto">
      {/* Hero Banner */}
      <BannerSlider banners={[Banner1, Banner2, Banner3]} />

      {/* Brands */}
      <div className="py-4 border-y border-white/10">
        <BrandsSlider />
      </div>

      {/* Featured Products */}
      <section className="mt-12">
        <ProductSwimlane
          data={featuredProducts.nodes}
          title="en tendencia"
          divider=""
        />
      </section>

      {/* Collections */}
      <section className="mt-12 px-4 md:px-8 lg:px-12">
        <FeaturedCollections
          data={featuredCollections.nodes}
          title="colecciones"
        />
      </section>

      {/* Tequila */}
      <section className="mt-12">
        <ProductSwimlane
          data={tequilaProducts.nodes}
          title="tequila"
          divider=""
        />
      </section>

      {/* Mixología */}
      <section className="mt-12">
        <MixodologiaSlider />
      </section>

      {/* Whiskey */}
      <section className="mt-12">
        <ProductSwimlane
          data={whiskeyProducts.nodes}
          title="whiskey"
          divider=""
        />
      </section>

      {/* Vinos */}
      <section className="mt-12 mb-16">
        <ProductSwimlane data={vinoProducts.nodes} title="vinos" divider="" />
      </section>
    </div>
  );
}

function SeoForHomepage() {
  const {
    data: {
      shop: {name, description},
    },
  } = useShopQuery({
    query: HOMEPAGE_SEO_QUERY,
    cache: CacheLong(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title: name,
        description,
        titleTemplate: '%s · De Cuidad Obregón',
      }}
    />
  );
}

const HOMEPAGE_CONTENT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}
  query homepage($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    heroBanners: collections(
      first: 3
      query: "collection_type:smart"
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        handle
        title
        descriptionHtml
        heading: metafield(namespace: "hero", key: "title") {
          value
        }
        byline: metafield(namespace: "hero", key: "byline") {
          value
        }
        cta: metafield(namespace: "hero", key: "cta") {
          value
        }
        spread: metafield(namespace: "hero", key: "spread") {
          reference {
            ...Media
          }
        }
        spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
          reference {
            ...Media
          }
        }
      }
    }
    featuredCollections: collections(first: 8, sortKey: UPDATED_AT) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
    featuredProducts: products(first: 12) {
      nodes {
        ...ProductCard
      }
    }
    vinoProducts: products(first: 12, query: "tag:vino") {
      nodes {
        ...ProductCard
      }
    }
    whiskeyProducts: products(first: 12, query: "tag:whisky") {
      nodes {
        ...ProductCard
      }
    }
    tequilaProducts: products(first: 12, query: "tag:tequila") {
      nodes {
        ...ProductCard
      }
    }
    allCollections: collections(first: 12) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;

const HOMEPAGE_SEO_QUERY = gql`
  query shopInfo {
    shop {
      name
      description
    }
  }
`;
