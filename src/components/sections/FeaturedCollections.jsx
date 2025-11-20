import {Link, Image} from '@shopify/hydrogen';

import {Section, Grid} from '~/components';

export function FeaturedCollections({data, title = 'En Tendencias', ...props}) {
  const items = data.filter((item) => item.image).length;
  const haveCollections = data.length > 0;

  if (!haveCollections) return null;

  return (
    <Section {...props} heading={title}>
      <div>
        <Grid items={items}>
          {data.map((collection) => {
            if (!collection?.image) {
              return null;
            }
            // TODO: Refactor to use CollectionCard
            return (
              <Link
                key={collection.id}
                to={`/collections/${collection.handle}`}
              >
                <div
                  className={`p-1 relative h-48 md:h-auto overflow-hidden border-white in-view hover:border-green-600 hover:shadow-green-600 shadow-white shadow-lg border-2 group transition-all duration-150 ease-in-out transform`}
                >
                  <div className="card-image h-72 overflow-hidden relative cursor-pointer">
                    {collection?.image && (
                      <Image
                        alt={`Foto de ${collection.title}`}
                        data={collection.image}
                        height={400}
                        width={600}
                        className="w-full h-full transition-all duration-150 ease-in-out group-hover:scale-[105%] fadeIn object-cover absolute"
                        widths={[400, 500, 600, 700, 800, 900]}
                        loaderOptions={{
                          scale: 0.5,
                          crop: 'center',
                        }}
                      />
                    )}
                  </div>
                  <p
                    className={`px-2 text-2xl absolute font-saira top-2 right-2 group-hover:bg-green-600 transition-all rounded-[3px] border-2 group-hover:border-green-600 border-red600 duration-150 ease-in-out`}
                  >
                    {collection.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </Grid>
      </div>
    </Section>
  );
}
