/**
 * Common
 */
export const getProfile = (s) => s.profile;
export const getProfileIsLoading = (s) => s.profile.isLoading;

/**
 * info
 */
export const getProfileInfo = (s) => s.profile.info;
export const getProfileName = (s) => s.profile.info.name;

/**
 * appState
 */
export const getAppState = (s) => s.profile.appState;
export const getMainDrawerOn = (s) => s.profile.appState.mainDrawerOn;
