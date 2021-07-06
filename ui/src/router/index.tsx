import { HashRouter, Redirect, Switch } from 'react-router-dom';
import RouteSpecial from '@/router/components/RouteSpecial';
import { createRouteNamesObject } from '@/utils/';
import routes from '@/router/routes';
import { FC } from 'react';

export const routeNames = createRouteNamesObject(routes);

export const AppRouter: FC = (props) => <HashRouter {...props} />;

export const AppRoutes = () => (
  <Switch>
    {Object.keys(routes).map((key) => (
      <RouteSpecial {...routes[key]} key={key} />
    ))}
    <Redirect to={routes.monitoring.path} />
  </Switch>
);
