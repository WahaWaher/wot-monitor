/**
 * Profile
 */
export const getProfile = ({ profile }) => profile;

/**
 * Info
 */
export const getProfileInfo = ({ profile }) => profile.info;

/**
 * Auth
 */
export const getAuth = ({ profile }) => profile.auth;

/**
 * App State
 */
export const getAppState = ({ profile }) => profile.appState;
export const getMainDrawerOn = ({ profile }) => profile.appState.mainDrawerOn;

/**
 * Settings
 */
export const getSettings = ({ profile }) => profile.settings;
export const getCommonSettings = ({ profile }) => profile.settings.common;
export const getWCRSettings = ({ profile }) =>
  profile.settings.widgets.widgetClanRes;

/**
 * Notices
 */
export const getNotices = ({ profile }) => profile.notices;
export const getAllNoticesCount = ({ profile }) => {
  return profile.notices.messages.length;
};
export const getUnreadNoticesCount = ({ profile }) => {
  return profile.notices.messages.filter(({ read }) => !read).length;
};

/**
 * Widget: Clan Reserves
 */
export const getClanReserves = ({ profile }) => profile.widgets.clanReserves;

export const hasActiveReserves = ({ profile }) => {
  const { on, actives, error } = profile.widgets.clanReserves;
  const { token } = profile.auth;

  return Boolean(on && token && !error && actives?.length);
};

export const isWorkingWithActives = ({ profile }) => {
  const { on, actives, error } = profile.widgets.clanReserves;
  const { token } = profile.auth;

  return Boolean(on && token && !error && actives?.length);
};

export const isStoppedByError = ({ profile }) => {
  const { on, error } = profile.widgets.clanReserves;

  return Boolean(!on && error);
};

export const isWorkingNoConnection = ({ profile }) => {
  const { on, error } = profile.widgets.clanReserves;

  return Boolean(on && error?.name === 'INTERNET_DISCONNECTED_ERR');
};

export const isWorkingWithoutActives = ({ profile }) => {
  const { on, error, actives } = profile.widgets.clanReserves;

  return Boolean(on && !error && !actives?.length);
};

export const isWorkingWithError = ({ profile }) => {
  const { on, error } = profile.widgets.clanReserves;

  return Boolean(on && error);
};
