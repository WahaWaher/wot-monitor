import { FC } from 'react';
import styled, { css, CSSProp } from 'styled-components';

type TypeProp = 'normal' | 'info' | 'success' | 'warning' | 'danger';
type ShapeProp = 'wide' | 'compact';

export type Props = {
  type?: TypeProp;
  shape?: ShapeProp;
  center?: boolean;
  dense?: boolean;
  className?: string;
};

const defaultProps: Props = {
  type: 'normal',
  shape: 'wide',
  center: false,
  dense: false,
};

const alertTypes: { [key in TypeProp]: { css: CSSProp } } = {
  normal: {
    css: css``,
  },
  success: {
    css: css`
      ${({ theme: { palette } }) => css`
        &::before {
          background-color: ${palette.success.main};
        }
      `}
    `,
  },
  info: {
    css: css`
      ${({ theme: { palette } }) => css`
        &::before {
          background-color: ${palette.background.light};
        }
      `}
    `,
  },
  warning: {
    css: css`
      ${({ theme: { palette } }) => css`
        &::before {
          background-color: ${palette.warning.main};
        }
      `}
    `,
  },
  danger: {
    css: css`
      ${({ theme: { palette } }) => css`
        &::before {
          background-color: ${palette.danger.main};
        }
      `}
    `,
  },
};

const alertShapes: { [key in ShapeProp]: { css: CSSProp } } = {
  wide: {
    css: css`
      display: block;
      width: 100%;
    `,
  },
  compact: {
    css: css`
      display: block;
      max-width: 225px;
      margin: 0 auto;
    `,
  },
};

const Alert: FC<Props> = (props) => <Root {...props} />;

const Root = styled.div<Props>`
  ${({ type, shape, center, dense, theme: { palette, utils } }) => css`
    cursor: default;
    font-size: ${dense ? '0.85rem' : '0.9rem'};
    text-align: ${center && 'center'};
    color: ${palette.text.main};
    background-color: ${utils.toRgba(palette.background.light, 0.35)};
    padding: ${dense ? '.25em .75em' : '1em 1.5em'};
    ${alertShapes[shape!].css}
    ${() =>
      type !== 'normal' &&
      css`
        position: relative;
        &::before {
          content: '';
          display: block;
          width: 2px;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
        }
        ${alertTypes[type!].css}
      `}
  `}
`;

Alert.defaultProps = defaultProps;

export default Alert;
