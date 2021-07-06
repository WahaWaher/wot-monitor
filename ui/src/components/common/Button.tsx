import React, { FC } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  wide?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const defaultProps: Props = {
  wide: false,
  disabled: false,
};

const Button: FC<Props> = (props) => <Root {...props} />;

const Root = styled.a<Props>`
  ${({ wide, disabled, theme: { palette, transitions, utils } }) => css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: ${disabled ? 'default' : 'pointer'};
    width: ${wide && '100%'};
    min-height: 29px;
    font-size: 0.9rem;
    color: ${palette.text.main};
    text-decoration: none;
    border: 1px solid ${palette.background.light};
    background-color: transparent;
    padding: 0.3rem 1em;
    transition: all ${transitions.duration.main}s;
    pointer-events: ${disabled && 'none'};
    opacity: ${disabled && '.5'};
    &:hover,
    &:focus {
      background-color: ${utils.toRgba(palette.background.light, 0.25)};
    }
    &:active {
      background-color: ${utils.toRgba(palette.background.light, 0.5)};
    }
  `}
`;

Button.defaultProps = defaultProps;

export default Button;
