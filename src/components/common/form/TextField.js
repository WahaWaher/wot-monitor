import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const TextField = (props) => <Root {...props} />;

const Root = styled.input`
  ${({ wide, theme: { palette, transitions, utils } }) => css`
    display: block;
    width: ${wide && '100%'};
    min-height: 28px;
    color: ${palette.text.main};
    border: 1px solid ${palette.background.light};
    background-color: transparent;
    padding: 0.3rem 0.5em;
    transition: all ${transitions.duration.main}s;
    &:hover,
    &:focus {
      background-color: ${utils.toRgba(palette.background.light, 0.25)};
    }
  `}
`;

TextField.propTypes = {
  wide: PropTypes.bool,
};

TextField.defaultProps = {
  wide: true,
};

export default TextField;
