import {
  SET_PROFILE,
  SET_PROFILE_LOADING,
  UNSET_PROFILE_LOADING,
  SET_PROFILE_ERROR,
  UNSET_PROFILE_ERROR,
  SET_MAIN_DRAWER,
} from '@/store/constants/profileConstants';

const initialState = {
  info: {},
  appState: {
    mainDrawerOn: false,
  },
  auth: {},
  notifications: {},
  settings: {},
  isLoading: false,
  error: null,
};

export function profileReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    /**
     * Set profile
     */
    case SET_PROFILE: {
      return {
        ...payload,
        isLoading: state.isLoading,
        error: state.error,
      };
    }

    /**
     * Profile loading
     */
    case SET_PROFILE_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case UNSET_PROFILE_LOADING: {
      return {
        ...state,
        isLoading: false,
      };
    }

    /**
     * Profile error
     */
    case SET_PROFILE_ERROR: {
      return {
        ...state,
        error: payload,
      };
    }

    case UNSET_PROFILE_ERROR: {
      return {
        ...state,
        error: null,
      };
    }

    /**
     * App State
     */
    case SET_MAIN_DRAWER: {
      return {
        ...state,
        appState: {
          ...state.appState,
          mainDrawerOn: payload,
        },
      };
    }

    default:
      return state;
  }
}
