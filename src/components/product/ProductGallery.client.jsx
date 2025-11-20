import {MediaFile, Image} from '@shopify/hydrogen/client';
import {ATTR_LOADING_EAGER} from '~/lib/const';

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export function ProductGallery({media, className, loading}) {
  const splash = 'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/splash.webp?v=1666879261';
  if (!media.length) {
    return null;
  }

  return (
    <div
      className={`hiddenScroll overflow-x-scroll p-4 xl:p-16 lg:p-8 sm:p-8 md:p-4 overflow-hidden ${className}`}
    >
      {media.map((med, i) => {
        let mediaProps = {};
        const isFirst = i === 0;
        const isFourth = i === 3;
        const isFullWidth = i % 3 === 0;

        const data = {
          ...med,
          image: {
            // @ts-ignore
            ...med.image,
            altText: med.alt || 'Imagen del producto',
          },
        };

        switch (med.mediaContentType) {
          case 'IMAGE':
            mediaProps = {
              width: 800,
              widths: [400, 800, 1200, 1600, 2000, 2400],
            };
            break;
          case 'VIDEO':
            mediaProps = {
              width: '100%',
              autoPlay: true,
              controls: false,
              muted: true,
              loop: true,
              preload: 'auto',
            };
            break;
          case 'EXTERNAL_VIDEO':
            mediaProps = {width: '100%'};
            break;
          case 'MODEL_3D':
            mediaProps = {
              width: '100%',
              interactionPromptThreshold: '0',
              ar: true,
              loading: ATTR_LOADING_EAGER,
              disableZoom: true,
            };
            break;
        }

        if (i === 0 && med.mediaContentType === 'IMAGE') {
          mediaProps.loading = ATTR_LOADING_EAGER;
        }

        const style = [
          isFullWidth ? 'md:col-span-2' : 'md:col-span-1',
          isFirst || isFourth ? '' : 'md:aspect-[4/5]',
          'snap-center bg-contrast/10 glassmorph flex justify-center overflow-hidden relative p-1 md:w-full mb-8 rounded-lg border-2 shadow-lg shadow-[#f13030] border-[#f13030]',
        ].join(' ');

        return (
          <div
            className={style}
            // @ts-ignore
            key={med.id || med.image.id}
          >
            <Image
              className="mx-auto w-3/4 absolute z-0 object-cover"
              loaderOptions={{
                crop: 'center',
                scale: 2,
              }}
              width={400}
              height={400}
              alt="efecto splash"
              // @ts-ignore Stock type has `src` as optional
              src={splash}
              loading={loading}
            />
            <MediaFile
              tabIndex="0"
              className={`aspect-square h-full object-contain  w-full z-10`}
              data={data}
              // @ts-ignore
              options={{
                crop: 'center',
                scale: 1,
              }}
              {...mediaProps}
            />
          </div>
        );
      })}
    </div>
  );
}
