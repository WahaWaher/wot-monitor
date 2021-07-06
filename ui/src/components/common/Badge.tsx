import styled, { css } from 'styled-components';
import { FC } from 'react';

export type Props = {
  type?: 'empty' | 'text' | 'accent' | 'success' | 'danger' | 'warning';
  variant?: 'dot' | 'square';
  width?: string | number;
  height?: string | number;
  withShadow?: boolean;
  position?: Partial<CSSPosition>;
};

const defaultProps: Props = {
  type: 'text',
  variant: 'dot',
  withShadow: false,
  width: 5,
  height: 5,
  position: {
    top: 0,
    right: 0,
    left: 'auto',
    bottom: 'auto',
  },
};

const Badge: FC<Props> = (props) => <Root {...props} />;

const Root = styled.div<Props>`
  ${({
    type,
    width,
    height,
    variant,
    position,
    withShadow,
    theme: { palette, utils },
  }) => {
    return css`
      position: absolute;
      ${position}
      width: ${width && utils.genSizes(width)};
      height: ${height && utils.genSizes(height)};
      border-radius: ${variant === 'dot' && '50%'};
      ${() => css`
        background-color: ${type && palette[type]?.main};
        box-shadow: ${withShadow &&
        `0 0 5px 1px ${type && utils.toRgba(palette[type]?.main, 0.5)}`};
      `}
    `;
  }}
`;

Badge.defaultProps = defaultProps;

export default Badge;
