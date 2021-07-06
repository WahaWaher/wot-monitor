export type ReservesStateType = {
  [key in TargetReservesType]?: ReservesItemType;
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

export type AppStoreProfile = {
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
      // nextExpectedUpdate: Nullable<number>;
      // isFetching: boolean;
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

export type AppStoreDefaultsType = {
  profiles: {
    [id in number]: AppStoreProfile;
  };
  commonState: {
    currentProfileID: number,
    lastMainWindowBounds: Nullable<object>,
  },
};
