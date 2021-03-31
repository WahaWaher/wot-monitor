import {
  SET_PROFILE,
  SET_PROFILE_LOADING,
  UNSET_PROFILE_LOADING,
  SET_PROFILE_ERROR,
  UNSET_PROFILE_ERROR,
  SET_MAIN_DRAWER,
} from '@/store/constants/profileConstants';
import { PUSH_EVENT } from '@/store/constants/eventsConstants';
import { fetchProfileData } from '@/api/electronAPI';

export const setProfile = () => (dispatch, getState) => {
  const { error } = getState();

  error && dispatch({ type: UNSET_PROFILE_ERROR });
  dispatch({ type: SET_PROFILE_LOADING });

  fetchProfileData()
    .then((res) => {
      const { info, appState, auth, notifications, settings } = res;

      dispatch({
        type: SET_PROFILE,
        payload: { info, appState, auth, notifications, settings },
      });
      dispatch({ type: UNSET_PROFILE_ERROR });
      dispatch({ type: UNSET_PROFILE_LOADING });
    })
    .catch((err) => {
      dispatch({ type: SET_PROFILE_ERROR, payload: err });
      dispatch({ type: UNSET_PROFILE_LOADING });
      dispatch({ type: PUSH_EVENT, payload: err });
    });
};

export const setMainDrawerOpen = (on) => (dispatch) => {
  dispatch({ type: SET_MAIN_DRAWER, payload: on });
};
