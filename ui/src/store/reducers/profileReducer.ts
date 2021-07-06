import { MsgOutType } from '@/messages/methods/createMessage';
import * as profileAC from '@/store/actions/action-creators/profileAC';
import * as profileAT from '@/store/constants/profileConstants';
import {
  ADDITIONAL_BRIEFING,
  BATTLE_PAYMENTS,
  MILITARY_MANEUVERS,
  TACTICAL_TRAINING,
} from '@/constants';
import { isInMsgTypes } from '@/utils';
import { getNowTimeStamp } from '@/utils/dates';

export type ProfileState = {
  info: {
    id: Nullable<number>;
    name: Nullable<string>;
  };
  appState: {
    mainDrawerOn: boolean;
  };
  auth: {
    id: Nullable<number>;
    nick: Nullable<string>;
    token: Nullable<string>;
    expires: Nullable<number>;
  };
  widgets: {
    clanReserves: {
      on: boolean;
      status: Nullable<TrayIconTypes>;
      nextExpectedUpdate: Nullable<number>;
      isFetching: boolean;
      actives: Array<{
        type: TargetReservesType;
        active_till: number;
        level: number;
      }>;
      error: Nullable<{
        name: string;
        message: string;
        error?: {
          code?: number;
          field?: Nullable<string>;
          message?: string;
          value?: string;
        };
      }>;
      reserves: ReservesStateType;
    };
  };
  notices: {
    messages: MsgOutType[];
  };
  settings: {
    common: {
      openOnSystemStartUp: boolean;
      openMinimized: boolean;
      minimizeOnClose: boolean;
      showUnreadBadge: boolean;
      osNoticesOnMinimizedOnly: boolean;
      checkUpdates: boolean;
      noticesTypeFilter: NoticeTypes[];
    };
    widgets: {
      widgetClanRes: {
        startOnOpen: boolean;
        updateInterval: number;
        sendNotices: boolean;
        sendOSNotices: boolean;
        osNoticesTypes: Array<'stop' | 'reserve'>;
      };
    };
  };
};

export type ReservStockitemType = {
  status: 'active' | 'ready_to_activate' | 'cannot_be_activated';
  action_time: number;
  active_till: Nullable<number>;
  level: number;
  activated_at: Nullable<number>;
  amount: number;
  x_level_only: boolean;
  bonus_values: Array<{
    value: number;
    battle_type: string;
  }>;
};

export type ReservesItemType = {
  isActive: boolean;
  active: ReservStockitemType | EmptyObject;
  in_stock: Array<ReservStockitemType>;
  name: string;
  type: TargetReservesType;
  bonus_type?: string;
};

type ReservesStateType = {
  [key in TargetReservesType]?: ReservesItemType;
};

export type ProfileActionTypes = ReturnType<InferValueTypes<typeof profileAC>>;

export const initialProfileState: ProfileState = {
  info: {
    id: null,
    name: null,
  },
  appState: {
    mainDrawerOn: false,
  },
  auth: {
    id: null,
    nick: null,
    token: null,
    expires: null,
  },
  widgets: {
    clanReserves: {
      on: false,
      status: null,
      nextExpectedUpdate: null,
      isFetching: false,
      actives: [],
      error: null,
      reserves: {
        ADDITIONAL_BRIEFING: {
          isActive: false,
          active: {},
          in_stock: [],
          name: 'Дополнительный инструктаж',
          type: ADDITIONAL_BRIEFING,
        },
        BATTLE_PAYMENTS: {
          isActive: false,
          active: {},
          in_stock: [],
          name: 'Боевые выплаты',
          type: BATTLE_PAYMENTS,
        },
        MILITARY_MANEUVERS: {
          isActive: false,
          active: {},
          in_stock: [],
          name: 'Военные учения',
          type: MILITARY_MANEUVERS,
        },
        TACTICAL_TRAINING: {
          isActive: false,
          active: {},
          in_stock: [],
          name: 'Тактическая подготовка',
          type: TACTICAL_TRAINING,
        },
      },
    },
  },
  notices: {
    messages: [],
  },
  settings: {
    common: {
      openOnSystemStartUp: false,
      openMinimized: false,
      minimizeOnClose: false,
      showUnreadBadge: false,
      osNoticesOnMinimizedOnly: false,
      checkUpdates: true,
      noticesTypeFilter: [],
    },
    widgets: {
      widgetClanRes: {
        startOnOpen: false,
        updateInterval: 45,
        sendNotices: true,
        sendOSNotices: true,
        osNoticesTypes: ['stop', 'reserve'],
      },
    },
  },
};

export const profileReducer = (
  state = initialProfileState,
  action: ProfileActionTypes
): ProfileState => {
  switch (action.type) {
    case profileAT.INJECT_PROFILE_INFO: {
      return {
        ...state,
        info: {
          ...state.info,
          ...action.payload,
        },
      };
    }
    case profileAT.SET_MAIN_DRAWER: {
      return {
        ...state,
        appState: {
          ...state.appState,
          mainDrawerOn: action.payload,
        },
      };
    }
    case profileAT.SET_PROFILE_AUTH: {
      return {
        ...state,
        auth: action.payload,
      };
    }
    case profileAT.INJECT_SETTINGS: {
      const { common = {}, widgets = {} } = action.payload;
      const { widgetClanRes = {} } = widgets;

      return {
        ...state,
        settings: {
          ...state.settings,
          common: {
            ...state.settings.common,
            ...(common as {}),
          },
          widgets: {
            ...state.settings.widgets,
            ...widgets,
            widgetClanRes: {
              ...state.settings.widgets.widgetClanRes,
              ...(widgetClanRes as {}),
            },
          },
        },
      };
    }
    case profileAT.INJECT_COMMON_SETTINGS: {
      return {
        ...state,
        settings: {
          ...state.settings,
          common: {
            ...state.settings.common,
            ...(action.payload as {}),
          },
        },
      };
    }
    case profileAT.INJECT_WCR_SETTINGS: {
      return {
        ...state,
        settings: {
          ...state.settings,
          widgets: {
            ...state.settings.widgets,
            widgetClanRes: {
              ...state.settings.widgets.widgetClanRes,
              ...(action.payload as {}),
            },
          },
        },
      };
    }
    case profileAT.TOGGLE_NOTICES_TYPE_FILTER: {
      const { noticesTypeFilter } = state.settings.common;
      const isPresent = isInMsgTypes(action.payload, noticesTypeFilter);

      return {
        ...state,
        settings: {
          ...state.settings,
          common: {
            ...state.settings.common,
            noticesTypeFilter: isPresent
              ? noticesTypeFilter.filter((type) => type !== action.payload)
              : [...noticesTypeFilter, action.payload],
          },
        },
      };
    }
    case profileAT.PUSH_NOTICE: {
      return {
        ...state,
        notices: {
          ...state.notices,
          messages: [action.payload, ...state.notices.messages],
        },
      };
    }
    case profileAT.DEL_NOTICE_MSG: {
      return {
        ...state,
        notices: {
          ...state.notices,
          messages: state.notices.messages.filter(
            ({ id }) => id !== action.payload
          ),
        },
      };
    }
    case profileAT.DEL_ALL_NOTICE_MSGS: {
      return {
        ...state,
        notices: {
          ...state.notices,
          messages: [],
        },
      };
    }
    case profileAT.READ_NOTICE_MSG: {
      return {
        ...state,
        notices: {
          ...state.notices,
          messages: state.notices.messages.map((message) => {
            const { id } = message;

            if (id === action.payload) {
              message.read = true;
            }

            return message;
          }),
        },
      };
    }
    case profileAT.READ_ALL_NOTICE_MSGS: {
      return {
        ...state,
        notices: {
          ...state.notices,
          messages: state.notices.messages.map((message) => {
            message.read = true;

            return message;
          }),
        },
      };
    }
    case profileAT.SET_WCR_DATA: {
      return {
        ...state,
        widgets: {
          ...state.widgets,
          clanReserves: {
            ...state.widgets.clanReserves,
            ...(action.payload as {}),
          },
        },
      };
    }
    case profileAT.PUSH_WCR_ACTIVES: {
      return {
        ...state,
        widgets: {
          ...state.widgets,
          clanReserves: {
            ...state.widgets.clanReserves,
            actives: [...state.widgets.clanReserves.actives, action.payload],
          },
        },
      };
    }
    case profileAT.FILTER_OUTDATED_WCR_ACTIVES: {
      const { actives } = state.widgets.clanReserves;

      return {
        ...state,
        widgets: {
          ...state.widgets,
          clanReserves: {
            ...state.widgets.clanReserves,
            actives: actives.filter(
              ({ active_till }) =>
                active_till && active_till > getNowTimeStamp()
            ),
          },
        },
      };
    }
    default:
      return state;
  }
};
