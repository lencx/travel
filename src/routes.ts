import { lazy } from 'react';
import { RouteOption } from './router/types';

const routes: RouteOption[] = [
  {
    path: '/',
    component: lazy(() => import('./views/home')),
    exact: true,
  },
];

export default routes;
