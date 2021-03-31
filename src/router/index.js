import { HashRouter, Switch } from 'react-router-dom';
import RouteSpecial from '@/router/components/RouteSpecial';
import createRouteNamesObject from '@/utils/createRouteNamesObject';
import routes from '@/router/routes';

export const routeNames = createRouteNamesObject(routes);

export const AppRouter = (props) => <HashRouter {...props} />;

export const AppRoutes = () => (
  <Switch>
    {Object.keys(routes).map((key) => (
      <RouteSpecial {...routes[key]} key={key} />
    ))}
  </Switch>
);
