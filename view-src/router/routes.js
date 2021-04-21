import Auth from '@/pages/Auth';
import Monitoring from '@/pages/Monitoring';
import Notifications from '@/pages/Notifications';
import Profiles from '@/pages/Profiles';
import Settings from '@/pages/Settings';
import About from '@/pages/About';

export const routes = {
  auth: {
    path: '/auth',
    // access: 'has-profile',
    component: Auth,
  },
  monitoring: {
    path: '/monitoring',
    // access: 'authorized',
    component: Monitoring,
  },
  notifications: {
    path: '/notifications',
    // access: 'authorized',
    component: Notifications,
  },
  profiles: {
    path: '/profiles',
    // access: 'has-profile',
    component: Profiles,
  },
  settings: {
    path: '/settings',
    // access: 'has-profile',
    component: Settings,
  },
  about: {
    path: '/about',
    // access: 'public',
    component: About,
  },
};

export default routes;
