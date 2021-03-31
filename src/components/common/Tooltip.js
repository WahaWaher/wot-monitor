import ReactTooltip from 'react-tooltip';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const defaults = {
  effect: 'solid',
  place: 'top',
  delayHide: 0,
  delayShow: 1250,
};

const Tooltip = (props) => (
  <Root
    {...{
      ...defaults,
      ...props,
    }}
  />
);

const Root = styled(ReactTooltip)`
  ${({ center, theme: { palette, utils } }) => css`
    &.__react_component_tooltip {
      max-width: 180px;
      font-size: 0.81rem;
      line-height: 1.2;
      text-align: ${center && 'center'};
      color: ${palette.text.main};
      border-radius: 3px !important;
      border: none;
      border-radius: 1px;
      padding: 12px 12px;
    }
    // Animation
    &.__react_component_tooltip {
      transition: opacity 0.15s ease !important;
      opacity: 0 !important;
      visibility: visible;
    }

    &.__react_component_tooltip.show {
      visibility: visible;
      opacity: 1 !important;
    }
    &.type-dark {
      background: ${utils.toRgba(utils.lighten('#171717', 0), 0.98)};
      &.place-top {
        &::after {
          border-top-color: ${utils.toRgba(utils.lighten('#171717', 0), 0.98)};
        }
      }
      &.place-bottom {
        &::after {
          border-bottom-color: ${utils.toRgba(
            utils.lighten('#171717', 0),
            0.98
          )};
        }
      }
      &.place-left {
        &::after {
          border-left-color: ${utils.toRgba(utils.lighten('#171717', 0), 0.98)};
        }
      }
      &.place-right {
        &::after {
          border-right-color: ${utils.toRgba(
            utils.lighten('#171717', 0),
            0.98
          )};
        }
      }
    }
  `}
`;

Tooltip.propTypes = {
  center: PropTypes.bool,
};

Tooltip.defaultProps = {
  center: false,
};

export default Tooltip;
