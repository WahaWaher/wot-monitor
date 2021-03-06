import Auth from '@/pages/Auth';
import Monitoring from '@/pages/Monitoring';
import Notifications from '@/pages/Notifications';
import Profiles from '@/pages/Profiles';
import Settings from '@/pages/Settings';
import About from '@/pages/About';
import { FC } from 'react';

export interface IRouteSingle {
  path: string;
  access: 'public';
  component: FC;
}

export interface IRoutesSet {
  [pathName: string]: IRouteSingle;
}

export const routes: IRoutesSet = {
  auth: {
    path: '/auth',
    access: 'public',
    component: Auth,
  },
  monitoring: {
    path: '/monitoring',
    access: 'public',
    component: Monitoring,
  },
  notifications: {
    path: '/notifications',
    access: 'public',
    component: Notifications,
  },
  profiles: {
    path: '/profiles',
    access: 'public',
    component: Profiles,
  },
  settings: {
    path: '/settings',
    access: 'public',
    component: Settings,
  },
  about: {
    path: '/about',
    access: 'public',
    component: About,
  },
};

export default routes;
