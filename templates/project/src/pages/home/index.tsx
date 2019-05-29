import React from 'react';
import { RouteComponentProps } from 'react-router';

const Home = React.lazy(() => import('./Home'));

export default (props: RouteComponentProps) => <React.Suspense fallback='loading ...'><Home {...props} /></React.Suspense>;
