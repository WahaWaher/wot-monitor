import { FC } from 'react';
import styled from 'styled-components';

const AppContentArea: FC = (props) => <Root {...props} />;

const Root = styled.div`
  height: 100%;
`;

export default AppContentArea;
