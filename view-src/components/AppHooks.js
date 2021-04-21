import {
  useAuthChecker,
  useCRWidgetStarter,
  useCRWidgetActivesChecker,
  useCRWidgetAuthChecker,
  useCRWidgetStatusSetter,
  useTrayInfo,
  useMainProcessListeners,
} from '@/hooks';

const AppHooks = () => {
  useMainProcessListeners();
  useAuthChecker();
  useCRWidgetStarter();
  useCRWidgetActivesChecker();
  useCRWidgetAuthChecker();
  useCRWidgetStatusSetter();
  useTrayInfo();

  return null;
};

export default AppHooks;
