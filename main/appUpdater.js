const { dialog, ipcMain } = require('electron');
const { autoUpdater } = require('electron-updater');

autoUpdater.setFeedURL({
  provider: 'github',
  repo: 'wot-monitor',
  owner: 'WahaWaher',
  private: true,
  token: process.env.GH_TOKEN,
});

autoUpdater.autoDownload = false;

const registerUpdateListeners = () => {
  autoUpdater.on('error', (error) => {
    dialog.showErrorBox(
      'Ошибка: ',
      error == null ? 'unknown' : (error.stack || error).toString()
    );
  });

  autoUpdater.on('update-available', () => {
    dialog
      .showMessageBox({
        type: 'info',
        title: 'Найдены обновления',
        message: 'Хотите запустить обновление сейчас?',
        buttons: ['Да', 'Нет'],
      })
      .then(({response}) => {
        if (response === 0) {
          autoUpdater
            .downloadUpdate()
            .then((res) => {
              dialog.showMessageBox({
                type: 'info',
                title: 'success',
                message: res,
              });
            })
            .catch((e) => {
              dialog.showMessageBox({
                type: 'info',
                title: 'err',
                message: e.toString(),
              });
            });
        }
      });
  });

  autoUpdater.on('update-not-available', () => {
    dialog.showMessageBox({
      title: 'Обновления не найдены',
      message: 'Вы пользуетесь последней версией приложения',
    });
  });

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox(
      {
        title: 'Установка обновлений',
        message:
          'Обновления скачаны, приложение будет закрыто для установки обновлений',
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
  autoUpdater.checkForUpdates();
};

module.exports = { registerUpdateListeners, checkForUpdates };
