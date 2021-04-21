const { nativeImage, Tray, Menu } = require('electron');
const { toggleWindow, pushRoute } = require('../windows/actions');
const { iconRegular } = require('../utils/iconPaths');

const createMainTray = (mainWindow) => {
  const nImage = nativeImage.createFromPath(iconRegular);
  const mainTray = new Tray(nImage);

  mainTray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Свернуть/Развернуть',
        click: () => toggleWindow(mainWindow),
      },
      { type: 'separator' },
      {
        label: 'Мониторинг',
        click: () => pushRoute(mainWindow, 'monitoring'),
      },
      {
        label: 'Уведомления',
        click: () => pushRoute(mainWindow, 'notifications'),
      },
      {
        label: 'Аутентификация',
        click: () => pushRoute(mainWindow, 'auth'),
      },
      {
        label: 'Профиль',
        click: () => pushRoute(mainWindow, 'profiles'),
      },
      {
        label: 'Настройки',
        click: () => pushRoute(mainWindow, 'settings'),
      },
      { type: 'separator' },
      {
        label: 'О программе',
        click: () => pushRoute(mainWindow, 'about'),
      },
      { type: 'separator' },
      { label: 'Выйти', role: 'quit' },
    ])
  );

  mainTray.setToolTip('WOT Monitor');
  mainTray.on('click', () => toggleWindow(mainWindow));

  return mainTray;
};

module.exports = {
  createMainTray,
};
