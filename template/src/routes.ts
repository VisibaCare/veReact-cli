import React from 'react';
import * as page from './pages';

const routes = [
  {
    key: 'root',
    path: '/',
    exact: true,
    component: page.Home,
  },
  {
    key: '404',
    component: page.NotFound,
  },
];

export default routes;
