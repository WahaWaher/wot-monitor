import { PUSH_NOTICE } from '@/store/constants/profileConstants';
import {
  WGT_CR_START_OK,
  WGT_CR_STOP_OK,
  WOT_AUTH_OK,
  WOT_LOGOUT_OK,
  WOT_UNSET_AUTH_OK,
  WGT_CR_ACTIVE_DETECTED_RSV,
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
import { initialProfileState, ProfileState } from '../reducers/profileReducer';
import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async/fixed';
import { fromatDateFromTimeStamp, getNowTimeStamp } from '@/utils/dates';
import {
  isCRWidgetFatalErr,
  isInvalidTokenOnTik,
  shouldSendOsNotice,
} from '@/utils';
import {
  createMessage,
  MsgIncomeDataType,
  MsgIncomeErrorDataType,
} from '@/messages/methods/createMessage';
import { msgNames } from '@/messages/data';
import { RootStateType } from '@/store';
import {
  delAllNoticeMsgsAC,
  delNoticeMsgAC,
  filterWCRActivesAC,
  pushWCRActivesAC,
  readAllNoticeMsgAC,
  readNoticeMsgAC,
  setMainDrawerAC,
  setProfileAuthAC,
  setProfileInfoAC,
  injectSettingsAC,
  setWCRDataAC,
  toggleNoticesTypeFilterAC,
  injectCommonSettingsAC,
  injectWCRSettingsAC,
} from '@/store/actions/action-creators/profileAC';

/**
 * pushNotice
 */
export const pushNotice = (
  msgType: NoticeTypes,
  data: MsgIncomeDataType | MsgIncomeErrorDataType | string
) => ({
  type: PUSH_NOTICE,
  payload: createMessage(
    msgType,
    typeof data === 'string' ? { name: data } : data
  ),
});

/**
 * setMainDrawer
 */
export const setMainDrawer =
  (on: boolean): ThunkVoidAction =>
  (dispatch) => {
    dispatch(setMainDrawerAC(on));
  };

/**
 * closeMainDrawer
 */
export const closeMainDrawer = (): ThunkVoidAction => (dispatch) => {
  dispatch(setMainDrawerAC(false));
};

/**
 * saveSettings
 */
export const saveSettings =
  (
    settings: RecursivePartial<ProfileState['settings']> = {}
  ): ThunkVoidAction =>
  (dispatch) => {
    dispatch(injectSettingsAC(settings));
  };

/**
 * saveCommonSettings
 */
export const saveCommonSettings =
  (
    commonSettings: RecursivePartial<ProfileState['settings']['common']> = {}
  ): ThunkVoidAction =>
  (dispatch) => {
    dispatch(injectCommonSettingsAC(commonSettings));
  };

/**
 * saveWCRSettings
 */
export const saveWCRSettings =
  (
    wcrSettings: RecursivePartial<
      ProfileState['settings']['widgets']['widgetClanRes']
    > = {}
  ): ThunkVoidAction =>
  (dispatch) => {
    dispatch(injectWCRSettingsAC(wcrSettings));
  };

/**
 * setProfileInfo
 */
export const setProfileInfo =
  (info: RecursivePartial<ProfileState['info']> = {}): ThunkVoidAction =>
  (dispatch) => {
    dispatch(setProfileInfoAC(info));
  };

/**
 * doWotAuth
 */
type DoWotAuthDataType = RootStateType['profile']['auth'];
type DoWotAuthResType = { data?: DoWotAuthDataType; error?: any };

export const doWotAuth =
  (): ThunkBaseAction<Promise<DoWotAuthResType>> => async (dispatch) => {
    try {
      const url = await getUrlForWotAuth();
      const data = await doWotAuthByUrl(url || '');

      dispatch(setProfileAuthAC(data));
      dispatch(pushNotice(MST_SUCCESS, WOT_AUTH_OK));

      return { data };
    } catch (error) {
      dispatch(pushNotice(MST_ERROR, error));

      return { error };
    }
  };

/**
 * doWotLogout
 */
type DoWotLogoutResType = { data?: {}; error?: any };

export const doWotLogout =
  (): ThunkBaseAction<Promise<DoWotLogoutResType>> =>
  async (dispatch, getState) => {
    const { token } = getState().profile.auth;

    try {
      await postWotLogout({ access_token: token });

      dispatch(
        setProfileAuthAC({ id: null, nick: null, token: null, expires: null })
      );
      dispatch(pushNotice(MST_SUCCESS, WOT_LOGOUT_OK));

      return { data: {} };
    } catch (error) {
      dispatch(pushNotice(MST_ERROR, error));

      return { error };
    }
  };

/**
 * unsetProfileAuth
 */
export const unsetProfileAuth = (): ThunkVoidAction => (dispatch) => {
  try {
    dispatch(
      setProfileAuthAC({ id: null, nick: null, token: null, expires: null })
    );
    dispatch(pushNotice(MST_SUCCESS, WOT_UNSET_AUTH_OK));

    return { data: {} };
  } catch (error) {
    dispatch(pushNotice(MST_ERROR, error));

    return { error };
  }
};

/**
 * doCRWidgetTik
 */
export const doCRWidgetTik = (options: { single?: boolean } = {}) => {
  let prevUpdateInterval: number;

  return async (dispatch: any, getState: () => RootStateType) => {
    const {
      profile: { widgets, auth, settings },
    } = getState();
    const { clanReserves } = widgets;
    const access_token = auth.token;
    const { updateInterval, sendNotices } = settings.widgets.widgetClanRes;
    const initialCRWState = initialProfileState.widgets.clanReserves.reserves;
    const { single } = options;
    const { actives } = clanReserves;

    // restart widget if updateInterval has been changed
    if (prevUpdateInterval && prevUpdateInterval !== updateInterval) {
      dispatch(stopCRWidget()).then(() => dispatch(startCRWidget()));

      return;
    }

    try {
      dispatch(setWCRDataAC({ error: null, isFetching: true }));

      let reserves = await fetchClanReserves({ access_token });

      dispatch(setWCRDataAC({ isFetching: false }));

      if (!reserves) return;

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
          dispatch(pushWCRActivesAC({ type, active_till, level }));

          if (sendNotices) {
            dispatch(pushNotice(MST_RESERVE, WGT_CR_ACTIVE_DETECTED_RSV));

            (await shouldSendOsNotice(settings, MST_RESERVE)) &&
              sendOSNotice({
                message: msgNames.WGT_CR_ACTIVATED_RSV.replace(
                  '‎‎%RESERV_NAME%',
                  name
                ).replace(
                  '%ACTIVE_TILL%',
                  active_till ? fromatDateFromTimeStamp(active_till) : ''
                ),
              });
          }
        }

        return item;
      });

      dispatch(
        setWCRDataAC(
          single
            ? ({ reserves } as any)
            : {
                reserves,
                nextExpectedUpdate: getNowTimeStamp() + updateInterval,
              }
        )
      );
    } catch (error) {
      dispatch(setWCRDataAC({ isFetching: false }));

      if (sendNotices) {
        dispatch(pushNotice(MST_ERROR, error));
      }

      dispatch(
        setWCRDataAC({
          error,
          nextExpectedUpdate: getNowTimeStamp() + updateInterval,
          reserves: initialCRWState,
        })
      );

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
export const startCRWidget =
  (options: { force?: any } = {}) =>
  async (dispatch: any, getState: () => RootStateType) => {
    const {
      profile: { settings, widgets },
    } = getState();
    const { clanReserves } = widgets;
    const { updateInterval, sendNotices } = settings.widgets.widgetClanRes;
    const { on } = clanReserves;
    const { force } = options;
    const initialCRWState = initialProfileState.widgets.clanReserves.reserves;
    const timeout = updateInterval * 1000;

    if (on && !force) return;

    try {
      dispatch(
        setWCRDataAC({
          on: true,
          error: null,
          nextExpectedUpdate: getNowTimeStamp() + updateInterval,
          reserves: initialCRWState,
        })
      );

      const doCRWidgetTikAction = doCRWidgetTik();

      window.timerCRW = setIntervalAsync(
        () => dispatch(doCRWidgetTikAction),
        timeout
      );

      dispatch(doCRWidgetTikAction);

      if (sendNotices) {
        dispatch(pushNotice(MST_SUCCESS, WGT_CR_START_OK));
      }
    } catch (error) {
      if (sendNotices) {
        dispatch(pushNotice(MST_ERROR, error));
      }

      dispatch(setWCRDataAC({ error: error.name }));

      return { error };
    }
  };

/**
 * stopCRWidget
 */
type stopCRWidgetParamsType = {
  error?: any;
};

export const stopCRWidget =
  (params: stopCRWidgetParamsType = {}) =>
  async (dispatch: any, getState: () => RootStateType) => {
    const { settings } = getState().profile;
    const { sendNotices } = settings.widgets.widgetClanRes;
    const initialCRWState = initialProfileState.widgets.clanReserves.reserves;

    if (window.timerCRW) {
      await clearIntervalAsync(window.timerCRW);
    }

    try {
      dispatch(
        setWCRDataAC({
          on: false,
          nextExpectedUpdate: null,
          error: params.error || null,
          reserves: initialCRWState,
        })
      );

      if (sendNotices) {
        dispatch(pushNotice(MST_SUCCESS, WGT_CR_STOP_OK));

        (await shouldSendOsNotice(settings, 'stop')) &&
          sendOSNotice({ message: msgNames.WGT_CR_STOP_OK });
      }
    } catch (error) {
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
export const toogleCRWidget =
  (): ThunkBaseAction<Promise<any>> => async (dispatch, getState) => {
    const { profile } = getState();
    const { on } = profile.widgets.clanReserves;

    return dispatch(on ? stopCRWidget() : startCRWidget());
  };

/**
 * filterCRWidgetActives
 */
export const filterCRWidgetActives =
  (): ThunkVoidAction => (dispatch, getState) => {
    dispatch(filterWCRActivesAC());
  };

/**
 * delNoticeMsg
 */
export const delNoticeMsg =
  (id: string): ThunkVoidAction =>
  (dispatch) => {
    id && dispatch(delNoticeMsgAC(id));
  };

/**
 * delAllNoticeMsgs
 */
export const delAllNoticeMsgs = (): ThunkVoidAction => (dispatch) => {
  dispatch(delAllNoticeMsgsAC());
};

/**
 * readNoticeMsg
 */
export const readNoticeMsg =
  (id: string): ThunkVoidAction =>
  (dispatch) => {
    id && dispatch(readNoticeMsgAC(id));
  };

/**
 * readAllNoticeMsgs
 */
export const readAllNoticeMsgs = (): ThunkVoidAction => (dispatch) => {
  dispatch(readAllNoticeMsgAC());
};

/**
 * toggleNoticesTypeFilter
 */
export const toggleNoticesTypeFilter =
  (targetType: NoticeTypes): ThunkVoidAction =>
  (dispatch) => {
    dispatch(toggleNoticesTypeFilterAC(targetType));
  };

/**
 * switchOpenOnStartup
 */
export const switchOpenOnStartup =
  (): ThunkVoidAction => async (dispatch, getState) => {
    const { profile } = getState();
    const { openOnSystemStartUp } = profile.settings.common;

    try {
      if (openOnSystemStartUp) {
        dispatch(injectCommonSettingsAC({ openOnSystemStartUp: false }));

        await unsetOpenOnStartup();
      } else {
        dispatch(injectCommonSettingsAC({ openOnSystemStartUp: true }));

        await setOpenOnStartup();
      }
    } catch (error) {
      dispatch(injectCommonSettingsAC({ openOnSystemStartUp }));
    }
  };

/**
 * changeTrayIcon
 */
export const changeTrayIcon =
  (iconType: TrayIconTypes | '' = ''): ThunkBaseAction<Promise<void>> =>
  async (dispatch) => {
    try {
      await setTrayIcon(iconType);
    } catch (error) {
      dispatch(pushNotice(MST_ERROR, error));
    }
  };

/**
 * changeTrayTooltip
 */
export const changeTrayTooltip =
  (text: string): ThunkBaseAction<Promise<void>> =>
  async (dispatch) => {
    if (!text && text === '') return;

    try {
      await setTrayTooltip(text);
    } catch (error) {
      dispatch(pushNotice(MST_ERROR, error));
    }
  };
