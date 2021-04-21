import { useSelector } from 'react-redux';
import { useStoreProfileActions } from '@/store/hooks/useStoreActions';
import Drawer from '@/components/common/Drawer';
import SideMenu from '@/components/common/SideMenu';
import SideMenuListItem from '@/components/common/SideMenuListItem';
import Container from '@/components/grid/Container';
import TextBoxSmall from '@/components/common/TextBoxSmall';
import { NavLink } from 'react-router-dom';
import routes from '@/router/routes';
import {
  getAppState,
  getProfileInfo,
} from '@/store/selectors/profileSelectors';
import { timeout } from '@/utils';

const AppDrawer = () => {
  const { setMainDrawer } = useStoreProfileActions();
  const { mainDrawerOn } = useSelector(getAppState);
  const { name } = useSelector(getProfileInfo);

  return (
    <Drawer open={mainDrawerOn} onChange={setMainDrawer}>
      <Container className="pt-3 pb-3 text-right">
        <TextBoxSmall>
          Профиль: <strong>{name}</strong>
        </TextBoxSmall>
      </Container>
      <SideMenu>
        <MainMenuItem to={routes.monitoring.path}>Мониторинг</MainMenuItem>
        <MainMenuItem to={routes.notifications.path}>Уведомления</MainMenuItem>
        <MainMenuItem to={routes.auth.path}>Аутентификация</MainMenuItem>
        <MainMenuItem to={routes.profiles.path}>Профиль</MainMenuItem>
        <MainMenuItem to={routes.settings.path}>Настройки</MainMenuItem>
        <MainMenuItem to={routes.about.path}>О программе</MainMenuItem>
      </SideMenu>
    </Drawer>
  );
};

const MainMenuItem = (props) => {
  const { closeMainDrawer } = useStoreProfileActions();

  return (
    <NavLink
      component={SideMenuListItem}
      activeClassName="active"
      exact
      onClick={() => timeout(25).then(closeMainDrawer)}
      {...props}
    />
  );
};

export default AppDrawer;
