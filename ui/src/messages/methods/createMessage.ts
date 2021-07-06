import { nanoid } from 'nanoid';
import { msgNames } from '@/messages/data';
import { getNowTimeStamp } from '@/utils/dates';

type MsgOutCommonFieldsType = {
  id: string;
  date: number;
  read: boolean;
};

export type MsgOutType = {
  id: string;
  date: number; // TimeStamp
  read: boolean;
  type: NoticeTypes;
  name: string;
  message: string;
  error?: {
    name?: string;
    message?: string;
  };
};

export type MsgIncomeDataType = {
  name: string; // Message name (to get the message text)
};

export type MsgIncomeErrorDataType = {
  name: string;
  message: string;
  error: {
    name?: string;
    message?: string;
  };
};

const injectCommonFields = (): MsgOutCommonFieldsType => ({
  id: nanoid(12),
  date: getNowTimeStamp(),
  read: false,
});

/**
 * createMessage
 */
export const createMessage = (
  type: NoticeTypes,
  data: MsgIncomeDataType | MsgIncomeErrorDataType
): MsgOutType | undefined => {
  // TODO: Добавить проверку: в аргументы передан валидный тип сообщения

  switch (type) {
    case 'reserve': {
      const { name } = data as MsgIncomeDataType;
      const message = msgNames[name as keyof typeof msgNames];

      return {
        type,
        name,
        message,
        ...injectCommonFields(),
      };
    }

    case 'success': {
      const { name } = data as MsgIncomeDataType;
      const message = msgNames[name as keyof typeof msgNames];

      return {
        type,
        name,
        message,
        ...injectCommonFields(),
      };
    }

    case 'error': {
      const { name, message, error } = data as MsgIncomeErrorDataType;

      return {
        type,
        name,
        message,
        ...injectCommonFields(),
        error: {
          name: error?.name!,
          message: error?.message!,
        },
      };
    }

    default: {
      return;
    }
  }
};
