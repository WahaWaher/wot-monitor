import { app } from 'electron';
import path from 'path';
import Store from 'electron-store';
import isDev from 'electron-is-dev';
import ElectronStore from 'electron-store';
import {
  AppStoreDefaultsType,
  AppStoreProfile,
} from '@/stores/appStoreDefaults';

const AppStoreDefaults: AppStoreDefaultsType = {
  profiles: {
    1: {
      info: {
        id: 1,
        name: 'Default',
      },
      appState: {
        mainDrawerOn: false,
      },
      auth: {
        id: null,
        nick: null,
        token: null,
        expires: null,
      },
      widgets: {
        clanReserves: {
          on: false,
          status: null,
          actives: [],
          error: null,
          reserves: {
            ADDITIONAL_BRIEFING: {
              isActive: false,
              active: {},
              in_stock: [],
              name: 'Дополнительный инструктаж',
              type: 'ADDITIONAL_BRIEFING',
            },
            BATTLE_PAYMENTS: {
              isActive: false,
              active: {},
              in_stock: [],
              name: 'Боевые выплаты',
              type: 'BATTLE_PAYMENTS',
            },
            MILITARY_MANEUVERS: {
              isActive: false,
              active: {},
              in_stock: [],
              name: 'Военные учения',
              type: 'MILITARY_MANEUVERS',
            },
            TACTICAL_TRAINING: {
              isActive: false,
              active: {},
              in_stock: [],
              name: 'Тактическая подготовка',
              type: 'TACTICAL_TRAINING',
            },
          },
        },
      },
      notices: {
        messages: [],
      },
      settings: {
        common: {
          openOnSystemStartUp: false,
          openMinimized: false,
          minimizeOnClose: false,
          showUnreadBadge: true,
          osNoticesOnMinimizedOnly: false,
          checkUpdates: true,
          noticesTypeFilter: [],
        },
        widgets: {
          widgetClanRes: {
            startOnOpen: false,
            updateInterval: 45,
            sendNotices: true,
            sendOSNotices: true,
            osNoticesTypes: ['stop', 'reserve'],
          },
        },
      },
    },
  },
  commonState: {
    currentProfileID: 1,
    lastMainWindowBounds: null,
  },
};

let appStore: ElectronStore<AppStoreDefaultsType>;

/**
 * createAppStore
 */
const createAppStore = () => {
  appStore = new Store({
    name: 'app-store',
    cwd: isDev ? path.resolve(process.cwd(), 'temp') : app.getPath('userData'),
    defaults: AppStoreDefaults,
  });

  return appStore;
};

/**
 * getAppStore
 */
const getAppStore = () => appStore;

/**
 * getCurProfileID
 */
const getCurProfileID = () => appStore.get('commonState').currentProfileID;

/**
 * getProfile
 */
const getProfile = () => appStore.get('profiles')[getCurProfileID()];

/**
 * getProfileInfo
 */
const getProfileInfo = () => getProfile().info;

/**
 * getProfileSettings
 */
const getProfileSettings = () => getProfile().settings;

/**
 * getLastWindowBounds
 */
const getLastWindowBounds = () =>
  appStore.get('commonState').lastMainWindowBounds || {};

/**
 * setWindowBounds
 */
const setWindowBounds = (win: Nullable<Electron.BrowserWindow>): void => {
  if (!win) return;
  
  appStore.set('commonState.lastMainWindowBounds', win.getBounds());
};

export {
  getAppStore,
  createAppStore,
  getCurProfileID,
  getProfile,
  getProfileInfo,
  getProfileSettings,
  setWindowBounds,
  getLastWindowBounds,
};
