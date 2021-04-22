const { dialog, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');

autoUpdater.setFeedURL({
  provider: 'github',
  repo: 'wot-monitor',
  owner: 'WahaWaher',
  private: true,
  token: process.env.GH_TOKEN,
});

let updater;

autoUpdater.autoDownload = false;

const registerUpdateListeners = () => {
  autoUpdater.on('error', (error) => {
    dialog.showErrorBox(
      'Ошибка: ',
      error == null ? 'unknown' : (error.stack || error).toString()
    );
  });

  autoUpdater.on('update-available', () => {
    dialog.showMessageBox(
      {
        type: 'info',
        title: 'Найдены обновления',
        message: 'Хотите запустить обновление сейчас?',
        buttons: ['Да', 'Нет'],
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          autoUpdater.downloadUpdate();
        } else {
          updater.enabled = true;
          updater = null;
        }
      }
    );
  });

  autoUpdater.on('update-not-available', () => {
    dialog.showMessageBox({
      title: 'Обновления не найдены',
      message: 'Вы пользуетесь последней версией приложения',
    });
    updater.enabled = true;
    updater = null;
  });

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox(
      {
        title: 'Установка обновлений',
        message: 'Обновления скачаны, приложение будет закрыто для установки обновлений',
      },
      () => {
        setImmediate(() => autoUpdater.quitAndInstall());
      }
    );
  });

  /**
   * check-for-updates
   */
  ipcMain.handle('check-for-updates', (e) => {
    return checkForUpdates();
  });
};

const checkForUpdates = () => {
  updater.enabled = false;
  autoUpdater.checkForUpdates();
};

module.exports = { registerUpdateListeners, checkForUpdates };
