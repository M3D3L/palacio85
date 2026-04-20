import {useState} from 'react';
import {Image} from '@shopify/hydrogen';

export default function MixodologiaSlider({loading}) {
  const splash =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/splash.webp?v=1666879261';
  const moscow =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/moscow.webp?v=1666877790';
  const pinia =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/pina.webp?v=1666877432';
  const irish =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/irish.webp?v=1666877762';
  const sunrise =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/sunrise.webp?v=1666996399';
  const mojito =
    'https://cdn.shopify.com/s/files/1/0579/2769/6445/files/mojito.webp?v=1667003583';

  const drinks = [
    {
      label: 'Moscow Mule',
      image: moscow,
      ingredients: [
        '45 ml. de vodka',
        '10 ml. de zumo de limón recién exprimido',
        'Una cucharada de cubitos de hielo picado',
        '1 ginger beer o cerveza de jengibre',
        'Hierbabuena y una rodaja de lima para decorar (opcional)',
      ],
    },
    {
      label: 'Piña Colada',
      image: pinia,
      ingredients: [
        '60 mililitros de crema de coco',
        '120 mililitros de ron blanco',
        '1 rodaja de piña natural gruesa',
        '180 mililitros de jugo de piña',
        '2 chorros de leche condensada',
        '1 vaso de hielo picado',
      ],
    },
    {
      label: 'Mojito',
      image: mojito,
      ingredients: [
        '200 mililitros de agua mineral',
        '1 taza de hielo',
        '2 cucharadas de azúcar, morena (mascabado) de preferencia',
        '3 hojas de hierbabuena',
        '1 limón',
        '2 onzas de ron blanco',
      ],
    },
    {
      label: 'Tequila Sunrise',
      image: sunrise,
      ingredients: [
        '1 al gusto de hielo',
        '1 1/2 onzas de tequila blanco',
        '1 al gusto de jugo de naranja',
        '1/8 onzas de granadina',
      ],
    },
    {
      label: 'Café Irlandés',
      image: irish,
      ingredients: [
        '2-2,5 partes de whisky irlandés',
        '4 partes de café filtrado',
        '1-2 cucharadas de azúcar blanco o moreno',
        '50 ml de nata o crema batida',
      ],
    },
  ];

  const [selected, setSelected] = useState(0);
  const drink = drinks[selected];

  return (
    <div className="w-full px-4 md:px-8 py-12">
      <p className="text-2xl md:text-3xl font-bold text-white tracking-widest mb-8 uppercase">
        Tragos 85
      </p>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Drink image */}
        <div className="w-full md:w-1/2 flex justify-center items-center relative h-80 md:h-[500px]">
          <Image
            className="h-full absolute z-0 opacity-40"
            loaderOptions={{crop: 'center', scale: 2}}
            width={600}
            height={400}
            alt="splash effect"
            src={splash}
            loading={loading}
          />
          <Image
            className="h-full z-10 object-contain relative transition-all duration-500"
            loaderOptions={{crop: 'center', scale: 2}}
            width={350}
            height={400}
            alt={drink.label}
            src={drink.image}
            loading={loading}
          />
        </div>

        {/* Recipe card */}
        <div className="w-full md:w-1/2">
          <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide mb-6">
              {drink.label}
            </h2>

            {/* Ingredients */}
            <ul className="space-y-2 mb-8">
              {drink.ingredients.map((ingredient) => (
                <li
                  key={ingredient}
                  className="flex items-start gap-2 text-white/80 text-sm md:text-base"
                >
                  <span className="text-red-500 mt-1">•</span>
                  {ingredient}
                </li>
              ))}
            </ul>

            {/* Drink selector buttons */}
            <div className="flex flex-wrap gap-2">
              {drinks.map((d, index) => (
                <button
                  key={d.label}
                  onClick={() => setSelected(index)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 hover:translate-y-[-2px] ${
                    selected === index
                      ? 'bg-white text-red-600 shadow-lg shadow-red-900/30'
                      : 'bg-transparent border border-white/30 text-white hover:border-red-500 hover:text-red-400'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
