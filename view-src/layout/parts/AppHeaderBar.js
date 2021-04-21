import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Box from '@/components/common/Box';
import TextBoxSmall from '@/components/common/TextBoxSmall';
import ButtonHamburger from '@/components/common/ButtonHamburger';
import ButtonIconed from '@/components/common/ButtonIconed';
import IconMonitor from '@/components/icons/IconMonitor';
import IconBell from '@/components/icons/IconBell';
import { useSelector } from 'react-redux';
import { useStoreProfileActions } from '@/store/hooks/useStoreActions';
import routes from '@/router/routes';
import { useTheme } from '@/hooks';
import {
  getProfileInfo,
  getMainDrawerOn,
  getAuth,
  getUnreadNoticesCount,
  getClanReserves,
  getCommonSettings,
} from '@/store/selectors/profileSelectors';
import Badge from '@/components/common/Badge';
import { mdiFlash } from '@mdi/js';
import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';

const AppHeaderBar = () => (
  <Root>
    <Container>
      <Row>
        <Col className="flex-grow-1">
          <Box className="d-flex align-items-center h-100p">
            <ProfileName />
          </Box>
        </Col>
        <Col>
          <Box className="d-flex align-items-center h-100p">
            <MonitoringButton />
            <NotificationsButton />
          </Box>
        </Col>
        <Col className="pl-0">
          <Box className="d-flex align-items-center h-100p">
            <MenuButton />
          </Box>
        </Col>
      </Row>
    </Container>
  </Root>
);

const AccountIcon = memo(({ text }) => (
  <span className="d-flex align-items-center">
    <Icon size={1.25} path={mdiAccountCircle} />{' '}
    <span className="ml-1">{text}</span>
  </span>
));

const ProfileName = memo(() => {
  const { name } = useSelector(getProfileInfo);
  const { nick } = useSelector(getAuth);

  return (
    <TextBoxSmall>
      {nick ? <AccountIcon text={nick} /> : `Профиль: ${name}`}
    </TextBoxSmall>
  );
});

const MonitoringButton = memo(() => (
  <ButtonIconed
    as={NavLink}
    to={routes.monitoring.path}
    title="Мониторинг"
    renderInside={() => <MonitoringBadge />}
  >
    <IconMonitor width="20" height="20" />
  </ButtonIconed>
));

const badgeDotPos = { top: 8, right: 5 };
const badgeTypes = {
  online: {
    type: 'success',
    position: badgeDotPos,
  },
  offline: {
    type: 'text',
    position: badgeDotPos,
  },
  warning: {
    type: 'warning',
    position: badgeDotPos,
  },
  error: {
    type: 'danger',
    position: badgeDotPos,
  },
  reserve: {
    type: 'empty',
    width: 15,
    height: 15,
    position: { top: 4, right: 0 },
  },
};

const MonitoringBadge = () => {
  const { status } = useSelector(getClanReserves);
  const target = badgeTypes[status];

  if (!target) return null;

  return (
    <Badge withShadow {...target}>
      {status === 'reserve' && (
        <BadgeReserve>
          <Icon path={mdiFlash} />
        </BadgeReserve>
      )}
    </Badge>
  );
};

const BadgeReserve = styled.div`
  ${({ theme: { palette, utils } }) => css`
    color: #97cd21;
  `}
`;

const NotificationsButton = memo(() => {
  const { palette } = useTheme();
  const { showUnreadBadge } = useSelector(getCommonSettings);
  const unreadNoticesCount = useSelector(getUnreadNoticesCount);

  return (
    <ButtonIconed
      as={NavLink}
      to={routes.notifications.path}
      counter={showUnreadBadge && unreadNoticesCount}
      counterColor={palette.text.light}
      counterBgColor={palette.accent.main}
      title="Уведомления"
    >
      <IconBell width="20" height="20" />
    </ButtonIconed>
  );
});

const MenuButton = memo(() => {
  const mainDrawerOn = useSelector(getMainDrawerOn);
  const { setMainDrawer } = useStoreProfileActions();

  return (
    <ButtonHamburger
      toggled={mainDrawerOn}
      toggle={() => setMainDrawer(!mainDrawerOn)}
      title="Главное меню"
    />
  );
});

const Root = styled.div`
  ${({ theme: { palette } }) => css`
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 45px;
    color: ${palette.text.light};
    background-color: ${palette.background.light};
    overflow: hidden;
  `}
`;

export default memo(AppHeaderBar);
