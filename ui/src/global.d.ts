import { RootStateType } from '@/store';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { DefaultTheme } from 'styled-components';
import {
  ADDITIONAL_BRIEFING,
  BATTLE_PAYMENTS,
  MILITARY_MANEUVERS,
  TACTICAL_TRAINING,
} from '@/constants';

declare global {
  type Nullable<T> = T | null;
  
  type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
  };

  type EmptyObject = Record<any, never>;
  type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
  type SCPropsAndTheme<P> = P & { theme: DefaultTheme };
  type ThunkBaseAction<R> = ThunkAction<R, RootStateType, unknown, AnyAction>;
  type ThunkVoidAction = ThunkAction<void, RootStateType, unknown, AnyAction>;

  export type Thunk<R> = ThunkAction<R, AppState, undefined, Action>;

  type CSSPosition = {
    top: number | string;
    bottom: number | string;
    left: number | string;
    right: number | string;
  };

  interface Window {
    timerCRW: any;
  }

  type NoticeTypes = 'success' | 'error' | 'reserve';

  type TrayIconTypes =
    | 'regular'
    | 'warning'
    | 'error'
    | 'online'
    | 'offline'
    | 'reserve';

    type MessageTypes =
    | 'info'
    | 'warning'
    | 'error'
    | 'reserve'
    | 'success';

  type TargetReservesType =
    | typeof ADDITIONAL_BRIEFING
    | typeof BATTLE_PAYMENTS
    | typeof MILITARY_MANEUVERS
    | typeof TACTICAL_TRAINING;
}
