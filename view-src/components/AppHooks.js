import {
  useAuthChecker,
  useCRWidgetStarter,
  useCRWidgetActivesChecker,
  useCRWidgetAuthChecker,
  useCRWidgetStatusSetter,
  useTrayInfo,
  useMainProcessListeners,
  useAppUpdater,
} from '@/hooks';

const AppHooks = () => {
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
