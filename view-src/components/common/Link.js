import styled, { css } from 'styled-components';
import Icon from '@mdi/react';
import { mdiLink } from '@mdi/js';

const Link = ({ children, ...rest }) => {
  return (
    <Root {...rest}>
      <Text>{children}</Text>
      <IconContainer>
        <Icon path={mdiLink} />
      </IconContainer>
    </Root>
  );
};

const Root = styled.a`
  ${({ theme: { palette } }) => css`
    color: ${palette.text.main};
    text-decoration: underline;
    &:hover {
      color: ${palette.accent.main};
    }
  `}
`;

const Text = styled.span`
  ${({ theme: { palette } }) => css``}
`;

const IconContainer = styled.span`
  ${({ theme: { palette } }) => css`
    display: inline-block;
    vertical-align: middle;
    width: 1em;
    height: 1em;
    margin-left: 0.15em;
  `}
`;

export default Link;
