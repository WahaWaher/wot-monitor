import Tooltip from '@/components/common/Tooltip';
import { FC, MouseEventHandler } from 'react';
import styled, { css, CSSProp } from 'styled-components';

type Size = 'sm' | 'md';
type Type = 'normal' | 'light';

interface Props {
  size?: Size;
  type?: Type;
  disabled?: boolean;
  counter?: Nullable<number>;
  counterColor?: Nullable<string>;
  counterBgColor?: Nullable<string>;
  counterPosition?: {
    top?: number | string;
    bottom?: number | string;
    left?: number | string;
    right?: number | string;
  };
  tooltip?: Nullable<string>;
  renderIcon?: Nullable<() => JSX.Element>;
  renderInside?: Nullable<() => JSX.Element>;
  active?: boolean;
  activeClassName?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  as?: any;
  to?: any;
  title?: string;
}

const defaultProps: Props = {
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
  onClick: () => {},
};

const sizes: { [key in Size]: { width: number; height: number } } = {
  md: {
    width: 45,
    height: 45,
  },
  sm: {
    width: 25,
    height: 25,
  },
};

const types: { [key in Type]: { css: CSSProp } } = {
  normal: {
    css: css`
      ${({
        active,
        activeClassName,
        theme: { utils, palette },
      }: SCPropsAndTheme<Props>) => css`
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
      ${({
        active,
        activeClassName,
        theme: { utils, palette },
      }: SCPropsAndTheme<Props>) => css`
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

const isCounterOn = (counter: number | undefined | null): boolean => {
  return typeof counter === 'number' && counter > 0;
};

const ButtonIconed: FC<Props> = (props) => {
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

const disabledStyles: CSSProp = css`
  cursor: default;
  pointer-events: none;
  opacity: 0.35;
`;

const Root = styled.a<Props>`
  ${({
    size,
    disabled,
    type,
    theme: { palette, transitions },
  }: SCPropsAndTheme<Props>) => css`
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${sizes[size!].width}px;
    height: ${sizes[size!].height}px;
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
    ${types[type!].css};
  `}
`;

const Counter = styled.div`
  ${({
    counterColor,
    counterBgColor,
    counterPosition,
    theme: { utils },
  }: SCPropsAndTheme<Props>) => {
    const { top, bottom, left, right } = counterPosition!;

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

ButtonIconed.defaultProps = defaultProps;

export default ButtonIconed;
