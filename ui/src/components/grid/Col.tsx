import { FC } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  width?: string | number;
  height?: string | number;
  className?: string;
};

const defaultProps: Props = {
  width: 'auto',
  height: 'auto',
};

const Col: FC<Props> = (props) => <Root {...props} />;

const Root = styled.div<Props>`
  ${({ width, height, theme: { grid, utils } }) => css`
    width: $width && {utils.genSizes(width)};
    height: ${height && utils.genSizes(height)};
    min-width: 0;
    max-width: 100%;
    position: relative;
    padding-right: ${grid.gutterWidth}px;
    padding-left: ${grid.gutterWidth}px;
  `}
`;

Col.defaultProps = defaultProps;

export default Col;
