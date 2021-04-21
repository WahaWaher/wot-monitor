import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const safeTypes = ['text', 'accent', 'success', 'danger', 'warning'];

const Badge = (props) => <Root {...props} />;

const Root = styled.div`
  ${({
    type,
    width,
    height,
    color,
    variant,
    position,
    withShadow,
    theme: { palette, utils },
  }) => {
    return css`
      position: absolute;
      ${position}
      width: ${utils.genSizes(width)};
      height: ${utils.genSizes(height)};
      border-radius: ${variant === 'dot' && '50%'};
      ${safeTypes.includes(type)
        ? css`
            background-color: ${type !== 'flash' && palette[type]?.main};
            box-shadow: ${withShadow &&
            type !== 'flash' &&
            `0 0 5px 1px ${utils.toRgba(palette[type].main, 0.5)}`};
          `
        : css``}
    `;
  }}
`;

Badge.propTypes = {
  type: PropTypes.oneOf([
    'empty',
    'text',
    'accent',
    'success',
    'danger',
    'warning',
  ]),
  variant: PropTypes.oneOf(['dot', 'square']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  withShadow: PropTypes.bool,
};

Badge.defaultProps = {
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

export default Badge;
