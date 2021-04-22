import { genErrInfo } from '@/messages/methods/handlingErrors';
import { msgNames } from '@/messages/data';

export const { ipcRenderer } = window.require('electron');

/**
 * closeMainWindow
 */
export const closeMainWindow = () => {
  return ipcRenderer.invoke('app-close');
};

/**
 * minimizeMainWindow
 */
export const minimizeMainWindow = () => {
  return ipcRenderer.invoke('app-minimize');
};

/**
 * checkAppMinimized
 */
export const checkAppMinimized = () => {
  return ipcRenderer.invoke('app-is-minimized');
};

/**
 * fetchCurrentProfile
 */
export const fetchCurrentProfile = async () => {
  try {
    const res = await ipcRenderer.invoke('fetch-current-profile');

    if (res) {
      return res;
    }

    throw res;
  } catch (e) {
    throw genErrInfo('IPC_ERR', e, {
      message: msgNames.IPC_FETCH_CUR_PROFILE_ERR,
    });
  }
};

/**
 * postCurrentProfile
 */
export const postCurrentProfile = async (data = {}) => {
  try {
    return ipcRenderer.invoke('post-current-profile', data);
  } catch (e) {
    throw genErrInfo('IPC_ERR', e, {
      message: msgNames.IPC_POST_CUR_PROFILE_ERR,
    });
  }
};

/**
 * doWotAuthByUrl
 */
export const doWotAuthByUrl = async (url) => {
  try {
    return await ipcRenderer.invoke('open-auth-window', url);
  } catch (e) {
    if (/closed-by-user/.test(e.message)) {
      throw genErrInfo('IPC_ERR', e, {
        message: msgNames.IPC_AUTH_CANCELED_BY_USER,
      });
    }
    throw genErrInfo('IPC_ERR', e, {
      message: msgNames.IPC_OPEN_AUTH_WIN_ERR,
    });
  }
};

/**
 * sendOSNotice
 */
export const sendOSNotice = async (options = {}) => {
  try {
    return await ipcRenderer.invoke('send-to-notification-center', options);
  } catch (e) {
    throw genErrInfo('IPC_ERR', e, {
      message: msgNames.IPC_SEND_OS_MSG_ERR,
    });
  }
};

/**
 * setOpenOnStartup
 */
export const setOpenOnStartup = async () => {
  try {
    return await ipcRenderer.invoke('set-app-launcher', true);
  } catch (e) {
    throw genErrInfo('IPC_ERR', e, {
      message: msgNames.IPC_SET_SYSTEM_STARTUP_ERR,
    });
  }
};

/**
 * unsetOpenOnStartup
 */
export const unsetOpenOnStartup = async () => {
  try {
    return await ipcRenderer.invoke('set-app-launcher', false);
  } catch (e) {
    throw genErrInfo('IPC_ERR', e, {
      message: msgNames.IPC_UNSET_SYSTEM_STARTUP_ERR,
    });
  }
};

/**
 * setTrayIcon
 */
export const setTrayIcon = async (iconType = '') => {
  try {
    return await ipcRenderer.invoke('set-tray-icon', iconType);
  } catch (e) {
    throw genErrInfo('IPC_ERR', e, {
      message: msgNames.IPC_SET_TRAY_ICON_ERR,
    });
  }
};

/**
 * setTrayTooltip
 */
export const setTrayTooltip = async (tooltip = '') => {
  try {
    return await ipcRenderer.invoke('set-tray-tooltip', tooltip);
  } catch (e) {
    throw genErrInfo('IPC_ERR', e, {
      message: msgNames.IPC_SET_TRAY_TOOLTIP_ERR,
    });
  }
};

/**
 * checkForUpdates
 */
export const checkForUpdates = async () => {
  try {
    return await ipcRenderer.invoke('check-for-updates');
  } catch (e) {
    throw genErrInfo('IPC_ERR', e, {
      message: msgNames.IPC_CHECK_FOR_UPDATES_ERR,
    });
  }
};
