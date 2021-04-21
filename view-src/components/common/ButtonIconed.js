import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Tooltip from '@/components/common/Tooltip';

const sizes = {
  md: {
    width: 45,
    height: 45,
  },
  sm: {
    width: 25,
    height: 25,
  },
};

const types = {
  normal: {
    css: css`
      ${({ size, active, activeClassName, theme: { utils, palette } }) => css`
        background: ${active && utils.toRgba(palette.background.main, 0.75)};
        &.${activeClassName} {
          background: ${utils.toRgba(palette.background.main, 0.5)};
        }
        &:hover {
          background: ${utils.toRgba(palette.background.main, 0.5)};
        }
        &:active {
          background: ${utils.toRgba(palette.background.main, 0.75)};
        }
      `}
    `,
  },
  light: {
    css: css`
      ${({ size, active, activeClassName, theme: { utils, palette } }) => css`
        background: ${active && utils.toRgba(palette.background.light, 0.75)};
        &.${activeClassName} {
          background: ${utils.toRgba(palette.background.light, 1)};
        }
        &:hover {
          background: ${utils.toRgba(palette.background.light, 1)};
        }
        &:active {
          background: ${utils.toRgba(palette.background.light, 0.75)};
        }
      `}
    `,
  },
};

const isCounterOn = (counter) => typeof counter === 'number' && counter > 0;

const ButtonIconed = (props) => {
  const {
    counter,
    counterColor,
    counterBgColor,
    counterPosition,
    renderIcon,
    renderInside,
    tooltip,
    children,
    ...rest
  } = props;

  return (
    <Root {...rest} data-tip data-for={tooltip}>
      {renderIcon ? renderIcon() : children}
      {isCounterOn(counter) && (
        <Counter
          {...{ counter, counterColor, counterBgColor, counterPosition }}
        >
          {counter}
        </Counter>
      )}
      {renderInside && renderInside()}
      {tooltip && <Tooltip id={tooltip}>{tooltip}</Tooltip>}
    </Root>
  );
};

const disabledStyles = css`
  cursor: default;
  pointer-events: none;
  opacity: 0.35;
`;

const Root = styled.a`
  ${({ size, disabled, type, theme: { palette, transitions, utils } }) => css`
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${sizes[size].width}px;
    height: ${sizes[size].height}px;
    color: ${palette.text.main};
    border: none;
    background: transparent;
    padding: 0.3em;
    position: relative;
    user-select: none;
    transition: all ${transitions.duration.main}s;
    ${disabled && disabledStyles}
    svg {
      fill: currentColor;
    }
    ${types[type].css};
  `}
`;

const Counter = styled.div`
  ${({ counterColor, counterBgColor, counterPosition, theme: { utils } }) => {
    const { top, bottom, left, right } = counterPosition;

    return css`
      display: flex;
      align-items: center;
      justify-content: center;
      width: 15px;
      height: 15px;
      border: none;
      border-radius: 50%;
      position: absolute;
      top: ${top && utils.genSizes(top)};
      bottom: ${bottom && utils.genSizes(bottom)};
      left: ${left && utils.genSizes(left)};
      right: ${right && utils.genSizes(right)};
      font-size: 0.62rem;
      color: ${counterColor};
      font-weight: 700;
      line-height: 1;
      background: ${counterBgColor};
      overflow: hidden;
    `;
  }}
`;

ButtonIconed.propTypes = {
  size: PropTypes.oneOf(['sm', 'md']),
  type: PropTypes.oneOf(['normal', 'light']),
  disabled: PropTypes.bool,
  counter: PropTypes.number,
  counterColor: PropTypes.string,
  counterBgColor: PropTypes.string,
  counterPosition: PropTypes.object,
  tooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  renderIcon: PropTypes.func,
  renderInside: PropTypes.func,
  active: PropTypes.bool,
  activeClassName: PropTypes.string,
};

ButtonIconed.defaultProps = {
  size: 'md',
  type: 'normal',
  disabled: false,
  counter: 0,
  counterColor: null,
  counterBgColor: null,
  counterPosition: {
    top: 5,
    right: 5,
  },
  tooltip: null,
  renderIcon: null,
  renderInside: null,
  activeClassName: 'is-active',
};

export default ButtonIconed;
