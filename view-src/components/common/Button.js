import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Button = (props) => <Root {...props} />;

const Root = styled.button`
  ${({ wide, theme: { palette, transitions, utils } }) => css`
    cursor: pointer;
    width: ${wide && '100%'};
    min-height: 29px;
    color: ${palette.text.main};
    border: 1px solid ${palette.background.light};
    background-color: transparent;
    padding: 0.3rem 1em;
    transition: all ${transitions.duration.main}s;
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
};

Button.defaultProps = {
  wide: false,
};

export default Button;
