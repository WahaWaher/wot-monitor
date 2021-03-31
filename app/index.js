const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const { createAppStore } = require('./stores/appStore');
const { createMainWindow } = require('./windows/mainWindow');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

/**
 * When App ready
 */
app.whenReady().then(async () => {
  createAppStore();
  createMainWindow();


  if (isDev) {
    const {
      default: installExtension,
      REDUX_DEVTOOLS,
      REACT_DEVELOPER_TOOLS,
    } = require('electron-devtools-installer');
  
    installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
      // .then((name) => console.log(`Added Extension:  ${name}`))
      // .catch((err) => console.log('An error occurred: ', err));
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

/**
 * Hot reloading
 */
if (isDev) {
  require('electron-reload')(__dirname, {
    electron: path.join(
      __dirname,
      '../node_modules',
      'electron',
      'dist',
      'electron.exe'
    ),
  });
}
