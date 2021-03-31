import styled, { css } from 'styled-components';

const Row = (props) => <Root {...props} />;

const Root = styled.div`
  ${({ theme: { grid } }) => css`
    display: flex;
    flex-wrap: wrap;
    margin-right: -${grid.gutterWidth}px;
    margin-left: -${grid.gutterWidth}px;
  `}
`;

export default Row;
