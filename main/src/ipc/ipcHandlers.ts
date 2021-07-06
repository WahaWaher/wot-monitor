import { appLauncher } from '@/appLauncher';
import { getCurProfileID } from '@/stores/appStore';
import { AppStoreDefaultsType } from '@/stores/appStoreDefaults';
import { getIconPath, iconRegular } from '@/utils/iconPaths';
import { createAuthWindow } from '@/windows/authWindow';
import { BrowserWindow, ipcMain, Tray } from 'electron';
import ElectronStore from 'electron-store';
import notifier from 'node-notifier';
import parseUrl from 'url-parse';

type setIpcHandlersOpts = {
  mainWindow: BrowserWindow;
  mainTray: Tray;
  appStore: ElectronStore<AppStoreDefaultsType>;
};

const setIpcHandlers = ({
  mainWindow,
  mainTray,
  appStore,
}: setIpcHandlersOpts) => {
  /**
   * app-close
   */
  ipcMain.handle('app-close', (e) => mainWindow.close());

  /**
   * app-minimize
   */
  ipcMain.handle('app-minimize', (e) => mainWindow.minimize());

  /**
   * app-is-minimized
   */
  ipcMain.handle('app-is-minimized', () => mainWindow.isMinimized());

  /**
   * fetch-current-profile
   */
  ipcMain.handle('fetch-current-profile', () => {
    const curProfileID = getCurProfileID();

    return appStore.get(`profiles.${curProfileID}`);
  });

  /**
   * post-current-profile
   */
  ipcMain.handle('post-current-profile', (e, data = {}) => {
    const curProfileID = getCurProfileID();

    return appStore.set(`profiles.${curProfileID}`, data);
  });

  /**
   * save-auth-data
   */
  ipcMain.handle('save-auth-data', (e, authData = {}) => {
    appStore.set(`profiles.${getCurProfileID()}.auth`, authData);
  });

  /**
   * send-to-notification-center
   */
  ipcMain.handle('send-to-notification-center', (e, options = {}) => {
    notifier.notify(
      Object.assign(
        {
          title: 'WOT Monitor',
          icon: iconRegular,
          message: '',
        },
        options
      )
    );
  });

  /**
   * set-app-launcher
   */
  ipcMain.handle('set-app-launcher', async (e, needSet) => {
    const isEnabled = await appLauncher.isEnabled();

    if (needSet) {
      if (isEnabled) return;

      return await appLauncher.enable();
    }

    if (!isEnabled) return;

    return await appLauncher.disable();
  });

  /**
   * set-tray-icon
   */
  ipcMain.handle('set-tray-icon', (e, iconType) => {
    mainTray.setImage(getIconPath(iconType));
  });

  /**
   * set-tray-tooltip
   */
  ipcMain.handle('set-tray-tooltip', (e, tooltip = 'WOT Monitor') => {
    mainTray.setToolTip(tooltip);
  });

  /**
   * open-auth-window
   */
  ipcMain.handle('open-auth-window', (e, url: string = '') => {
    const authWindow = createAuthWindow({ url });
    const webContents = authWindow.webContents;

    return new Promise((resolve, reject) => {
      webContents.on('did-navigate', (e, curUrl) => {
        if (/\?&status=ok&access_token=/.test(curUrl)) {
          const { query } = parseUrl(curUrl, true);
          const output = {
            token: query.access_token,
            /* @ts-ignore */
            id: parseInt(query.account_id),
            /* @ts-ignore */
            expires: parseInt(query.expires_at),
            nick: query.nickname,
          };

          resolve(output);
          authWindow.close();
        }
      });

      authWindow.on('close', () => reject(new Error('closed-by-user')));
    });
  });
};

export { setIpcHandlers };
