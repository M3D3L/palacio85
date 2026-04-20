import {useCallback} from 'react';
import {useServerProps} from '@shopify/hydrogen';
import typographicBase from 'typographic-base';

/**
 * This is a hack until we have better built-in primitives for
 * causing server components to re-render.
 *
 * @returns function when called will cause the current page to re-render on the server
 */
export function useRenderServerComponents() {
  const {serverProps, setServerProps} = useServerProps();

  return useCallback(() => {
    setServerProps('renderRsc', !serverProps.renderRsc);
  }, [serverProps, setServerProps]);
}

export function missingClass(string, prefix) {
  if (!string) {
    return true;
  }

  const regex = new RegExp(` ?${prefix}`, 'g');
  return string.match(regex) === null;
}

/**
 * Synchronous version of formatText to prevent React Promise errors.
 * Ensures typographic enhancements happen during the render cycle.
 */
export function formatText(input) {
  if (!input || typeof input !== 'string') {
    return input;
  }

  // typographicBase is now called synchronously
  return typographicBase(input, {locale: 'en-us'}).replace(
    /\s([^\s<]+)\s*$/g,
    '\u00A0$1',
  );
}

export function isNewArrival(date, daysOld = 30) {
  return (
    new Date(date).valueOf() >
    new Date().setDate(new Date().getDate() - daysOld).valueOf()
  );
}

export function isDiscounted(price, compareAtPrice) {
  if (compareAtPrice?.amount > price?.amount) {
    return true;
  }
  return false;
}

export function getExcerpt(text) {
  const regex = /<p.*>(.*?)<\/p>/;
  const match = regex.exec(text);
  return match?.length ? match[0] : text;
}

function resolveToFromType(
  {customPrefixes, pathname, type} = {
    customPrefixes: {},
  },
) {
  if (!pathname || !type) return '';

  const defaultPrefixes = {
    BLOG: 'blogs',
    COLLECTION: 'collections',
    COLLECTIONS: 'collections',
    FRONTPAGE: 'frontpage',
    HTTP: '',
    PAGE: 'pages',
    CATALOG: 'collections/all',
    PRODUCT: 'products',
    SEARCH: 'search',
    SHOP_POLICY: 'policies',
  };

  const pathParts = pathname.split('/');
  const handle = pathParts.pop() || '';
  const routePrefix = {
    ...defaultPrefixes,
    ...customPrefixes,
  };

  switch (true) {
    case type === 'FRONTPAGE':
      return '/';

    case type === 'ARTICLE': {
      const blogHandle = pathParts.pop();
      return routePrefix.BLOG
        ? `/${routePrefix.BLOG}/${blogHandle}/${handle}/`
        : `/${blogHandle}/${handle}/`;
    }

    case type === 'COLLECTIONS':
      return `/${routePrefix.COLLECTIONS}`;

    case type === 'SEARCH':
      return `/${routePrefix.SEARCH}`;

    case type === 'CATALOG':
      return `/${routePrefix.CATALOG}`;

    default:
      return routePrefix[type]
        ? `/${routePrefix[type]}/${handle}`
        : `/${handle}`;
  }
}

function parseItem(customPrefixes = {}) {
  return function (item) {
    if (!item?.url || !item?.type) {
      console.warn(
        'Elemento de menú no válido. Debe incluir una URL y un tipo.',
      );
      return;
    }

    const {pathname} = new URL(item.url);
    const isInternalLink = /\.myshopify\.com/g.test(item.url);

    const parsedItem = isInternalLink
      ? {
          ...item,
          isExternal: false,
          target: '_self',
          to: resolveToFromType({type: item.type, customPrefixes, pathname}),
        }
      : {
          ...item,
          isExternal: true,
          target: '_blank',
          to: item.url,
        };

    return {
      ...parsedItem,
      items: item.items?.map(parseItem(customPrefixes)),
    };
  };
}

export function parseMenu(menu, customPrefixes = {}) {
  if (!menu?.items) {
    console.warn('Menú no válido pasado a parseMenu');
    return menu;
  }

  return {
    ...menu,
    items: menu.items.map(parseItem(customPrefixes)),
  };
}

export function getApiErrorMessage(field, data, errors) {
  if (errors?.length) return errors[0].message ?? errors[0];
  if (data?.[field]?.customerUserErrors?.length)
    return data[field].customerUserErrors[0].message;
  return null;
}

export function statusMessage(status) {
  const translations = {
    ATTEMPTED_DELIVERY: 'Intento de entrega',
    CANCELED: 'Cancelado',
    CONFIRMED: 'Confirmado',
    DELIVERED: 'Entregado',
    FAILURE: 'Fallo',
    FULFILLED: 'Completado',
    IN_PROGRESS: 'En progreso',
    IN_TRANSIT: 'En tránsito',
    LABEL_PRINTED: 'Etiqueta impresa',
    LABEL_PURCHASED: 'Etiqueta comprada',
    LABEL_VOIDED: 'Etiqueta anulada',
    MARKED_AS_FULFILLED: 'Marcado como completado',
    NOT_DELIVERED: 'No entregado',
    ON_HOLD: 'En espera',
    OPEN: 'Abierto',
    OUT_FOR_DELIVERY: 'En camino',
    PARTIALLY_FULFILLED: 'Parcialmente completado',
    PENDING_FULFILLMENT: 'En espera de entrega',
    PICKED_UP: 'Recogido',
    READY_FOR_PICKUP: 'Listo para recoger',
    RESTOCKED: 'Restaurado',
    SCHEDULED: 'Programado',
    SUBMITTED: 'Enviado',
    UNFULFILLED: 'No completado',
  };
  try {
    return translations?.[status];
  } catch (error) {
    return status;
  }
}

export function emailValidation(email) {
  if (email.validity.valid) return null;

  return email.validity.valueMissing
    ? 'Por favor ingrese un correo electrónico'
    : 'Por favor introduzca una dirección de correo electrónico válida';
}

export function passwordValidation(password) {
  if (password.validity.valid) return null;

  if (password.validity.valueMissing) {
    return 'Por favor ingrese un correo electrónico';
  }

  return 'La contraseña debe tener al menos 6 caracteres';
}
