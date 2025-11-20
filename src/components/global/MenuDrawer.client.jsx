import {Drawer} from './Drawer.client';
import {Link} from '@shopify/hydrogen';

export function MenuDrawer({isOpen, onClose, menu}) {
  return (
    <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
      <div className="grid">
        <MenuMobileNav menu={menu} onClose={onClose} />
      </div>
    </Drawer>
  );
}

function MenuMobileNav({onClose}) {
  return (
    <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
      {/* List of all the Collections */}
      <Link to={'/collections/all'} onClick={onClose}>
        Todos
      </Link>
      <Link to={'/collections/Whiskey'} onClick={onClose}>
        Whiskey
      </Link>
      <Link to={'/collections/Ginebra'} onClick={onClose}>
        Ginebra
      </Link>
      <Link to={'/collections/Tequila'} onClick={onClose}>
        Tequila
      </Link>
      {/* <Link to={'/collections/Cognac'} onClick={onClose}>
        Cognac
      </Link> */}
      {/* <Link to={'/collections/Vinos'} onClick={onClose}>
        Vinos
      </Link> */}
      <Link to={'/collections/Digestivo'} onClick={onClose}>
        Digestivos
      </Link>
      <Link to={'/collections/Cognac'} onClick={onClose}>
        Cognac
      </Link>
      <Link to={'/collections/Otros'} onClick={onClose}>
        Otros
      </Link>
    </nav>
  );
}
