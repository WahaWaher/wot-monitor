import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import Box from '@/components/common/Box';
import TextBoxSmall from '@/components/common/TextBoxSmall';
import Loader from '@/components/common/Loader';
import ButtonHamburger from '@/components/common/ButtonHamburger';
import ButtonIconed from '@/components/common/ButtonIconed';
import IconMonitor from '@/components/icons/IconMonitor';
import IconBell from '@/components/icons/IconBell';
import { useSelector } from 'react-redux';
import { useStoreProfileActions } from '@/store/hooks/useStoreActions';
import routes from '@/router/routes';
import { useTheme } from '@/hooks';
import {
  getProfileIsLoading,
  getProfileName,
  getMainDrawerOn,
} from '@/store/selectors/profileSelectors';

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

const ProfileName = memo(() => {
  const profileIsLoading = useSelector(getProfileIsLoading);
  const name = useSelector(getProfileName);

  return profileIsLoading ? (
    <Loader />
  ) : (
    <TextBoxSmall>Профиль: {name}</TextBoxSmall>
  );
});

const MonitoringButton = memo(() => (
  <ButtonIconed as={NavLink} to={routes.monitoring.path} title="Мониторинг">
    <IconMonitor width="20" height="20" />
  </ButtonIconed>
));

const NotificationsButton = memo(() => {
  const { palette } = useTheme();

  return (
    <ButtonIconed
      as={NavLink}
      to={routes.notifications.path}
      counter={99}
      counterColor={palette.text.light}
      counterBgColor={palette.accent.main}
      title="Оповещения"
    >
      <IconBell width="20" height="20" />
    </ButtonIconed>
  );
});

const MenuButton = memo(() => {
  const mainDrawerOn = useSelector(getMainDrawerOn);
  const { setMainDrawerOpen } = useStoreProfileActions();

  return (
    <ButtonHamburger
      toggled={mainDrawerOn}
      toggle={() => setMainDrawerOpen(!mainDrawerOn)}
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
