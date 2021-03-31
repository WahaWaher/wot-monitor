import { useSelector } from 'react-redux';
import { useStoreProfileActions } from '@/store/hooks/useStoreActions';
import Drawer from '@/components/common/Drawer';
import SideMenu from '@/components/common/SideMenu';
import SideMenuListItem from '@/components/common/SideMenuListItem';
import Container from '@/components/grid/Container';
import TextBoxSmall from '@/components/common/TextBoxSmall';
import { NavLink } from 'react-router-dom';
import routes from '@/router/routes';

const AppDrawer = () => {
  const { setMainDrawerOpen } = useStoreProfileActions();
  const { mainDrawerOn } = useSelector((state) => state.profile.appState);

  return (
    <Drawer open={mainDrawerOn} onChange={setMainDrawerOpen}>
      <Container className="pt-3 pb-3 text-right">
        <TextBoxSmall>
          Профиль: <strong>Default</strong>
        </TextBoxSmall>
      </Container>
      <SideMenu>
        <MainMenuItem to={routes.home.path}>Главная</MainMenuItem>
        <MainMenuItem to={routes.auth.path}>Авторизация</MainMenuItem>
        <MainMenuItem to={routes.monitoring.path}>Мониторинг</MainMenuItem>
        <MainMenuItem to={routes.notifications.path}>Уведомления</MainMenuItem>
        <MainMenuItem to={routes.profiles.path}>Профиль</MainMenuItem>
        <MainMenuItem to={routes.settings.path}>Настройки</MainMenuItem>
        <MainMenuItem to={routes.about.path}>О программе</MainMenuItem>
      </SideMenu>
    </Drawer>
  );
};

const MainMenuItem = (props) => (
  <NavLink
    component={SideMenuListItem}
    activeClassName="active"
    exact
    {...props}
  />
);

export default AppDrawer;
