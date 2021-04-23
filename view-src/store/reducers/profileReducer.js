import {
  SET_MAIN_DRAWER,
  SET_PROFILE_INFO,
  SET_PROFILE_AUTH,
  SET_SETTINGS,
  SET_WCR_DATA,
  PUSH_WCR_ACTIVES,
  FILTER_WCR_ACTIVES,
  FILTER_WCR_STATUS,
  PUSH_NOTICE,
  READ_NOTICE_MSG,
  READ_ALL_NOTICE_MSGS,
  DEL_NOTICE_MSG,
  DEL_ALL_NOTICE_MSGS,
  TOGGLE_NOTICES_TYPE_FILTER,
  BATTLE_PAYMENTS,
  ADDITIONAL_BRIEFING,
  TACTICAL_TRAINING,
  MILITARY_MANEUVERS,
} from '@/store/constants/profileConstants';
import { isInMsgTypes } from '@/utils';

export const initialState = {
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
        [ADDITIONAL_BRIEFING]: {
          isActive: false,
          active: {},
          in_stock: [],
          name: 'Дополнительный инструктаж',
          type: ADDITIONAL_BRIEFING,
        },
        [BATTLE_PAYMENTS]: {
          isActive: false,
          active: {},
          in_stock: [],
          name: 'Боевые выплаты',
          type: BATTLE_PAYMENTS,
        },
        [MILITARY_MANEUVERS]: {
          isActive: false,
          active: {},
          in_stock: [],
          name: 'Военные учения',
          type: MILITARY_MANEUVERS,
        },
        [TACTICAL_TRAINING]: {
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

export const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    /**
     * Info
     */
    case SET_PROFILE_INFO: {
      return {
        ...state,
        info: {
          ...state.info,
          ...payload,
        },
      };
    }

    /**
     * AppState
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

    /**
     * Auth
     */
    case SET_PROFILE_AUTH: {
      return {
        ...state,
        auth: payload,
      };
    }

    /**
     * Settings
     */
    case SET_SETTINGS: {
      const { common = {}, widgets = {} } = payload || {};
      const { widgetClanRes = {} } = widgets;

      return {
        ...state,
        settings: {
          ...state.settings,
          common: {
            ...state.settings.common,
            ...common,
          },
          widgets: {
            ...state.settings.widgets,
            ...widgets,
            widgetClanRes: {
              ...state.settings.widgets.widgetClanRes,
              ...widgetClanRes,
            },
          },
        },
      };
    }

    case TOGGLE_NOTICES_TYPE_FILTER: {
      const { noticesTypeFilter } = state.settings.common;
      const isPresent = isInMsgTypes(payload, noticesTypeFilter);

      return {
        ...state,
        settings: {
          ...state.settings,
          common: {
            ...state.settings.common,
            noticesTypeFilter: isPresent
              ? noticesTypeFilter.filter((type) => type !== payload)
              : [...noticesTypeFilter, payload],
          },
        },
      };
    }

    /**
     * Notices
     */
    case PUSH_NOTICE: {
      return {
        ...state,
        notices: {
          ...state.notices,
          messages: [payload, ...state.notices.messages],
        },
      };
    }

    case DEL_NOTICE_MSG: {
      return {
        ...state,
        notices: {
          ...state.notices,
          messages: state.notices.messages.filter(({ id }) => id !== payload),
        },
      };
    }

    case DEL_ALL_NOTICE_MSGS: {
      return {
        ...state,
        notices: {
          ...state.notices,
          messages: [],
        },
      };
    }

    case READ_NOTICE_MSG: {
      return {
        ...state,
        notices: {
          ...state.notices,
          messages: state.notices.messages.map((message) => {
            const { id } = message;

            if (id === payload) {
              message.read = true;
            }

            return message;
          }),
        },
      };
    }

    case READ_ALL_NOTICE_MSGS: {
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

    /**
     * Widget: Clan Reserves
     */
    case SET_WCR_DATA: {
      return {
        ...state,
        widgets: {
          ...state.widgets,
          clanReserves: {
            ...state.widgets.clanReserves,
            ...payload,
          },
        },
      };
    }

    case PUSH_WCR_ACTIVES: {
      return {
        ...state,
        widgets: {
          ...state.widgets,
          clanReserves: {
            ...state.widgets.clanReserves,
            actives: [...state.widgets.clanReserves.actives, payload],
          },
        },
      };
    }

    case FILTER_WCR_ACTIVES: {
      return {
        ...state,
        widgets: {
          ...state.widgets,
          clanReserves: {
            ...state.widgets.clanReserves,
            actives: payload,
          },
        },
      };
    }

    case FILTER_WCR_STATUS: {
      return {
        ...state,
        widgets: {
          ...state.widgets,
          clanReserves: {
            ...state.widgets.clanReserves,
            status: payload,
          },
        },
      };
    }

    default:
      return state;
  }
};
