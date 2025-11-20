import {Seo} from '@shopify/hydrogen';
import {PageHeader, Section, CartDetails} from '~/components';
import {Layout} from '~/components/index.server';

export default function Cart() {
  return (
    <Layout>
      <Seo type="page" data={{title: 'Carrito'}} />
      <PageHeader heading="Tu Carrito" className="max-w-7xl mx-auto" />
      <Section className="max-w-7xl mx-auto">
        <CartDetails layout="page" />
      </Section>
    </Layout>
  );
}
