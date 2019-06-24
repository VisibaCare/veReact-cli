import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter } from 'react-router-dom';
import InjectRoutes from '../InjectRoutes';
import routes from '../../../routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <InjectRoutes url='' routes={routes} />
    </BrowserRouter>
  );
};

export default hot(App);
