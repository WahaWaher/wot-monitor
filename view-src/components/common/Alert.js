import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const alertTypes = {
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

const alertShapes = {
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

const Alert = (props) => <Root {...props} />;

const Root = styled.div`
  ${({ type, shape, center, dense, theme: { palette, utils } }) => css`
    cursor: default;
    font-size: ${dense ? '0.85rem' : '0.9rem'};
    text-align: ${center && 'center'};
    color: ${palette.text.main};
    background-color: ${utils.toRgba(palette.background.light, 0.35)};
    padding: ${dense ? '.25em .75em' : '1em 1.5em'};
    ${alertShapes[shape].css}
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
        ${alertTypes[type].css}
      `}
  `}
`;

Alert.propTypes = {
  type: PropTypes.oneOf(['normal', 'info', 'success', 'warning', 'danger']),
  shape: PropTypes.oneOf(['wide', 'compact']),
  center: PropTypes.bool,
  dense: PropTypes.bool,
};

Alert.defaultProps = {
  type: 'normal',
  shape: 'wide',
  center: false,
  dense: false,
};

export default Alert;
