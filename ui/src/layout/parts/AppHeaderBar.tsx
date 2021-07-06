import AccountBox from '@/components/common/AccountBox';
import Badge, { Props as BadgePropTypes } from '@/components/common/Badge';
import Box from '@/components/common/Box';
import ButtonHamburger from '@/components/common/ButtonHamburger';
import ButtonIconed from '@/components/common/ButtonIconed';
import TextBoxSmall from '@/components/common/TextBoxSmall';
import Col from '@/components/grid/Col';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import IconBell from '@/components/icons/IconBell';
import IconMonitor from '@/components/icons/IconMonitor';
import { useTheme } from '@/hooks';
import routes from '@/router/routes';
import { useStoreProfileActions } from '@/store/hooks/useStoreActions';
import {
  getAuth,
  getClanReserves,
  getCommonSettings,
  getMainDrawerOn,
  getProfileInfo,
  getUnreadNoticesCount,
} from '@/store/selectors/profileSelectors';
import { mdiFlash } from '@mdi/js';
import Icon from '@mdi/react';
import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

const AppHeaderBar: FC = () => (
  <Root>
    <Container>
      <Row>
        <Col className="flex-grow-1">
          <Box className="d-flex align-items-center h-100p">
            <ProfileInfoBox />
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

const ProfileInfoBox: FC = memo(() => {
  const { name } = useSelector(getProfileInfo);
  const { nick } = useSelector(getAuth);

  return (
    <TextBoxSmall>
      {nick ? <AccountBox text={nick} /> : `Профиль: ${name || '...'}`}
    </TextBoxSmall>
  );
});

const MonitoringButton: FC = memo(() => (
  <ButtonIconed
    as={NavLink}
    to={routes.monitoring.path}
    title="Мониторинг"
    renderInside={() => <MonitoringBadge />}
  >
    <IconMonitor width="20" height="20" />
  </ButtonIconed>
));

type BadgeVarsType = Partial<
  { [key in TrayIconTypes]: Partial<BadgePropTypes> }
>;

const badgeDotPos = { top: 8, right: 5 };
const badgeTypes: BadgeVarsType = {
  online: {
    type: 'success',
    withShadow: true,
    position: badgeDotPos,
  },
  offline: {
    type: 'text',
    withShadow: true,
    position: badgeDotPos,
  },
  warning: {
    type: 'warning',
    withShadow: true,
    position: badgeDotPos,
  },
  error: {
    type: 'danger',
    withShadow: true,
    position: badgeDotPos,
  },
  reserve: {
    type: 'empty',
    width: 15,
    height: 15,
    position: { top: 4, right: 0 },
  },
};

const MonitoringBadge: FC = () => {
  const { status } = useSelector(getClanReserves);
  const targetBadgeProps = badgeTypes[status!];

  if (!targetBadgeProps) return null;

  return (
    <Badge {...targetBadgeProps}>
      {status === 'reserve' && (
        <BadgeReserve>
          <Icon path={mdiFlash} />
        </BadgeReserve>
      )}
    </Badge>
  );
};

const BadgeReserve = styled.div`
  ${() => css`
    color: #97cd21;
  `}
`;

const NotificationsButton: FC = memo(() => {
  const { palette } = useTheme();
  const { showUnreadBadge } = useSelector(getCommonSettings);
  const unreadNoticesCount = useSelector(getUnreadNoticesCount);

  return (
    <ButtonIconed
      counter={showUnreadBadge ? unreadNoticesCount : null}
      counterColor={palette.text.light}
      counterBgColor={palette.accent.main}
      title="Уведомления"
      as={NavLink}
      to={routes.notifications.path}
    >
      <IconBell width="20" height="20" />
    </ButtonIconed>
  );
});

const MenuButton: FC = memo(() => {
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
