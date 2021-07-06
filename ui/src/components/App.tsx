import AppHooks from '@/components/AppHooks';
import AppUpdaterModal from '@/components/special/AppUpdaterModal';
import AppContentArea from '@/layout/parts/AppContentArea';
import AppDrawer from '@/layout/parts/AppDrawer';
import AppHeader from '@/layout/parts/AppHeader';
import { AppRoutes } from '@/router';
import { FC } from 'react';
import styled, { css } from 'styled-components';

const App: FC = () => (
  <Root>
    <AppHooks />
    <AppHeader />
    <AppContentArea>
      <AppRoutes />
      <AppDrawer />
    </AppContentArea>
    <AppUpdaterModal />
  </Root>
);

const Root = styled.div`
  ${({ theme: { palette, fonts, typography } }) => css`
    display: flex;
    flex-direction: column;
    height: 100%;
    font-family: ${fonts.main};
    line-height: ${typography.lineHeight};
    color: ${palette.text.main};
    background-color: ${palette.background.main};
    overflow: hidden;
  `}
`;

export default App;
