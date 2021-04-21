const path = require('path');

const iconRegular = path.join(__dirname, '../assets/icons/favicon.ico');
const iconError = path.join(__dirname, '../assets/icons/favicon-error.ico');
const iconWarning = path.join(__dirname, '../assets/icons/favicon-warning.ico');
const iconOnline = path.join(__dirname, '../assets/icons/favicon-online.ico');
const iconOffline = path.join(__dirname, '../assets/icons/favicon-offline.ico');
const iconReserve = path.join(__dirname, '../assets/icons/favicon-reserve.ico');

const getIconPath = (type) => {
  switch (type) {
    case 'regular':
      return iconRegular;
    case 'warning':
      return iconWarning;
    case 'error':
      return iconError;
    case 'online':
      return iconOnline;
    case 'offline':
      return iconOffline;
    case 'reserve':
      return iconReserve;
    default:
      return iconRegular;
  }
};

module.exports = {
  iconRegular,
  iconWarning,
  iconError,
  iconOnline,
  iconOffline,
  iconReserve,
  getIconPath,
};
