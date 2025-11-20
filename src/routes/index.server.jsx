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
import {} from '~/lib/placeholders';
import {FeaturedCollections} from '~/components';
import {Layout, ProductSwimlane} from '~/components/index.server';
import BannerSlider from '../components/BannerSlider.client';
import BannerSliderMobile from '../components/BannerSliderMobile.client';
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
const primaryColor = '#f13030';
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
    ginebraProducts,
    whiskeyProducts,
  } = data;

  return (
    <div className="w-full h-full relative overflow-x-hidden max-w-[1920px] mx-auto">

      <div>
        <BannerSlider banners={[Banner1, Banner2, Banner3]} />
      </div>
   
      <BrandsSlider />

      <ProductSwimlane
        data={featuredProducts.nodes}
        title="en tendencia"
        divider=""
      />

      <div className="w-full mt-8 flex flex-row">
        <FeaturedCollections
          data={featuredCollections.nodes}
          title="colecciones"
        />
      </div>

      <div className="mt-16">
        <ProductSwimlane
          data={tequilaProducts.nodes}
          title="tequila"
          divider=""
        />
      </div>

      <div className="mt-16">
        <MixodologiaSlider />
      </div>
      <div className="mt-16">
        <ProductSwimlane
          data={whiskeyProducts.nodes}
          title="whiskey"
          divider=""
        />
      </div>

      <div className="mt-16">
        <ProductSwimlane data={vinoProducts.nodes} title="Vinos" divider="" />
      </div>
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
        titleTemplate: '%s ·  De Cuidad Obregón',
      }}
    />
  );
}

/**
 * The homepage content query includes a request for custom metafields inside the alias
 * `heroBanners`. The template loads placeholder content if these metafields don't
 * exist. Define the following five custom metafields on your Shopify store to override placeholders:
 * - hero.title             Single line text
 * - hero.byline            Single line text
 * - hero.cta               Single line text
 * - hero.spread            File
 * - hero.spread_seconary   File
 *
 * @see https://help.shopify.com/manual/metafields/metafield-definitions/creating-custom-metafield-definitions
 * @see https://github.com/Shopify/hydrogen/discussions/1790
 */

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
    ginebraProducts: products(first: 12, query: "tag:ginebra") {
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
