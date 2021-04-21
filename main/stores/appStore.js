const Store = require('electron-store');

let appStore;

/**
 * createAppStore
 */
const createAppStore = () => {
  appStore = new Store({
    name: 'app-store',
    defaults: {
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
              noticesTypeFilter: [],
            },
            widgets: {
              widgetClanRes: {
                startOnOpen: false,
                updateInterval: 5,
                sendNotices: true,
                sendOSNotices: true,
                osNoticesTypes: [],
              },
            },
          },
        },
      },
      commonState: {
        currentProfileID: 1,
        lastMainWindowBounds: null,
      },
    },
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
const getCurProfileID = () => appStore.get('commonState.currentProfileID');

/**
 * getProfile
 */
const getProfile = () => appStore.get('profiles')[getCurProfileID()];

/**
 * getProfileInfo
 */
const getProfileInfo = () => appStore.get(`profiles.${getCurProfileID()}.info`);

/**
 * getProfileSettings
 */
const getProfileSettings = () => {
  return appStore.get(`profiles.${getCurProfileID()}.settings`);
};

/**
 * getLastWindowBounds
 */
const getLastWindowBounds = () => {
  return appStore.get('commonState.lastMainWindowBounds') || {};
};

/**
 * setWindowBounds
 */
const setWindowBounds = (window) => {
  return appStore.set('commonState.lastMainWindowBounds', window.getBounds());
};

module.exports = {
  getAppStore,
  createAppStore,
  getCurProfileID,
  getProfile,
  getProfileInfo,
  getProfileSettings,
  setWindowBounds,
  getLastWindowBounds,
};
