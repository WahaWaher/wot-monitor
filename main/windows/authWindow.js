const { BrowserWindow } = require('electron');

let authWindow = null;

const createAuthWindow = ({ url }) => {
  authWindow = new BrowserWindow({
    width: 600,
    height: 600,
    frame: true,
    show: true,
    alwaysOnTop: true,
    fullscreenable: true,
    backgroundColor: '#1c1c1e',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
    },
  });

  authWindow.setMenu(null);
  authWindow.loadURL(url);

  authWindow.on('closed', () => authWindow.destroy());

  return authWindow;
};

module.exports = { createAuthWindow };
