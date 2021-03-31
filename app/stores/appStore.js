const Store = require('electron-store');

let appStore;

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

          notifications: [],

          settings: {
            openOnSystemStartUp: false,
            minimizeOnClose: false,
            pushToNotePanel: true,
            checkInterval: 5000,
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

const getAppStore = () => appStore;

module.exports = { getAppStore, createAppStore };
