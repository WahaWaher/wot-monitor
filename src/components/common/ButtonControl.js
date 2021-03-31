import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const buttonTypes = {
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

const ButtonControl = (props) => <Root {...props} />;

const Root = styled.button`
  ${({ type, theme: { palette, transitions } }) => css`
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 54px;
    height: 30px;
    ${buttonTypes[type]};
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

ButtonControl.propTypes = {
  type: PropTypes.oneOf(['normal', 'accent']),
  size: PropTypes.oneOf(['normal']),
};

ButtonControl.defaultProps = {
  type: 'normal',
  size: 'normal',
};

export default ButtonControl;
