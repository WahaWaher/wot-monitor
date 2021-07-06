/**
 * Declarations
 */
declare module 'electron-reload';
declare module '*.json' {
  const value: any;
  export default value;
}

/**
 * Util types
 */
type Nullable<T> = T | null;
type EmptyObject = Record<any, never>;

/**
 * Specific global types
 */
type NoticeTypes = 'success' | 'error' | 'reserve';

type TrayIconTypes =
  | 'regular'
  | 'warning'
  | 'error'
  | 'online'
  | 'offline'
  | 'reserve';

type MessageTypes = 'info' | 'warning' | 'error' | 'reserve' | 'success';

type TargetReservesType =
  | 'ADDITIONAL_BRIEFING'
  | 'BATTLE_PAYMENTS'
  | 'MILITARY_MANEUVERS'
  | 'TACTICAL_TRAINING';
