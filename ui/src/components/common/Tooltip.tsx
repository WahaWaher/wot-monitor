import ReactTooltip, { TooltipProps } from 'react-tooltip';
import styled, { css } from 'styled-components';
import { FC } from 'react';

interface Props extends TooltipProps {
  center?: boolean;
  maxWidth?: number;
  id?: string;
}

const defaultProps: Props = {
  center: false,
  maxWidth: 180,
};

const defaults: TooltipProps = {
  effect: 'solid',
  place: 'top',
  delayHide: 0,
  delayShow: 1250,
};

const Tooltip: FC<Props> = (props) => (
  <Root
    {...({
      ...defaults,
      ...props,
    })}
  />
);

const Root = styled(ReactTooltip)<Props>`
  ${({ center, maxWidth, theme: { palette, utils } }) => css`
    &.__react_component_tooltip {
      max-width: ${maxWidth && `${maxWidth}px`};
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

Tooltip.defaultProps = defaultProps;

export default Tooltip;
