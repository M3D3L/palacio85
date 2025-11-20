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

  const [mixImage, setMixImage] = useState(moscow);
  const [mixTitle, setMixTitle] = useState('Moscow Mule');
  const [selectedButton, setSelectedButton] = useState(0);
  const [mixIngredients, setMixIngredients] = useState([
    '45 ml. de vodka',
    '10 ml. de zumo de limón recién exprimido',
    'Una cucharada de cubitos de hielo picado',
    '1 ginger beer o cerveza de jengibre',
    'Hierbabuena y una rodaja de lima para decorar (opcional)',
  ]);

  return (
    <div className="w-full h-auto p-4 md:p-8 md:h-[600px] flex flex-col">
      <p className="section-text">Tragos 85</p>
      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="w-full justify-center h-auto flex md:w-1/2 relative">
          <Image
            className="h-full absolute z-0 in-view opacity-90"
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={600}
            height={400}
            alt="splash effect"
            // @ts-ignore Stock type has `src` as optional
            src={splash}
            loading={loading}
          />
          <Image
            className="h-full z-10 m-auto fade-right in-view absolute"
            loaderOptions={{
              crop: 'center',
              scale: 2,
            }}
            width={350}
            height={400}
            alt="drink"
            // @ts-ignore Stock type has `src` as optional
            src={mixImage}
            loading={loading}
          />
        </div>
        <div className="md:w-1/2 align-center p-4 grid content-center relative">
          <div className="p-8 shadow-white h-auto shadow-md border-2 backdrop-blur-md border-white bg-white/30">
            <p className="lg:text-5xl text-3xl neonText m-auto text-white tracking-widest">
              {mixTitle}
            </p>
            <ul className="text-white lg:mt-4 lg:text-base text-sm">
              {mixIngredients.map((ingredient) => (
                <li key={ingredient.toString()}>{ingredient}</li>
              ))}
            </ul>
            <div className="flex flex-wrap text-white mt-16 w-full gap-2 -ml-4 px-2 md:px-4">
              <button
                onClick={() =>
                  setMixTitle('Moscow Mule') ||
                  setMixImage(moscow) ||
                  setSelectedButton(0) ||
                  setMixIngredients([
                    '45 ml. de vodka',
                    '10 ml. de zumo de limón recién exprimido',
                    'Una cucharada de cubitos de hielo picado',
                    '1 ginger beer o cerveza de jengibre',
                    'Hierbabuena y una rodaja de lima para decorar (opcional)',
                  ])
                }
                style={{
                  backgroundColor: selectedButton === 0 ? 'white' : 'red',
                  color: selectedButton === 0 ? 'red' : 'white',
                }}
                className="max-h-8 py-1 px-4 md:max-h-10 lg:px-4 md:text-base text-sm shadow-lg shadow-red-800 hover:bg-white hover:text-red-600 bg-red-600 rounded-full hover:translate-y-[-2px] transition-all duration-150"
              >
                Moscow Mule
              </button>
              <button
                onClick={() =>
                  setMixTitle('Piña Colada') ||
                  setMixImage(pinia) ||
                  setSelectedButton(1) ||
                  setMixIngredients([
                    '60 mililitros de crema de coco',
                    '120 mililitros de ron blanco',
                    '1 rodaja de piña natural gruesa',
                    '180 mililitros de jugo de piña',
                    '2 chorros de leche condensada',
                    '1 vaso de hielo picado',
                  ])
                }
                style={{
                  backgroundColor: selectedButton === 1 ? 'white' : 'red',
                  color: selectedButton === 1 ? 'red' : 'white',
                }}
                className="max-h-8 py-1 px-4 md:max-h-10 lg:px-4 md:text-base text-sm shadow-lg shadow-red-800 hover:bg-white hover:text-red-600 bg-red-600 rounded-full hover:translate-y-[-2px] transition-all duration-150"
              >
                Piña colada
              </button>
              <button
                onClick={() =>
                  setMixTitle('Mojito') ||
                  setMixImage(mojito) ||
                  setSelectedButton(2) ||
                  setMixIngredients([
                    '200 mililitros de agua mineral',
                    '1 taza de hielo',
                    '2 cucharadas de azúcar, morena (mascabado) de preferencia',
                    '3 hojas de hierbabuena',
                    '1 limón',
                    '2 onzas de ron blanco',
                  ])
                }
                style={{
                  backgroundColor: selectedButton === 2 ? 'white' : 'red',
                  color: selectedButton === 2 ? 'red' : 'white',
                }}
                className="max-h-8 py-1 px-4 md:max-h-10 lg:px-4 md:text-base text-sm shadow-lg shadow-red-800 hover:bg-white hover:text-red-600 bg-red-600 rounded-full hover:translate-y-[-2px] transition-all duration-150"
              >
                Mojito
              </button>
              <button
                onClick={() =>
                  setMixTitle('Tequila Sunrise') ||
                  setMixImage(sunrise) ||
                  setSelectedButton(3) ||
                  setMixIngredients([
                    '1 al gusto de hielo',
                    '1 1/2 onzas de tequila blanco',
                    '1 al gusto de jugo de naranja',
                    '1/8 onzas de granadina',
                  ])
                }
                style={{
                  backgroundColor: selectedButton === 3 ? 'white' : 'red',
                  color: selectedButton === 3 ? 'red' : 'white',
                }}
                className="max-h-8 py-1 px-4 md:max-h-10 lg:px-4 md:text-base text-sm shadow-lg shadow-red-800 hover:bg-white hover:text-red-600 bg-red-600 rounded-full hover:translate-y-[-2px] transition-all duration-150"
              >
                Tequila Sunrise
              </button>

              <button
                onClick={() =>
                  setMixTitle('Café Irlandés') ||
                  setMixImage(irish) ||
                  setSelectedButton(4) ||
                  setMixIngredients([
                    '2-2,5 partes de whisky irlandés',
                    '4 partes de café filtrado',
                    '1-2 cucharadas de azúcar blanco o moreno',
                    '50 ml de nata o crema batida',
                  ])
                }
                style={{
                  backgroundColor: selectedButton === 4 ? 'white' : 'red',
                  color: selectedButton === 4 ? 'red' : 'white',
                }}
                className="max-h-8 py-1 px-4 md:max-h-10 lg:px-4 md:text-base text-sm shadow-lg shadow-red-800 hover:bg-white hover:text-red-600 bg-red-600 rounded-full hover:translate-y-[-2px] transition-all duration-150"
              >
                Café Irlandés
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
