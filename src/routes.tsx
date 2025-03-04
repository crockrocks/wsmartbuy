import { RouteObject } from 'react-router-dom';
import Home from './pages/home';
import Services from './pages/services';
import VirtualTryOn from './pages/virtualtryon';
import ItemSuggestor from './pages/itemsuggestor/itemsuggestor';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/services',
    element: <Services />,
  },
  {
    path: '/virtual-try-on',
    element: <VirtualTryOn />,
  },
  {
    path: '/item-suggestor',
    element: <ItemSuggestor />,
  },
];