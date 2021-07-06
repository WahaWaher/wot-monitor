import styled, { css } from 'styled-components';
import { FC } from 'react';

type Props = {
  verticalAlign?: boolean;
  basicFrame?: boolean;
};

const defaultProps: Props = {
  verticalAlign: false,
  basicFrame: false,
};

const PageFrame: FC<Props> = ({ children, ...rest }) => (
  <Root {...rest}>
    <Wrap>{children}</Wrap>
  </Root>
);

const Root = styled.div<Props>`
  ${({ verticalAlign, basicFrame }) => css`
    width: 100%;
    ${verticalAlign &&
    css`
      display: flex;
      align-items: center;
      flex-flow: wrap;
    `}
    ${basicFrame &&
    css`
      ${Wrap} {
        padding-top: 15px;
        padding-bottom: 15px;
      }
    `}
  `}
`;

const Wrap = styled.div`
  width: 100%;
`;

PageFrame.defaultProps = defaultProps;

export default PageFrame;
