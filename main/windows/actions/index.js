/**
 * toggleWindow
 */
const toggleWindow = (win) => {
  return win.isMinimized() ? win.restore() : win.minimize();
};

/**
 * pushRoute
 */
const pushRoute = (window, name) => {
  const webContents = window?.webContents;

  if (!webContents) return;

  webContents.send('push-route-name', { name });
  window.restore();
  window.focus();
};

module.exports = { toggleWindow, pushRoute };
