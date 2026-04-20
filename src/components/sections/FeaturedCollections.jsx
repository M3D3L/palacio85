import {Link, Image} from '@shopify/hydrogen';
import {Section, Grid} from '~/components';

export function FeaturedCollections({data, title = 'En Tendencias', ...props}) {
  const items = data.filter((item) => item.image).length;
  const haveCollections = data.length > 0;

  if (!haveCollections) return null;

  return (
    <Section {...props} heading={title}>
      <Grid items={items}>
        {data.map((collection) => {
          if (!collection?.image) return null;
          return (
            <Link key={collection.id} to={`/collections/${collection.handle}`}>
              <div className="group relative aspect-[3/2] overflow-hidden rounded-xl border border-white/10 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-900/20">
                <Image
                  alt={`Foto de ${collection.title}`}
                  data={collection.image}
                  height={400}
                  width={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  widths={[400, 500, 600, 700, 800, 900]}
                  loaderOptions={{scale: 0.5, crop: 'center'}}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300" />

                {/* Title */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold text-lg tracking-wide truncate">
                    {collection.title}
                  </h3>
                  <p className="text-red-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                    Ver colección →
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </Grid>
    </Section>
  );
}
