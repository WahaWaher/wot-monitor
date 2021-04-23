import { SET_UPDATE } from '@/store/constants/updateConstants';
import { initialState } from '@/store/reducers/updateReducer';
import * as electronAPI from '@/api/electronAPI';

/**
 * setUpdate
 */
export const setUpdate = (data = {}) => {
  return {
    type: SET_UPDATE,
    payload: data,
  };
};

/**
 * resetUpdate
 */
 export const resetUpdateData = (data = {}) => {
  return {
    type: SET_UPDATE,
    payload: initialState,
  };
};

/**
 * setUpdateLoading
 */
export const setUpdateLoading = (loading = true) => {
  return {
    type: SET_UPDATE,
    payload: { loading },
  };
};

/**
 * setError
 */
export const setUpdateError = (error = {}) => {
  return {
    type: SET_UPDATE,
    payload: { error, loading: false },
  };
};

/**
 * checkForUpdates
 */
export const checkForUpdates = () => async (dispatch) => {
  try {
    dispatch(setUpdate({ ...initialState, loading: true }));

    await electronAPI.checkForUpdates();
  } catch (error) {
    dispatch(setUpdateError(error));
  }
};

/**
 * downloadUpdate
 */
export const downloadUpdate = () => async (dispatch) => {
  try {
    dispatch(setUpdateLoading(true));

    await electronAPI.downloadUpdate();
  } catch (error) {
    dispatch(setUpdateError(error));
  }
};

/**
 * installUpdate
 */
export const installUpdate = () => async (dispatch) => {
  try {
    dispatch(setUpdateLoading(true));

    await electronAPI.installUpdate();
  } catch (error) {
    dispatch(setUpdateError(error));
  }
};
