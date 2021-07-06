import { MsgOutType } from '@/messages/methods/createMessage';
import * as profileAT from '@/store/constants/profileConstants';
import { ProfileState } from '@/store/reducers/profileReducer';

/**
 * setProfileInfoAC
 * @param info Partial or full info object
 */
export const setProfileInfoAC = (
  info: RecursivePartial<ProfileState['info']>
) =>
  <const>{
    type: profileAT.INJECT_PROFILE_INFO,
    payload: info,
  };

/**
 * setMainDrawerAC
 * @param on Drawer desired state, true/false
 */
export const setMainDrawerAC = (on: boolean) =>
  <const>{
    type: profileAT.SET_MAIN_DRAWER,
    payload: on,
  };

/**
 * setProfileAuthAC
 * @param auth Full auth object
 */
export const setProfileAuthAC = (auth: ProfileState['auth']) =>
  <const>{
    type: profileAT.SET_PROFILE_AUTH,
    payload: auth,
  };

/**
 * injectSettingsAC
 * @param settings Partial or full settings object
 */
export const injectSettingsAC = (
  settings: RecursivePartial<ProfileState['settings']> = {}
) =>
  <const>{
    type: profileAT.INJECT_SETTINGS,
    payload: settings,
  };

/**
 * injectCommonSettingsAC
 * @param settings Partial or full common settings object
 */
export const injectCommonSettingsAC = (
  commonSettings: RecursivePartial<ProfileState['settings']['common']> = {}
) =>
  <const>{
    type: profileAT.INJECT_COMMON_SETTINGS,
    payload: commonSettings,
  };

/**
 * injectWCRSettingsAC
 * @param settings Partial or full WCR settings object
 */
export const injectWCRSettingsAC = (
  wcrSettings: RecursivePartial<
    ProfileState['settings']['widgets']['widgetClanRes']
  > = {}
) =>
  <const>{
    type: profileAT.INJECT_WCR_SETTINGS,
    payload: wcrSettings,
  };

/**
 * toggleNoticesTypeFilterAC
 * @param targetType Target notice type ("success", "error", etc.)
 */
export const toggleNoticesTypeFilterAC = (targetType: NoticeTypes) =>
  <const>{
    type: profileAT.TOGGLE_NOTICES_TYPE_FILTER,
    payload: targetType,
  };

/**
 * pushNoticeAC
 * @param notice Notice object
 */
export const pushNoticeAC = (notice: MsgOutType) =>
  <const>{
    type: profileAT.PUSH_NOTICE,
    payload: notice,
  };

/**
 * delNoticeMsgAC
 * @param id Notice ID
 */
export const delNoticeMsgAC = (id: string) =>
  <const>{
    type: profileAT.DEL_NOTICE_MSG,
    payload: id,
  };

/**
 * delAllNoticeMsgsAC
 */
export const delAllNoticeMsgsAC = () =>
  <const>{ type: profileAT.DEL_ALL_NOTICE_MSGS };

/**
 * readNoticeMsgAC
 * @param id Message ID
 */
export const readNoticeMsgAC = (id: string) =>
  <const>{
    type: profileAT.READ_NOTICE_MSG,
    payload: id,
  };

/**
 * readAllNoticeMsgAC
 */
export const readAllNoticeMsgAC = () =>
  <const>{ type: profileAT.READ_ALL_NOTICE_MSGS };

/**
 * setWCRDataAC
 * @param wcrData Partial or full Widget Clan Reserves data object
 */
export const setWCRDataAC = (
  wcrData: RecursivePartial<ProfileState['widgets']['clanReserves']>
) =>
  <const>{
    type: profileAT.SET_WCR_DATA,
    payload: wcrData,
  };

/**
 * pushWCRActivesAC
 * @param active Active reserve object (with basic info only)
 */
export const pushWCRActivesAC = (active: any) =>
  <const>{
    type: profileAT.PUSH_WCR_ACTIVES,
    payload: active,
  };

/**
 * filterWCRActivesAC
 */
export const filterWCRActivesAC = () =>
  <const>{ type: profileAT.FILTER_OUTDATED_WCR_ACTIVES };
