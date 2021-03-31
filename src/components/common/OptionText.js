import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const OptionText = (props) => <Root {...props} />;

const Root = styled.div`
  ${({ fullWidth }) => css`
    width: ${fullWidth ? '100%' : '60%'};
    flex-grow: 1;
    font-size: 0.95rem;
    line-height: 1.15;
  `}
`;

OptionText.propTypes = {
  fullWidth: PropTypes.bool,
};

OptionText.defaultProps = {
  fullWidth: false,
};

export default OptionText;
