const AutoLaunch = require('auto-launch');
const { getProfileSettings } = require('./stores/appStore');
const { productName } = require('../package.json');

const appLauncher = new AutoLaunch({
  name: productName,
});

appLauncher.opts.appName = productName;

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
