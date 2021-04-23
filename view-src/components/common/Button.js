import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Button = (props) => <Root {...props} />;

const Root = styled.a`
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

Button.propTypes = {
  wide: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  wide: false,
  disabled: false,
};

export default Button;
