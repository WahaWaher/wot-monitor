const { app } = require('electron');
const { getMainWindow } = require('./windows/mainWindow');

const appLock = async (whenReady = () => {}) => {
  const gotTheLock = app.requestSingleInstanceLock();

  if (!gotTheLock) {
    app.quit();
  } else {
    app.on('second-instance', () => {
      const mainWindow = getMainWindow();

      if (mainWindow) {
        if (mainWindow.isMinimized()) {
          mainWindow.restore();
        }

        mainWindow.focus();
      }
    });

    await app.whenReady();

    whenReady();
  }
};

module.exports = { appLock };
