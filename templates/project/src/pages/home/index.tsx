import React, { Suspense } from 'react';
import { RouteComponentProps } from '@reach/router';

const Home = React.lazy(() => import('./Home'));

export default (props: RouteComponentProps) => <Suspense fallback='loading ...'><Home {...props}/></Suspense>;
