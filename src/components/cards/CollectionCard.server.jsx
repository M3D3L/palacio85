import {Image, Link} from '@shopify/hydrogen';

import {Heading} from '~/components';

export function CollectionCard({collection, loading}) {
  return (
    <Link to={`/collections/${collection.handle}`} className="grid">
      <div className="card-image bg-primary/5 aspect-[3/2] relative">
        {collection?.image && (
          <Image
            alt={`Image of ${collection.title}`}
            className="w-full h-full fadeIn object-cover absolute"
            data={collection.image}
            height={400}
            sizes="(max-width: 32em) 100vw, 33vw"
            width={600}
            loading={loading ? 'eager' : 'lazy'}
            widths={[400, 500, 600, 700, 800, 900]}
            loaderOptions={{
              scale: 2,
              crop: 'center',
            }}
          />
        )}
      </div>
      <Heading as="h3" size="copy">
        {collection.title}
      </Heading>
    </Link>
  );
}
