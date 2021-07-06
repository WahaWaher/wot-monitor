import { RootStateType } from '@/store';

/**
 * Profile
 */
export const getProfile = ({ profile }: RootStateType) => profile;

/**
 * Info
 */
export const getProfileInfo = ({ profile }: RootStateType) => profile.info;

/**
 * Auth
 */
export const getAuth = ({ profile }: RootStateType) => profile.auth;

/**
 * App State
 */
export const getAppState = ({ profile }: RootStateType) => profile.appState;
export const getMainDrawerOn = ({ profile }: RootStateType) =>
  profile.appState.mainDrawerOn;

/**
 * Settings
 */
export const getSettings = ({ profile }: RootStateType) => profile.settings;
export const getCommonSettings = ({ profile }: RootStateType) =>
  profile.settings.common;
export const getWCRSettings = ({ profile }: RootStateType) =>
  profile.settings.widgets.widgetClanRes;

/**
 * Notices
 */
export const getNotices = ({ profile }: RootStateType) => profile.notices;
export const getAllNoticesCount = ({ profile }: RootStateType) =>
  profile.notices.messages.length;
export const getUnreadNoticesCount = ({ profile }: RootStateType) =>
  profile.notices.messages.filter(({ read }) => !read).length;

/**
 * Widget: Clan Reserves
 */
export const getClanReserves = ({ profile }: RootStateType) =>
  profile.widgets.clanReserves;

export const hasActiveReserves = ({ profile }: RootStateType) => {
  const { on, actives, error } = profile.widgets.clanReserves;
  const { token } = profile.auth;

  return Boolean(on && token && !error && actives?.length);
};

export const isWorkingWithActives = ({ profile }: RootStateType) => {
  const { on, actives, error } = profile.widgets.clanReserves;
  const { token } = profile.auth;

  return Boolean(on && token && !error && actives?.length);
};

export const isStoppedByError = ({ profile }: RootStateType) => {
  const { on, error } = profile.widgets.clanReserves;

  return Boolean(!on && error);
};

export const isWorkingNoConnection = ({ profile }: RootStateType) => {
  const { on, error } = profile.widgets.clanReserves;

  return Boolean(on && error?.name === 'INTERNET_DISCONNECTED_ERR');
};

export const isWorkingWithoutActives = ({ profile }: RootStateType) => {
  const { on, error, actives } = profile.widgets.clanReserves;

  return Boolean(on && !error && !actives?.length);
};

export const isWorkingWithError = ({ profile }: RootStateType) => {
  const { on, error } = profile.widgets.clanReserves;

  return Boolean(on && error);
};
