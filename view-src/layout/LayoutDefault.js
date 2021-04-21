import styled from 'styled-components';
import AppHeaderBar from '@/layout/parts/AppHeaderBar';
import AppPageArea from '@/layout/parts/AppPageArea';

const LayoutDefault = ({ children, ...rest }) => (
  <Root {...rest}>
    <AppHeaderBar />
    <AppPageArea>{children}</AppPageArea>
  </Root>
);

const Root = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export default LayoutDefault;
