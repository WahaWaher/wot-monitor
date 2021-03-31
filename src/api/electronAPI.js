const { ipcRenderer } = window.require('electron');

const genErrorObject = (err = {}) => {
  return {
    message: '',
    text: err.message || err.text || '',
    code: err.code || null,
  };
};

/**
 * Fetch Profile
 */
export const fetchProfileData = () => {
  return ipcRenderer
    .invoke('fetch-profile')
    .then((res) =>
      res
        ? res
        : Promise.reject({ text: 'Profile data not found or undefined' })
    )
    .catch((err) => {
      const errorInfo = genErrorObject(err);

      return Promise.reject({
        ...errorInfo,
        message: 'Ошибка при попытке загрузить данные профиля',
      });
    });
};

/**
 * Close main window
 */
export const closeMainWindow = () => {
  return ipcRenderer.invoke('app-close');
};

/**
 * Minimize main window
 */
export const minimizeMainWindow = () => {
  return ipcRenderer.invoke('app-minimize');
};
