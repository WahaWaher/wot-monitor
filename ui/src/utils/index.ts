import { checkAppMinimized } from '@/api/electronAPI';
import {
  BASE_ERR,
  INVALID_ACCESS_TOKEN,
  IPC_ERR,
  SERVER_ERR,
  UNKNOWN_ERR,
  WOT_API_ERR,
} from '@/messages/constants';
import { IRoutesSet } from '@/router/routes';

export type CssSizesInputType = number | string | Array<number | string>;

interface IRoutePaths {
  [routeName: string]: string;
}

/**
 * genCssSizes
 */
export const genCssSizes = (input: CssSizesInputType): string => {
  if (typeof input === 'number') {
    return `${input}px`.trim();
  } else if (typeof input === 'string') {
    return input.trim();
  } else if (Array.isArray(input)) {
    let str: string = '';

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
  }

  return '';
};

/**
 * shouldSendOsNotice
 */
export const shouldSendOsNotice = async (
  settings = {},
  type: any
): Promise<boolean> => {
  const {
    common: { osNoticesOnMinimizedOnly },
    widgets: {
      widgetClanRes: { sendOSNotices, osNoticesTypes },
    },
  }: any = settings;

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
export const createRouteNamesObject = (routes: IRoutesSet): IRoutePaths =>
  Object.keys(routes).reduce(
    (paths, key) => ({
      ...paths,
      [key]: routes[key].path,
    }),
    {} as IRoutePaths
  );

/**
 * isInMsgTypes
 */
export const isInMsgTypes = (
  targetType: string,
  filterArr: Array<NoticeTypes>
): boolean => filterArr.some((type) => targetType === type);

/**
 * isCRWidgetFatalErr
 */
export const isCRWidgetFatalErr = (err: any): boolean => {
  const { name } = err;
  const { message: subName } = err?.error;

  const isBaseFatal = [SERVER_ERR, IPC_ERR, BASE_ERR, UNKNOWN_ERR].includes(
    name
  );

  const isWotAPIFatal =
    name === WOT_API_ERR && subName !== 'SOURCE_NOT_AVAILABLE';

  return isBaseFatal || isWotAPIFatal;
};

/**
 * isInvalidTokenOnTik
 */
export const isInvalidTokenOnTik = (err: any): boolean => {
  const { name } = err;
  const { message: subName } = err?.error;

  return name === WOT_API_ERR && subName === INVALID_ACCESS_TOKEN;
};

/**
 * filterErrForWidgetStatus
 */
interface ISubError {
  [key: string]: any;
}

export const filterErrForWidgetStatus = (err: any) => {
  const { name, message, error = {} } = err;
  const allowedFields = ['name', 'message', 'stack', 'field', 'code'];
  const subError: ISubError = {};

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
export const timeout = (ms: number = 1000): Promise<undefined> =>
  new Promise((resolve) => setTimeout(resolve, ms));
