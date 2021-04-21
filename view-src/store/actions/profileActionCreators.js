import {
  SET_MAIN_DRAWER,
  SET_SETTINGS,
  SET_PROFILE_AUTH,
  SET_WCR_DATA,
  PUSH_WCR_ACTIVES,
  FILTER_WCR_ACTIVES,
  DEL_NOTICE_MSG,
  READ_NOTICE_MSG,
  READ_ALL_NOTICE_MSGS,
  DEL_ALL_NOTICE_MSGS,
  TOGGLE_NOTICES_TYPE_FILTER,
  SET_PROFILE_INFO,
  PUSH_NOTICE,
} from '@/store/constants/profileConstants';
import {
  APP_SAVE_PROFILE_OK,
  WGT_CR_START_OK,
  WGT_CR_STOP_OK,
  WOT_AUTH_OK,
  WOT_LOGOUT_OK,
  WOT_UNSET_AUTH_OK,
  WGT_CR_ACTIVE_DETECTED_RSV,
  APP_SAVE_PROFILE_INFO_OK,
  MST_SUCCESS,
  MST_ERROR,
  MST_RESERVE,
} from '@/messages/constants';
import {
  doWotAuthByUrl,
  sendOSNotice,
  unsetOpenOnStartup,
  setOpenOnStartup,
  setTrayIcon,
  setTrayTooltip,
} from '@/api/electronAPI';
import {
  getUrlForWotAuth,
  fetchClanReserves,
  postWotLogout,
} from '@/api/wotAPI';
import { initialState } from '../reducers/profileReducer';
import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async/fixed';
import { fromatDateFromTimeStamp, getNowTimeStamp } from '@/utils/dates';
import {
  isCRWidgetFatalErr,
  isInvalidTokenOnTik,
  shouldSendOsNotice,
} from '@/utils';
import { createMessage } from '@/messages/methods/createMessage';
import { pushEvent } from '@/store/actions/eventsActionCreatores';
import { msgNames } from '@/messages/data';

/**
 * pushNotice
 */
export const pushNotice = (msgType = '', data = {}) => ({
  type: PUSH_NOTICE,
  payload: createMessage(
    msgType,
    typeof data === 'string' ? { name: data } : data
  ),
});

/**
 * setMainDrawer
 */
export const setMainDrawer = (on) => (dispatch) => {
  dispatch({ type: SET_MAIN_DRAWER, payload: on });
};

/**
 * openMainDrawer
 */
export const openMainDrawer = () => (dispatch) => {
  dispatch({ type: SET_MAIN_DRAWER, payload: true });
};

/**
 * closeMainDrawer
 */
export const closeMainDrawer = () => (dispatch) => {
  dispatch({ type: SET_MAIN_DRAWER, payload: false });
};

/**
 * saveSettings
 */
export const saveSettings = (newSettings = {}) => (dispatch, getState) => {
  const prevState = getState();

  try {
    dispatch({ type: SET_SETTINGS, payload: newSettings });
    dispatch(pushEvent(MST_SUCCESS, APP_SAVE_PROFILE_OK));

    return { data: newSettings };
  } catch (error) {
    dispatch({ type: SET_SETTINGS, payload: prevState.profile.settings });
    dispatch(pushEvent(MST_ERROR, error));

    return { error };
  }
};

/**
 * setProfileInfo
 */
export const setProfileInfo = (newInfo = {}) => (dispatch, getState) => {
  const prevState = getState();

  try {
    dispatch({ type: SET_PROFILE_INFO, payload: newInfo });
    dispatch(pushEvent(MST_SUCCESS, APP_SAVE_PROFILE_INFO_OK));

    return { data: newInfo };
  } catch (error) {
    dispatch({ type: SET_PROFILE_INFO, payload: prevState.profile.info });
    dispatch(pushEvent(MST_ERROR, error));

    return { error };
  }
};

/**
 * doWotAuth
 */
export const doWotAuth = () => async (dispatch) => {
  try {
    const url = await getUrlForWotAuth();
    const authData = await doWotAuthByUrl(url);

    dispatch({ type: SET_PROFILE_AUTH, payload: authData });
    dispatch(pushEvent(MST_SUCCESS, WOT_AUTH_OK));
    dispatch(pushNotice(MST_SUCCESS, WOT_AUTH_OK));

    return { data: authData };
  } catch (error) {
    dispatch(pushEvent(MST_ERROR, error));
    dispatch(pushNotice(MST_ERROR, error));

    return { error };
  }
};

/**
 * doWotLogout
 */
export const doWotLogout = () => async (dispatch, getState) => {
  const { token } = getState().profile.auth;

  try {
    await postWotLogout({ access_token: token });

    dispatch({ type: SET_PROFILE_AUTH, payload: {} });
    dispatch(pushEvent(MST_SUCCESS, WOT_LOGOUT_OK));
    dispatch(pushNotice(MST_SUCCESS, WOT_LOGOUT_OK));

    return { data: {} };
  } catch (error) {
    dispatch(pushEvent(MST_ERROR, error));
    dispatch(pushNotice(MST_ERROR, error));

    return { error };
  }
};

/**
 * unsetProfileAuth
 */
export const unsetProfileAuth = () => (dispatch) => {
  try {
    dispatch({ type: SET_PROFILE_AUTH, payload: {} });
    dispatch(pushEvent(MST_SUCCESS, WOT_UNSET_AUTH_OK));
    dispatch(pushNotice(MST_SUCCESS, WOT_UNSET_AUTH_OK));

    return { data: {} };
  } catch (error) {
    dispatch(pushEvent(MST_ERROR, error));
    dispatch(pushNotice(MST_ERROR, error));

    return { error };
  }
};

/**
 * doCRWidgetTik
 */
export const doCRWidgetTik = (options = {}) => {
  let prevUpdateInterval;

  return async (dispatch, getState) => {
    const {
      profile: { widgets, auth, settings },
    } = getState();
    const { clanReserves } = widgets;
    const access_token = auth.token;
    const { updateInterval, sendNotices } = settings.widgets.widgetClanRes;
    const initialCRWState = initialState.widgets.clanReserves.reserves;
    const { single } = options;
    const { actives } = clanReserves;

    // restart widget if updateInterval has been changed
    if (prevUpdateInterval && prevUpdateInterval !== updateInterval) {
      dispatch(stopCRWidget()).then(() => dispatch(startCRWidget()));

      return;
    }

    try {
      dispatch({
        type: SET_WCR_DATA,
        payload: { error: null, isFetching: true },
      });

      let reserves = await fetchClanReserves({ access_token });

      dispatch({ type: SET_WCR_DATA, payload: { isFetching: false } });

      // get array of incoming activated reserves
      const inActives = Object.values(reserves).filter(
        ({ isActive }) => isActive
      );

      inActives.map(async (item) => {
        if (actives.find(({ type }) => type === item.type)) {
          // incoming reserve has already been notified
        } else {
          // new reserve detected
          const {
            name,
            type,
            active: { active_till, level },
          } = item;

          // push to array of current activated reserves
          dispatch({
            type: PUSH_WCR_ACTIVES,
            payload: { type, active_till, level },
          });

          // push notification about new active reserves
          dispatch(pushEvent(MST_RESERVE, WGT_CR_ACTIVE_DETECTED_RSV));

          if (sendNotices) {
            dispatch(pushNotice(MST_RESERVE, WGT_CR_ACTIVE_DETECTED_RSV));

            (await shouldSendOsNotice(settings, MST_RESERVE)) &&
              sendOSNotice({
                message: msgNames.WGT_CR_ACTIVATED_RSV.replace(
                  '‎‎%RESERV_NAME%',
                  name
                ).replace('%ACTIV_TILL%', fromatDateFromTimeStamp(active_till)),
              });
          }
        }

        return item;
      });

      // save to redux-store
      dispatch({
        type: SET_WCR_DATA,
        payload: single
          ? { reserves }
          : {
              reserves,
              nextExpectedUpdate: getNowTimeStamp() + updateInterval,
            },
      });
    } catch (error) {
      dispatch({ type: SET_WCR_DATA, payload: { isFetching: false } });
      dispatch(pushEvent(MST_ERROR, error));

      if (sendNotices) {
        dispatch(pushNotice(MST_ERROR, error));
      }

      dispatch({
        type: SET_WCR_DATA,
        payload: {
          error,
          nextExpectedUpdate: getNowTimeStamp() + updateInterval,
          reserves: initialCRWState,
        },
      });

      if (isInvalidTokenOnTik(error)) {
        dispatch(doWotLogout());
        dispatch(stopCRWidget({ error }));
      }

      if (isCRWidgetFatalErr(error)) {
        dispatch(stopCRWidget({ error }));
      }
    } finally {
      prevUpdateInterval = updateInterval;
    }
  };
};

/**
 * startCRWidget
 */
export const startCRWidget = (options = {}) => async (dispatch, getState) => {
  const {
    profile: { settings, widgets },
  } = getState();
  const { clanReserves } = widgets;
  const { updateInterval, sendNotices } = settings.widgets.widgetClanRes;
  const { on } = clanReserves;
  const { force } = options;
  const initialCRWState = initialState.widgets.clanReserves.reserves;
  const timeout = updateInterval * 1000;

  if (on && !force) return;

  try {
    dispatch({
      type: SET_WCR_DATA,
      payload: {
        on: true,
        error: null,
        nextExpectedUpdate: getNowTimeStamp() + updateInterval,
        reserves: initialCRWState,
      },
    });

    const doCRWidgetTikAction = doCRWidgetTik();

    window.timerCRW = setIntervalAsync(
      () => dispatch(doCRWidgetTikAction),
      timeout
    );

    dispatch(doCRWidgetTikAction);
    dispatch(pushEvent(MST_SUCCESS, WGT_CR_START_OK));

    if (sendNotices) {
      dispatch(pushNotice(MST_SUCCESS, WGT_CR_START_OK));
    }
  } catch (error) {
    dispatch(pushEvent(MST_ERROR, error));

    if (sendNotices) {
      dispatch(pushNotice(MST_ERROR, error));
    }

    dispatch({
      type: SET_WCR_DATA,
      payload: { error: error.name },
    });

    return { error };
  }
};

/**
 * stopCRWidget
 */
export const stopCRWidget = (params = {}) => async (dispatch, getState) => {
  const { settings } = getState().profile;
  const { sendNotices } = settings.widgets.widgetClanRes;
  const initialCRWState = initialState.widgets.clanReserves.reserves;

  if (window.timerCRW) {
    await clearIntervalAsync(window.timerCRW);
  }

  try {
    dispatch({
      type: SET_WCR_DATA,
      payload: {
        on: false,
        nextExpectedUpdate: null,
        error: params.error || null,
        reserves: initialCRWState,
      },
    });

    dispatch(pushEvent(MST_SUCCESS, WGT_CR_STOP_OK));

    if (sendNotices) {
      dispatch(pushNotice(MST_SUCCESS, WGT_CR_STOP_OK));

      (await shouldSendOsNotice(settings, 'stop')) &&
        sendOSNotice({ message: msgNames.WGT_CR_STOP_OK });
    }
  } catch (error) {
    dispatch(pushEvent(MST_ERROR, error));

    if (sendNotices) {
      dispatch(pushNotice(MST_ERROR, error));

      (await shouldSendOsNotice(settings, 'stop')) &&
        sendOSNotice({ message: msgNames.WGT_CR_STOP_ERR });
    }

    return { error };
  }
};

/**
 * toogleCRWidget
 */
export const toogleCRWidget = () => async (dispatch, getState) => {
  const { on } = getState().profile.widgets.clanReserves;

  return dispatch(on ? stopCRWidget() : startCRWidget());
};

/**
 * filterCRWidgetActives
 */
export const filterCRWidgetActives = () => (dispatch, getState) => {
  const state = getState();
  const actives = state.profile.widgets.clanReserves.actives;

  const output = actives.filter(
    ({ active_till }) => active_till && active_till > getNowTimeStamp()
  );

  dispatch({ type: FILTER_WCR_ACTIVES, payload: output });
};

/**
 * delNoticeMsg
 */
export const delNoticeMsg = (id) => (dispatch) => {
  if (!id) return;

  dispatch({ type: DEL_NOTICE_MSG, payload: id });
};

/**
 * delAllNoticeMsgs
 */
export const delAllNoticeMsgs = () => (dispatch) => {
  dispatch({ type: DEL_ALL_NOTICE_MSGS });
};

/**
 * readNoticeMsg
 */
export const readNoticeMsg = (id) => (dispatch) => {
  if (!id) return;

  dispatch({ type: READ_NOTICE_MSG, payload: id });
};

/**
 * readAllNoticeMsgs
 */
export const readAllNoticeMsgs = () => (dispatch) => {
  dispatch({ type: READ_ALL_NOTICE_MSGS });
};

/**
 * toggleNoticesTypeFilter
 */
export const toggleNoticesTypeFilter = (targetType = '') => (dispatch) => {
  dispatch({
    type: TOGGLE_NOTICES_TYPE_FILTER,
    payload: targetType,
  });
};

/**
 * switchOpenOnStartup
 */
export const switchOpenOnStartup = () => async (dispatch, getState) => {
  const { profile } = getState();
  const { openOnSystemStartUp } = profile.settings.common;

  try {
    if (openOnSystemStartUp) {
      await dispatch(
        saveSettings({
          common: { openOnSystemStartUp: false },
        })
      );

      await unsetOpenOnStartup();
    } else {
      await dispatch(
        saveSettings({
          common: { openOnSystemStartUp: true },
        })
      );

      await setOpenOnStartup();
    }

    dispatch(pushEvent(MST_SUCCESS, APP_SAVE_PROFILE_OK));
  } catch (error) {
    dispatch(pushEvent(MST_ERROR, error));

    await dispatch(
      saveSettings({
        common: { openOnSystemStartUp },
      })
    );

    return { error };
  }
};

/**
 * changeTrayIcon
 */
export const changeTrayIcon = (iconType = '') => async (dispatch) => {
  try {
    await setTrayIcon(iconType);
  } catch (error) {
    dispatch(pushEvent(MST_ERROR, error));
  }
};

/**
 * changeTrayTooltip
 */
export const changeTrayTooltip = (title = '') => async (dispatch) => {
  try {
    await setTrayTooltip(title);
  } catch (error) {
    dispatch(pushEvent(MST_ERROR, error));
  }
};
