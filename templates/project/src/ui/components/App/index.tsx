import React, { Fragment } from 'react';
import routes from '../../../routes';
import GlobalStyle from '../GlobalStyle';
import { Router } from '@reach/router';
import NotFound from '../../../pages/notFound/index';
import { hot } from 'react-hot-loader/root';

const App: React.FC = () => {
  return (
    <Fragment>
      <Router>
        {routes.map((page) => <page.component path={page.path} key={page.key} />)}
        <NotFound default />
      </Router>
      <GlobalStyle />
    </Fragment>
  );
};

export default hot(App);
