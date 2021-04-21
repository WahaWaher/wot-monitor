import { formatDuration, fromUnixTime, intervalToDuration } from 'date-fns';
import format from 'date-fns/format';
import getUnixTime from 'date-fns/getUnixTime';

const defaultOptions = {
  format: ['hours', 'minutes'],
  locale: {
    formatDistance: (token, count) => {
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
export const getNowTimeStamp = () => getUnixTime(new Date());

/**
 * fromatDateFromTimeStamp
 */
export const fromatDateFromTimeStamp = (
  timestamp = 0,
  f = 'dd.MM.yyyy HH:mm:ss'
) => {
  return timestamp ? format(fromUnixTime(timestamp), f) : '';
};

/**
 * formatSeconds
 */
export const formatSeconds = (seconds, opts = {}) => {
  const options = {
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
export const formatReserveTimeLeft = (till, opts = {}) => {
  if (!till) return;

  const options = {
    ...defaultOptions,
    ...opts,
  };

  return formatDuration(
    intervalToDuration({ start: fromUnixTime(till), end: new Date() }),
    options
  );
};
