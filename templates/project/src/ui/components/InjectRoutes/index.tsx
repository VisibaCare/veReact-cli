import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { InjectRoutesComponent } from './types';
import { NotFound } from '../../../pages/index';

const InjectRoutes: React.FC<InjectRoutesComponent.Props> = ({ routes, url }) => {
  return (
    <Switch>
      {routes.map((route, index) => {
        const {
          exact,
          path,
          strict,
          routes,
          key,
          component: Component,
        } = route;

        return (
          <Route
            path={`${url}${path}`}
            key={key}
            exact={exact || false}
            strict={strict || false}
            render={props => <Component routes={routes} {...props} />}
          />
        );
      })}
      <Route component={NotFound} />
    </Switch>
  );
};

export default InjectRoutes;
