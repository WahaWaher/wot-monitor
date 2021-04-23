import { checkAppMinimized } from '@/api/electronAPI';
import {
  BASE_ERR,
  INVALID_ACCESS_TOKEN,
  IPC_ERR,
  SERVER_ERR,
  UNKNOWN_ERR,
  WOT_API_ERR,
} from '@/messages/constants';

/**
 * genCssSizes
 */
export const genCssSizes = (input) => {
  if (typeof input === 'number') {
    return `${input}px`.trim();
  } else if (typeof input === 'string') {
    return input.trim();
  } else if (Array.isArray(input)) {
    let str = '';

    input.map((value) => {
      str =
        typeof value === 'number'
          ? `${str} ${value}px `
          : typeof value === 'string'
          ? `${str} ${value} `
          : '';

      return str;
    });

    return str.replace(/\s{2,}/g, ' ').trim();
  } else return '';
};

/**
 * shouldSendOsNotice
 */
export const shouldSendOsNotice = async (settings = {}, type) => {
  const {
    common: { osNoticesOnMinimizedOnly },
    widgets: {
      widgetClanRes: { sendOSNotices, osNoticesTypes },
    },
  } = settings;

  if (sendOSNotices && osNoticesTypes.includes(type)) {
    if (
      !osNoticesOnMinimizedOnly ||
      (osNoticesOnMinimizedOnly && (await checkAppMinimized()))
    ) {
      return true;
    }
  }

  return false;
};

/**
 * createRouteNamesObject
 */
export const createRouteNamesObject = (routes) =>
  Object.keys(routes).reduce(
    (paths, key) => ({
      ...paths,
      [key]: routes[key].path,
    }),
    {}
  );

/**
 * isInMsgTypes
 */
export const isInMsgTypes = (targetType = '', filterArr = []) =>
  filterArr.some((type) => targetType === type);

/**
 * isCRWidgetFatalErr
 */
export const isCRWidgetFatalErr = (err) => {
  const { name } = err;
  const { message: subName } = err?.error;

  const isBaseFatal = [SERVER_ERR, IPC_ERR, BASE_ERR, UNKNOWN_ERR].includes(
    name
  );

  const isWotAPIFatal =
    name === WOT_API_ERR && subName !== 'SOURCE_NOT_AVAILABLE';

  return Boolean(isBaseFatal || isWotAPIFatal);
};

/**
 * isInvalidTokenOnTik
 */
export const isInvalidTokenOnTik = (err) => {
  const { name } = err;
  const { message: subName } = err?.error;

  return name === WOT_API_ERR && subName === INVALID_ACCESS_TOKEN;
};

/**
 * filterErrForWidgetStatus
 */
export const filterErrForWidgetStatus = (err) => {
  const { name, message, error = {} } = err;
  const allowedFields = ['name', 'message', 'stack', 'field', 'code'];
  const subError = {};

  Object.keys(error).map((key) => {
    if (allowedFields.includes(key)) {
      subError[key] = error[key];
    }

    return key;
  });

  return {
    name,
    message,
    error: subError,
  };
};

/**
 * timeout
 */
export const timeout = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Open external links in OS browser
 */
export const openExternalLinksInOsBrowser = () => {
  // const { shell } = window.require('electron');

  // document.addEventListener('click', function (event) {
  //   if (event.target.tagName === 'A' && event.target.href.startsWith('http')) {
  //     event.preventDefault();
  //     shell.openExternal(event.target.href);
  //   }
  // });
};
