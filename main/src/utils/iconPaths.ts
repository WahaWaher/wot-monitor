import { getAssetsPath } from '@/utils/pathUtils';

const iconRegular = getAssetsPath('icons/favicon.ico');
const iconError = getAssetsPath('icons/favicon-error.ico');
const iconWarning = getAssetsPath('icons/favicon-warning.ico');
const iconOnline = getAssetsPath('icons/favicon-online.ico');
const iconOffline = getAssetsPath('icons/favicon-offline.ico');
const iconReserve = getAssetsPath('icons/favicon-reserve.ico');

const getIconPath = (type: TrayIconTypes) => {
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

export {
  iconRegular,
  iconWarning,
  iconError,
  iconOnline,
  iconOffline,
  iconReserve,
  getIconPath,
};
