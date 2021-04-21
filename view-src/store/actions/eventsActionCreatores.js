import { createMessage } from '@/messages/methods/createMessage';
import { PUSH_EVENT } from '@/store/constants/eventsConstants';

/**
 * pushEvent
 */
export const pushEvent = (msgType = '', data = {}) => {
  return {
    type: PUSH_EVENT,
    payload: createMessage(
      msgType,
      typeof data === 'string' ? { name: data } : data
    ),
  };
};
