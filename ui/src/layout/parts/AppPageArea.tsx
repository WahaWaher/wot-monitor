import styled from 'styled-components';
import Scrollbar from '@/components/common/Scrollbar';
import { FC } from 'react';

const AppContentArea: FC = ({ children, ...rest }) => (
  <Root {...rest}>
    <Scrollbar>{children}</Scrollbar>
  </Root>
);

const Root = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

export default AppContentArea;
