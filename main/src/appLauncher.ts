import AutoLaunch from 'auto-launch';
import { getProfileSettings } from '@/stores/appStore';
import { pkg } from '@/utils/pkgUtils';

const appLauncher = new AutoLaunch({
  name: pkg?.productName || '',
});

/* @ts-ignore */
appLauncher.opts.appName = pkg?.productName;

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
