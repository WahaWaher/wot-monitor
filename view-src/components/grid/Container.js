import styled, { css } from 'styled-components';

const Container = (props) => <Root {...props} />;

const Root = styled.div`
  ${({ theme: { grid } }) => css`
    width: 100%;
    padding-right: ${grid.gutterWidth}px;
    padding-left: ${grid.gutterWidth}px;
    margin-right: auto;
    margin-left: auto;
  `}
`;

export default Container;
