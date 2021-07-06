import { SET_UPDATE, RESET_UPDATE } from '@/store/constants/updateConstants';

export const initialState = {
  isCheckOnStart: false,
  error: null as Nullable<any>,
  info: null as Nullable<any>,
  available: null as Nullable<any>,
  downloaded: null as Nullable<any>,
  progress: null as Nullable<any>,
  loading: false,
};

export type UpdateStateType = typeof initialState;

export const updateReducer = (
  state = initialState,
  action: any
): UpdateStateType => {
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
