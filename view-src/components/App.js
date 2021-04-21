import { AppRoutes } from '@/router';
import styled, { css } from 'styled-components';
import AppHeader from '@/layout/parts/AppHeader';
import AppDrawer from '@/layout/parts/AppDrawer';
import AppContentArea from '@/layout/parts/AppContentArea';
import AppHooks from './AppHooks';

const App = () => (
  <Root>
    <AppHooks />
    <AppHeader />
    <AppContentArea>
      <AppRoutes />
      <AppDrawer />
    </AppContentArea>
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
