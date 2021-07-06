import { closeMainWindow, minimizeMainWindow } from '@/api/electronAPI';
import FavIcon from '@/assets/icons/favicon.png';
import Box from '@/components/common/Box';
import ButtonControl from '@/components/common/ButtonControl';
import Col from '@/components/grid/Col';
import Container from '@/components/grid/Container';
import Row from '@/components/grid/Row';
import IconClose from '@/components/icons/IconClose';
import IconMinimize from '@/components/icons/IconMinimize';
import { getCommonSettings } from '@/store/selectors/profileSelectors';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

const AppHeader: FC = () => {
  const { minimizeOnClose } = useSelector(getCommonSettings);

  return (
    <Root>
      <Container>
        <Row>
          <Col width={40}>
            <HeaderIcon>
              <img src={FavIcon} alt="logo" />
            </HeaderIcon>
          </Col>
          <Col className="flex-grow-1 pl-0">
            <HeaderTitle>WOT Monitor</HeaderTitle>
          </Col>
          <Col width={100} className="d-flex justify-content-end pr-0">
            <Box className="d-flex align-items-center h-100p">
              <ButtonControl
                onClick={minimizeMainWindow}
                title="Свернуть в трей"
              >
                <IconClose />
              </ButtonControl>
              <ButtonControl
                variant="accent"
                onClick={() =>
                  minimizeOnClose ? minimizeMainWindow() : closeMainWindow()
                }
                title={minimizeOnClose ? 'Свернуть в трей' : 'Закрыть'}
              >
                <IconMinimize />
              </ButtonControl>
            </Box>
          </Col>
        </Row>
      </Container>
    </Root>
  );
};

const Root = styled.div`
  ${({ theme: { palette } }) => css`
    height: 30px;
    display: flex;
    align-items: center;
    flex-shrink: 0;
    color: ${palette.text.light};
    line-height: 1;
    background-color: ${palette.background.extraDark};
    overflow: hidden;
    * {
      user-select: none;
    }
  `}
`;

const HeaderIcon = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
  img {
    display: block;
    width: 16px;
    height: 16px;
    margin: 0 auto;
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 0.85rem;
  -webkit-app-region: drag;
`;

export default AppHeader;
