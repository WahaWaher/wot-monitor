import { nanoid } from 'nanoid';
import { msgNames } from '@/messages/data';
import { getNowTimeStamp } from '@/utils/dates';

const addCommonFields = () => ({
  id: nanoid(12),
  date: getNowTimeStamp(),
  read: false,
});

/**
 * createMessage
 */
export const createMessage = (type = '', data = {}) => {
  switch (type) {
    case 'reserve': {
      const { name } = data;
      const message = msgNames[name];

      return {
        type,
        name,
        message,
        ...addCommonFields(),
      };
    }

    case 'success': {
      const { name } = data;
      const message = msgNames[name];

      return {
        type,
        name,
        message,
        ...addCommonFields(),
      };
    }

    case 'error': {
      const { name, message, error = {} } = data;

      return {
        type,
        name,
        message,
        ...addCommonFields(),
        error: {
          name: error.name,
          message: error.message,
        },
      };
    }

    default: {
      return {};
    }
  }
};
