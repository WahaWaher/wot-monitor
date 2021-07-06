import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAuth,
  getClanReserves,
  getWCRSettings,
} from '@/store/selectors/profileSelectors';
import { getNowTimeStamp } from '@/utils/dates';
import {
  useStoreProfileActions,
  useStoreUpdateActions,
} from '@/store/hooks/useStoreActions';
import { formatReserveTimeLeft } from '@/utils/dates';
import { REACT_APP_AUTH_CHECK_TIIMEOUT } from '@/config';
import {
  isWorkingWithActives as isWorkingWithActivesSelector,
  isStoppedByError as isStoppedByErrorSelector,
  isWorkingWithError as isWorkingWithErrorSelector,
  isWorkingNoConnection as isWorkingNoConnectionSelector,
  isWorkingWithoutActives as isWorkingWithoutActivesSelector,
} from '@/store/selectors/profileSelectors';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { timeout } from '@/utils';
import { SET_WCR_DATA } from '@/store/constants/profileConstants';
import { debounce } from 'lodash-es';
import { setTrayTooltip } from '@/api/electronAPI';
import { trayTooltipNames } from '@/messages/data';
import { ipcRenderer } from '@/api/electronAPI';
import { useHistory } from 'react-router';
import { routes } from '@/router/routes';
import { getCommonSettings } from '@/store/selectors/profileSelectors';

const changeTrayIconDebounced = debounce((actionCreator, args) => {
  actionCreator(args);
}, 250);

export const useTheme = () => useContext(ThemeContext);

/**
 * useAppUpdater
 */
export const useAppUpdater = () => {
  const { setUpdate, checkForUpdates } = useStoreUpdateActions();
  const { checkUpdates } = useSelector(getCommonSettings);

  useEffect(() => {
    ipcRenderer.on('update-error', (e: any, errData: any) => {
      setUpdate({ error: errData, loading: false });
    });
    ipcRenderer.on('update-available', (e: any, info: any) => {
      setUpdate({
        available: true,
        loading: false,
        info,
      });
    });
    ipcRenderer.on('update-not-available', (e: any, info: any) => {
      setUpdate({
        available: false,
        loading: false,
        info,
      });
    });
    ipcRenderer.on('update-downloaded', (e: any, info: any) => {
      setUpdate({
        downloaded: true,
        progress: null,
        loading: false,
        info,
      });
    });
    ipcRenderer.on('update-download-progress', (e: any, progress: any) => {
      setUpdate({ progress });
    });

    return () => {
      [
        'update-error',
        'update-available',
        'update-not-available',
        'update-downloaded',
        'update-download-progress',
      ].map((channel) => ipcRenderer.removeAllListeners(channel));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (checkUpdates) {
      (async () => {
        await checkForUpdates();

        setUpdate({ isCheckOnStart: true });
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

/**
 * useMainProcessListeners
 */
export const useMainProcessListeners = () => {
  const history = useHistory();

  useEffect(() => {
    ipcRenderer.on('push-route-name', (e: any, { name }: any) => {
      history.push(routes[name]?.path);
    });

    ipcRenderer.on('send-renderer-log', (e: any, ...rest: any[]) => {
      console.log(...rest);
    });

    return () => {
      ['push-route-name', 'send-renderer-log'].map((channel) =>
        ipcRenderer.removeAllListeners(channel)
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

/**
 * useToggle
 */
export const useToggle = (val: boolean) => {
  const [on, setOn] = useState<boolean>(val);

  return {
    on,
    set: (value: boolean): void => setOn(value),
    toggle: () => setOn(!on),
  };
};

/**
 * useShowMore
 */
interface useShowMoreState {
  initial: number;
  toShow: number;
  items: object[]; // TODO: установить тип сообщения
}

export const useShowMore = (options?: useShowMoreState | {}) => {
  const defaults: useShowMoreState = {
    initial: 10,
    toShow: 10,
    items: [],
  };
  const sets = Object.assign(defaults, options);
  const [visible, setVisible] = useState<number>(sets.initial);

  return {
    visible,
    items: sets.items.slice(0, visible),
    hasMore: (): boolean => sets.items.length > visible,
    showMore: (): void => setVisible((visible) => visible + sets.toShow),
  };
};

/**
 * useMessage
 */
export const useMessage = (value: Nullable<string>) => {
  const [text, setText] = useState(value);

  return {
    text,
    set: (value: Nullable<string>): void => setText(value),
  };
};

/**
 * useInput
 */
export const useInput = (val: string) => {
  const [value, setValue] = useState<string>(val);

  return {
    value,
    setValue: (newValue: string): void => setValue(newValue),
  };
};

/**
 * useDialog
 */
interface useDialogAnswer {
  text?: string;
  onClick?: (e?: React.MouseEvent) => any;
  className?: string;
}

interface useDialogState {
  on: boolean;
  message: string;
  type: 'warning' | 'success' | 'error' | 'empty';
  answers: Array<useDialogAnswer>;
  renderMessage: Nullable<() => JSX.Element>;
}

export const useDialog = () => {
  const [dialog, setDialog] = useState<useDialogState>({
    on: false,
    message: '',
    type: 'warning',
    answers: [],
    renderMessage: null,
  });

  const open = (opts: useDialogState | {} = {}): void => {
    setDialog((state) => ({ ...state, ...opts, on: true }));
  };

  const close = (): void => {
    setDialog((state) => ({ ...state, on: false }));
  };

  return {
    on: dialog.on,
    state: dialog,
    open,
    close,
    renderDialog: () => {
      return (
        <Modal
          isOpen={dialog.on}
          setOpen={close}
          type={dialog.type}
          renderControls={() => (
            <>
              {dialog.answers.map(({ text, ...props }, key) => (
                <Button className="mx-1" wide key={key} {...props}>
                  {text}
                </Button>
              ))}
            </>
          )}
        >
          {dialog.renderMessage ? dialog.renderMessage() : dialog.message}
        </Modal>
      );
    },
  };
};

/**
 * useAuthChecker
 */
export const useAuthChecker = () => {
  const { unsetProfileAuth } = useStoreProfileActions();
  const { expires } = useSelector(getAuth);

  useEffect(() => {
    if (!expires) {
      return;
    }

    const authTimer = setInterval(() => {
      const now = getNowTimeStamp();

      if (now > expires) {
        unsetProfileAuth();
        clearInterval(authTimer);
      }
    }, Number(REACT_APP_AUTH_CHECK_TIIMEOUT));

    return () => clearInterval(authTimer);
  }, [expires, unsetProfileAuth]);
};

/**
 * useCRWidgetStarter
 */
export const useCRWidgetStarter = () => {
  const { on } = useSelector(getClanReserves);
  const { startOnOpen } = useSelector(getWCRSettings);
  const { startCRWidget } = useStoreProfileActions();

  useEffect(() => {
    if (on || startOnOpen) {
      startCRWidget({ force: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

/**
 * useCRWidgetActivesChecker
 */
export const useCRWidgetActivesChecker = () => {
  const { on } = useSelector(getClanReserves);
  const { actives } = useSelector(getClanReserves);
  const { filterCRWidgetActives } = useStoreProfileActions();

  useEffect(() => {
    if (on) {
      const tik = () => {
        const hasOutdated = actives.some(
          ({ active_till }: { [key: string]: any }) =>
            active_till < getNowTimeStamp()
        );

        if (hasOutdated) {
          filterCRWidgetActives();
        }
      };

      const timer = setInterval(tik, 1000);

      tik();

      return () => clearInterval(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [on, actives]);
};

/**
 * useCRWidgetAuthChecker
 */
export const useCRWidgetAuthChecker = () => {
  const { nextExpectedUpdate } = useSelector(getClanReserves);
  const { token } = useSelector(getAuth);
  const { stopCRWidget } = useStoreProfileActions();

  useEffect(() => {
    if (!token && nextExpectedUpdate) {
      timeout(1000).then(() => {
        if (!window?.timerCRW?.stopped) {
          stopCRWidget({ error: {} });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, nextExpectedUpdate]);
};

/**
 * useCRWidgetRefreshCounter
 */
export const useCRWidgetRefreshCounter = () => {
  const { on } = useSelector(getClanReserves);
  const { nextExpectedUpdate, isFetching } = useSelector(getClanReserves);
  const [counter, setcounter] = useState<Nullable<string>>(null);

  useEffect(() => {
    const tik = () => {
      let time;
      const now = getNowTimeStamp();
      const isExpectedTimeUp = nextExpectedUpdate! <= now;

      if (nextExpectedUpdate && !isExpectedTimeUp) {
        time = formatReserveTimeLeft(nextExpectedUpdate, {
          format: ['hours', 'minutes', 'seconds'],
        });
      }

      if (!on) {
        return setcounter(null);
      }

      if (isExpectedTimeUp || isFetching || !time) {
        return setcounter('loading');
      }

      setcounter(time);
    };

    const counter = setInterval(tik, 1000);

    tik();

    return () => {
      clearInterval(counter);
      setcounter(null);
    };
  }, [on, nextExpectedUpdate, isFetching]);

  return { counter, setcounter };
};

/**
 * useCRWidgetStatusSetter
 */
export const useCRWidgetStatusSetter = () => {
  const isWorkingWithActives = useSelector(isWorkingWithActivesSelector);
  const isStoppedByError = useSelector(isStoppedByErrorSelector);
  const isWorkingNoConnection = useSelector(isWorkingNoConnectionSelector);
  const isWorkingWithError = useSelector(isWorkingWithErrorSelector);
  const isWorkingWithoutActives = useSelector(isWorkingWithoutActivesSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    let status: TrayIconTypes = 'regular';

    // widget working (no reserves)
    if (isWorkingWithoutActives) {
      status = 'online';
    }

    // widget working (active reserves)
    if (isWorkingWithActives) {
      status = 'reserve';
    }

    // widget working (no connection)
    if (isWorkingNoConnection) {
      status = 'offline';
    }

    // widget working with http client error
    if (isWorkingWithError) {
      status = 'warning';
    }

    // widget stopped by fatal error
    if (isStoppedByError) {
      status = 'error';
    }

    dispatch({
      type: SET_WCR_DATA,
      payload: { status },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isWorkingWithoutActives,
    isWorkingNoConnection,
    isWorkingWithActives,
    isWorkingWithError,
    isStoppedByError,
  ]);
};

/**
 * useTrayInfo
 */
export const useTrayInfo = () => {
  const { status } = useSelector(getClanReserves);
  const { changeTrayIcon } = useStoreProfileActions();

  useEffect(() => {
    changeTrayIconDebounced(changeTrayIcon, status);
    setTrayTooltip(trayTooltipNames[status!]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);
};
