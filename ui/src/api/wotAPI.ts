import {
  FetchClanReservesParams,
  FormattedResData,
  TargetResFields,
  WotAPICommonRes,
  WotAuthLoginParams,
  WotAuthLogoutParams,
} from '@/api/types';
import { AUTH_EXPIRES_AT, REACT_APP_AUTH_APP_ID } from '@/config';
import {
  ADDITIONAL_BRIEFING,
  BATTLE_PAYMENTS,
  MILITARY_MANEUVERS,
  TACTICAL_TRAINING,
} from '@/constants';
import { WOT_API_ERR } from '@/messages/constants';
import {
  genErrInfo,
  throwBasicErrorsInfo,
  throwUnknownErrorsInfo,
} from '@/messages/methods/handlingErrors';
import { ReservStockitemType } from '@/store/reducers/profileReducer';
import axios from 'axios';

export const wotAPI = axios.create({
  baseURL: 'https://api.worldoftanks.ru/wot/',
  params: {
    application_id: REACT_APP_AUTH_APP_ID,
  },
});

/**
 * getUrlForWotAuth
 * @param params WOT API custom params for axios
 * @returns URL where user is redirected for authentication.
 */
export const getUrlForWotAuth = async (
  params: WotAuthLoginParams = {}
): Promise<string | undefined> => {
  type SuccessRes = {
    data?: {
      /**
       * URL where user is redirected for authentication.
       * This URL is returned only if parameter nofollow=1 is passed in.
       */
      location: string;
    };
  };

  const defaults: WotAuthLoginParams = {
    expires_at: AUTH_EXPIRES_AT,
    display: 'page',
    nofollow: 1,
  };

  try {
    const res = await wotAPI.get<SuccessRes & WotAPICommonRes>('/auth/login/', {
      params: { ...defaults, ...params },
    });

    const { status, data } = res.data;

    if (status === 'ok' && data?.location) {
      return data.location;
    }

    throw res;
  } catch (e) {
    throwBasicErrorsInfo(e);

    if (e?.data) throw genErrInfo(WOT_API_ERR, e);

    throwUnknownErrorsInfo(e);
  }
};

/**
 * postWotLogout
 * @returns
 */
export const postWotLogout = async (
  params: WotAuthLogoutParams = {}
): Promise<undefined> => {
  const data = new FormData();

  data.append('application_id', REACT_APP_AUTH_APP_ID || '');
  data.append('access_token', params.access_token || '');

  try {
    const res = await wotAPI.post<WotAPICommonRes>('/auth/logout/', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    const { status } = res.data;

    if (status === 'ok') {
      return;
    }

    throw res;
  } catch (e) {
    throwBasicErrorsInfo(e);

    if (e?.data) throw genErrInfo(WOT_API_ERR, e);

    throwUnknownErrorsInfo(e);
  }
};

/**
 * fetchClanReserves
 * @param params - { access_token }
 * @returns formatted clan reserves data
 */
export const fetchClanReserves = async (
  params: FetchClanReservesParams
): Promise<FormattedResData | undefined> => {
  type SuccessRes = {
    data?: Array<TargetResFields>;
  };

  const targetReserves: Array<TargetReservesType> = [
    ADDITIONAL_BRIEFING,
    BATTLE_PAYMENTS,
    MILITARY_MANEUVERS,
    TACTICAL_TRAINING,
  ];

  try {
    const res = await wotAPI.get<SuccessRes & WotAPICommonRes>(
      '/stronghold/clanreserves/',
      {
        params: {
          fields: 'bonus_type,name,type,in_stock',
          ...params,
        },
      }
    );

    const { status, data } = res.data;

    if (status === 'ok' && data) {
      const out = data
        .filter(({ type }) => targetReserves.includes(type))
        .reduce((output, item) => {
          const active: Partial<ReservStockitemType> | EmptyObject =
            item.in_stock.find(({ status }) => status === 'active') || {};
          const isActive: boolean = Object.values(active).length ? true : false;

          output[item.type] = { isActive, active, ...item };

          return output;
        }, {} as FormattedResData);

      return out;
    }

    throw res;
  } catch (e) {
    throwBasicErrorsInfo(e);

    if (e?.data) throw genErrInfo(WOT_API_ERR, e);

    throwUnknownErrorsInfo(e);
  }
};
