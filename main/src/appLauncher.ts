import { getProfileSettings } from '@/stores/appStore';
import AutoLaunch from 'auto-launch';
import isDev from 'electron-is-dev';

const getLaunchAppName = () => `WOT Monitor${isDev ? ' (dev)': ''}`;

const appLauncher = new AutoLaunch({
  name: getLaunchAppName(),
});

/* @ts-ignore */
appLauncher.opts.appName = getLaunchAppName();

const setAppLauncher = async () => {
  const { openOnSystemStartUp } = getProfileSettings().common;
  const isEnabled = await appLauncher.isEnabled();

  if (openOnSystemStartUp && !isEnabled) {
    return appLauncher.enable();
  }

  if (!openOnSystemStartUp && isEnabled) {
    return appLauncher.disable();
  }
};

export { appLauncher, setAppLauncher };

