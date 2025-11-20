import {defineConfig, CookieSessionStorage} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
    defaultCountryCode: 'MX',
    defaultLanguageCode: 'ES',
    storeDomain: 'palacio85.myshopify.com',
    storefrontToken: 'ee41262570cf48c82e8b7b67906bf5db',
    storefrontApiVersion: '2022-07',
  },
  session: CookieSessionStorage('__session', {
    path: '/',
    httpOnly: true,
    secure: import.meta.env.PROD,
    sameSite: 'Strict',
    maxAge: 60 * 60 * 24 * 30,
  }),
});
