import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from '../../../routes';
import GlobalStyle from '../GlobalStyle/index';

const App: React.FC = () => (
  <BrowserRouter>
    <Fragment>
      <GlobalStyle />
      <Switch>
        {routes.map((pages, index) => <Route key={index} {...pages} />)}
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default App;
