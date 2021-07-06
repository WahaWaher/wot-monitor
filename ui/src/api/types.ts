import { ReservStockitemType } from '@/store/reducers/profileReducer';

export type WotAPICommonRes = {
  /**
   * "ok" — request was processed successfully;
   * "error" — error occurred while processing the request.
   */
  status: 'ok' | 'error';
  meta?: { count?: number };
  /**
   * Once an error occurred, the following values are returned.
   */
  error?: {
    code: number;
    field: Nullable<string>;
    message: string;
    value: string;
  };
};

export type WotAuthLoginParams = {
  /* Application ID */
  application_id?: string;
  /* Layout for mobile applications */
  display?: 'page' | 'popup';
  /**
   * Access_token expiration time in UNIX.
   * Delta can also be specified in seconds, max: 1209600
   */
  expires_at?: number;
  /**
   * If parameter nofollow=1 is passed in, the user is not redirected.
   * URL is returned in response. Default is 0. Min value is 0. Maximum value: 1.
   */
  nofollow?: 0 | 1;
  /**
   * URL where user is redirected after authentication.
   * By default: api.worldoftanks.ru/wot//blank/
   */
  redirect_uri?: string;
};

export type WotAuthLogoutParams = {
  access_token?: Nullable<string>;
};

export type FetchClanReservesParams = {
  access_token: Nullable<string>;
};

export type TargetResFields = {
  bonus_type: string;
  name: string;
  type: TargetReservesType;
  in_stock: Array<ReservStockitemType>;
};

export type FormattedResData = {
  [key in TargetReservesType]: {
    isActive: boolean;
    active: Partial<ReservStockitemType> | EmptyObject;
  } & TargetResFields;
};