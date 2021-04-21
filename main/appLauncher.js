const AutoLaunch = require('auto-launch');
const { getProfileSettings } = require('./stores/appStore');

const appLauncher = new AutoLaunch({
  name: 'WOT Monitor',
});

appLauncher.opts.appName = 'WOT Monitor';

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

module.exports = {
  appLauncher,
  setAppLauncher,
};
