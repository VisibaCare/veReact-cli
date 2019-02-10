import React, { Suspense } from 'react';
import { RouteComponentProps } from 'react-router';
const Home = React.lazy(() => import('./Home'));

export default (props: RouteComponentProps) => <Suspense fallback='loading ...'><Home {...props}/></Suspense>;
