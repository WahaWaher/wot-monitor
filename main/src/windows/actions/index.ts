/**
 * toggleWindow
 */
const toggleWindow = (win: Electron.BrowserWindow) =>
  win.isMinimized() ? win.restore() : win.minimize();

/**
 * pushRoute
 */
const pushRoute = (win: Electron.BrowserWindow, name: string) => {
  const webContents = win?.webContents;

  if (!webContents) return;

  webContents.send('push-route-name', { name });
  win.restore();
  win.focus();
};

export { toggleWindow, pushRoute };
