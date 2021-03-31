import styled from 'styled-components';
import Scrollbar from '@/components/common/Scrollbar';

const AppContentArea = ({ children, ...rest }) => (
  <Root {...rest}>
    <Scrollbar>{children}</Scrollbar>
  </Root>
);

const Root = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export default AppContentArea;
