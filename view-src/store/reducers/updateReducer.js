import { SET_UPDATE, RESET_UPDATE } from '@/store/constants/updateConstants';

export const initialState = {
  isCheckOnStart: false,
  error: null,
  info: null,
  available: null,
  downloaded: null,
  progress: null,
  loading: false,
};

export const updateReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_UPDATE: {
      return {
        ...state,
        ...payload,
      };
    }

    case RESET_UPDATE: {
      return initialState;
    }

    default:
      return state;
  }
};
