import { PUSH_EVENT } from '@/store/constants/eventsConstants';

const initialState = [];

export function eventsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PUSH_EVENT: {
      return [payload, ...state];
    }

    default:
      return state;
  }
}
