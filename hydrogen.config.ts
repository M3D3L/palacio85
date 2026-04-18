import {defineConfig, CookieSessionStorage} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: ({env}) => ({
    defaultCountryCode: 'MX',
    defaultLanguageCode: 'ES',
    // These 'env' values pull directly from the list you see in Shopify Admin
    storeDomain: env.PUBLIC_STORE_DOMAIN || 'palacio85.myshopify.com',
    storefrontToken:
      env.PUBLIC_STOREFRONT_API_TOKEN || '5353a2766a3513847f02be6445e5301d',
    storefrontApiVersion: env.PUBLIC_STOREFRONT_API_VERSION || '2022-07',
  }),
  session: CookieSessionStorage('__session', {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24 * 30,
  }),
});
