const Store = require('electron-store');

let appStore;

const createAppStore = () => {
  return (appStore = new Store({
    name: 'app-store',
    defaults: {
      mainWindowBounds: null,
    },
  }));
};

const getAppStore = () => appStore;

module.exports = { getAppStore, createAppStore };
