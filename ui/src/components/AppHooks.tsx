import {
  useAppUpdater,
  useAuthChecker,
  useCRWidgetActivesChecker,
  useCRWidgetAuthChecker,
  useCRWidgetStarter,
  useCRWidgetStatusSetter,
  useMainProcessListeners,
  useTrayInfo,
} from '@/hooks';
import { FC } from 'react';

const AppHooks: FC = () => {
  useMainProcessListeners();
  useAppUpdater();
  useAuthChecker();
  useCRWidgetStarter();
  useCRWidgetActivesChecker();
  useCRWidgetAuthChecker();
  useCRWidgetStatusSetter();
  useTrayInfo();

  return null;
};

export default AppHooks;
