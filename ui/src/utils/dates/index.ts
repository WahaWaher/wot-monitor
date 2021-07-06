import { formatDuration, fromUnixTime, intervalToDuration } from 'date-fns';
import format from 'date-fns/format';
import getUnixTime from 'date-fns/getUnixTime';

type DistanceLocaleType = 'xSeconds' | 'xMinutes' | 'xHours';
type DateTransformOptionsType = {
  format?: string[] | undefined;
  zero?: boolean | undefined;
  delimiter?: string | undefined;
  locale?: Locale | undefined;
};

const defaultOptions: DateTransformOptionsType = {
  format: ['hours', 'minutes'],
  locale: {
    formatDistance: (token: DistanceLocaleType, count: string) => {
      const formatDistanceLocale = {
        xSeconds: '{{count}} сек',
        xMinutes: '{{count}} мин',
        xHours: '{{count}} ч',
      };

      return formatDistanceLocale[token].replace('{{count}}', count);
    },
  },
};

/**
 * getNowTimeStamp
 */
export const getNowTimeStamp = (): number => getUnixTime(new Date());

/**
 * fromatDateFromTimeStamp
 */
export const fromatDateFromTimeStamp = (
  timestamp: number,
  f: string = 'dd.MM.yyyy HH:mm:ss'
): string => (timestamp ? format(fromUnixTime(timestamp), f) : '');

/**
 * formatSeconds
 */
export const formatSeconds = (
  seconds: number,
  opts: DateTransformOptionsType | {} = {}
): string => {
  const options: DateTransformOptionsType = {
    ...defaultOptions,
    ...opts,
  };

  return formatDuration(
    intervalToDuration({ start: 0, end: seconds * 1000 }),
    options
  );
};

/**
 * formatReserveTimeLeft
 */
export const formatReserveTimeLeft = (
  till: number,
  opts: DateTransformOptionsType | {} = {}
): string | undefined => {
  if (!till) return;

  const options: DateTransformOptionsType = {
    ...defaultOptions,
    ...opts,
  };

  return formatDuration(
    intervalToDuration({ start: fromUnixTime(till), end: new Date() }),
    options
  );
};
