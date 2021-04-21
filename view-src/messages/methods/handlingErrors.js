import {
  BASE_ERR,
  HTTP_CLIENT_ERR,
  INTERNET_DISCONNECTED_ERR,
  SERVER_ERR,
  UNKNOWN_ERR,
  WOT_API_ERR,
  IPC_ERR,
} from '@/messages/constants';
import { wotApiMessages, msgNames } from '@/messages/data';

/**
 * genErrInfo
 */
export const genErrInfo = (name, error, options = {}) => {
  switch (name) {
    /**
     * INTERNET_DISCONNECTED_ERR
     */
    case INTERNET_DISCONNECTED_ERR: {
      return {
        name,
        message: msgNames.INTERNET_DISCONNECTED_ERR,
        error: {},
      };
    }

    /**
     * HTTP_CLIENT_ERR
     */
    case HTTP_CLIENT_ERR: {
      return {
        name,
        message: msgNames.HTTP_CLIENT_ERR,
        error: error.toJSON(),
      };
    }

    /**
     * SERVER_ERR
     */
    case SERVER_ERR: {
      return {
        name,
        message: msgNames.SERVER_ERR,
        error: error.data.error,
      };
    }

    /**
     * WOT_API_ERR
     */
    case WOT_API_ERR: {
      const err = error.data.error;
      let message = msgNames.WOT_API_ERR;

      Object.keys(wotApiMessages).some((key) => {
        const field = err.field ? err.field.toUpperCase() : key;
        const realKey = key.replace('%FIELD%', field);
        const isEqual = realKey === err.message;

        if (isEqual) {
          message = wotApiMessages[key].replace('%FIELD%', field);
        }

        return isEqual;
      });

      return {
        name,
        message,
        error: err,
      };
    }

    /**
     * IPC_ERR
     */
    case IPC_ERR: {
      const { name: subName, message, stack } = error;
      const altMsg = options.message;

      return {
        name,
        message: altMsg || msgNames.IPC_ERR,
        error: { name: subName, message, stack },
      };
    }

    /**
     * BASE_ERR
     */
    case BASE_ERR: {
      const { name: subName, message, stack } = error;

      return {
        name,
        message: msgNames.BASE_ERR,
        error: { name: subName, message, stack },
      };
    }

    /**
     * UNKNOWN_ERR
     */
    case UNKNOWN_ERR: {
      return {
        name,
        message: msgNames.UNKNOWN_ERR,
        error: { body: error },
      };
    }

    default:
      return {};
  }
};

/**
 * throwBasicErrorsInfo
 */
export const throwBasicErrorsInfo = (e) => {
  if (!window?.navigator?.onLine) {
    throw genErrInfo(INTERNET_DISCONNECTED_ERR, e);
  }

  if (e?.isAxiosError) {
    throw genErrInfo(HTTP_CLIENT_ERR, e);
  }

  if (e instanceof Error) {
    throw genErrInfo(BASE_ERR, e);
  }
};

/**
 * throwBaseErrorsInfo
 */
export const throwBaseErrorsInfo = (e) => {
  throw genErrInfo(BASE_ERR, e);
};

/**
 * throwUnknownErrorsInfo
 */
export const throwUnknownErrorsInfo = (e) => {
  throw genErrInfo(UNKNOWN_ERR, e);
};
