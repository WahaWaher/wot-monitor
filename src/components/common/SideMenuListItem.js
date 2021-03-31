import styled, { css } from 'styled-components';

const SideMenuListItem = ({ href, active, children, ...rest }) => (
  <Root {...rest}>
    <Item href={href} active={active}>
      {children}
    </Item>
  </Root>
);

const Root = styled.li`
  ${({ theme: { palette, transitions, utils } }) => css`
    display: block;
    width: 100%;
    position: relative;
    &::before,
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      opacity: 0;
      transition: all ${transitions.duration.main * 1.5}s;
    }
    &::before {
      left: 0;
      background-image: linear-gradient(
        to right,
        transparent 22%,
        ${utils.toRgba(palette.accent.main, 0.25)}
      );
    }
    &::after {
      content: '';
      width: 2px;
      background-color: ${utils.darken(palette.accent.main, 5)};
    }
    &.active,
    &:hover {
      &::before,
      &::after {
        opacity: 1;
      }
    }
    &:active {
      &::before,
      &::after {
        opacity: 0.75;
        transition: all ${transitions.duration.main}s;
      }
    }
  `}
`;

const Item = styled.a`
  ${({ theme: { palette, grid, transitions, fonts } }) => css`
    font-family: ${fonts.sub};
    display: block;
    width: 100%;
    color: ${palette.text.main};
    text-align: right;
    font-weight: 400;
    font-size: 1.05rem;
    text-decoration: none;
    padding: 0.75rem ${grid.gutterWidth}px;
    transition: all ${transitions.duration.main}s;
    position: relative;
  `}
`;

export default SideMenuListItem;
