import axios from 'axios';
import {
  genErrInfo,
  throwBasicErrorsInfo,
  throwUnknownErrorsInfo,
} from '@/messages/methods/handlingErrors';
import { WOT_API_ERR } from '@/messages/constants';
import {
  ADDITIONAL_BRIEFING,
  BATTLE_PAYMENTS,
  MILITARY_MANEUVERS,
  TACTICAL_TRAINING,
} from '@/store/constants/profileConstants';
import { REACT_APP_AUTH_APP_ID, REACT_APP_AUTH_EXPIRES_AT } from '@/config';

export const wotAPI = axios.create({
  baseURL: 'https://api.worldoftanks.ru/wot/',
  params: {
    application_id: REACT_APP_AUTH_APP_ID,
    access_token: '',
  },
});

/**
 * getUrlForWotAuth
 */
export const getUrlForWotAuth = async (params = {}) => {
  try {
    const res = await wotAPI.get('/auth/login/', {
      params: {
        expires_at: REACT_APP_AUTH_EXPIRES_AT,
        display: 'page',
        nofollow: 1,
        ...params,
      },
    });

    const { status, data } = res.data;

    if (status === 'ok') {
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
 */
export const postWotLogout = async (params = {}) => {
  try {
    const data = new FormData();

    data.append('application_id', REACT_APP_AUTH_APP_ID);
    data.append('access_token', params.access_token);

    const res = await wotAPI.post('/auth/logout/', data, {
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
 */
export const fetchClanReserves = async (params = {}) => {
  try {
    const res = await wotAPI.get('/stronghold/clanreserves/', {
      params: {
        fields: 'bonus_type,name,type,in_stock',
        access_token: '',
        ...params,
      },
    });

    const { status, data } = res.data;
    const targetReserves = [
      ADDITIONAL_BRIEFING,
      BATTLE_PAYMENTS,
      MILITARY_MANEUVERS,
      TACTICAL_TRAINING,
    ];

    if (status === 'ok') {
      const out = data
        .filter(({ type }) => targetReserves.includes(type))
        .reduce((output, item) => {
          const active =
            item.in_stock.find(({ status }) => status === 'active') || {};
          const isActive = Object.values(active).length ? true : false;

          output[item.type] = { isActive, active, ...item };

          return output;
        }, {});

      return out;
    }

    throw res;
  } catch (e) {
    throwBasicErrorsInfo(e);

    if (e?.data) throw genErrInfo(WOT_API_ERR, e);

    throwUnknownErrorsInfo(e);
  }
};
