import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from '../../../routes';
import GlobalStyle from '../GlobalStyle';
import { notFound } from '../../../pages';

const App: React.FC = () => (
  <BrowserRouter>
    <Fragment>
      <GlobalStyle />
      <Switch>
        {routes.map((pages, index) => <Route key={index} {...pages} />)}
        <Route component={notFound}/>
      </Switch>
    </Fragment>
  </BrowserRouter>
);

export default App;
