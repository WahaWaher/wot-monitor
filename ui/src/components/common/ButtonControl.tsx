import React, { FC } from 'react';
import styled, { css, CSSProp } from 'styled-components';

type Variant = 'normal' | 'accent';

type Props = {
  variant?: Variant;
  size?: 'normal';
  onClick?: (e?: React.MouseEvent) => void;
  title?: string;
};

const defaultProps: Props = {
  variant: 'normal',
  size: 'normal',
};

const buttonTypes: { [key in Variant]: CSSProp } = {
  normal: css`
    ${({ theme: { palette, utils } }) => css`
      color: ${palette.text.main};
      background: ${palette.background.extraDark};
      &:hover {
        background: ${utils.toRgba(palette.background.light, 0.3)};
      }
      &:active {
        background: ${utils.darken(palette.background.light, 5)};
      }
    `}
  `,
  accent: css`
    ${({ theme: { palette, utils } }) => css`
      color: ${palette.text.main};
      background: ${palette.background.extraDark};
      &:hover {
        background: ${utils.toRgba(palette.accent.main, 1)};
      }
      &:active {
        background: ${utils.darken(palette.accent.main, 5)};
      }
    `}
  `,
};

const ButtonControl: FC<Props> = (props) => <Root {...props} />;

const Root = styled.button<Props>`
  ${({ variant, theme: { palette, transitions } }) => css`
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 54px;
    height: 30px;
    ${buttonTypes[variant!]};
    border: none;
    padding: 0.5em;
    transition: all ${transitions.duration.main}s;
    svg {
      fill: ${palette.text.light};
      width: 100%;
      height: 100%;
    }
  `}
`;

ButtonControl.defaultProps = defaultProps;

export default ButtonControl;
