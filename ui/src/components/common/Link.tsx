import { mdiLink } from '@mdi/js';
import Icon from '@mdi/react';
import { FC } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  href?: string;
  className?: string;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
  as?: any;
  to?: string;
};

const Link: FC<Props> = ({ children, ...rest }) => (
  <Root {...rest}>
    <span>{children}</span>
    <IconContainer>
      <Icon path={mdiLink} />
    </IconContainer>
  </Root>
);

const Root = styled.a`
  ${({ theme: { palette } }) => css`
    color: ${palette.text.main};
    text-decoration: underline;
    &:hover {
      color: ${palette.accent.main};
    }
  `}
`;

const IconContainer = styled.span`
  ${css`
    display: inline-block;
    vertical-align: middle;
    width: 1.088em;
    height: 1.088em;
    margin-left: 0.15em;
  `}
`;

export default Link;
