import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const OptionValue = (props) => <Root {...props} />;

const Root = styled.div`
  ${({ fullWidth }) => css`
    display: flex;
    flex-direction: column;
    align-items: ${!fullWidth && 'flex-end'};
    width: ${fullWidth ? '100%' : '40%'};
    flex-shrink: 0;
    padding-left: ${!fullWidth && '20px'};
    margin-top: ${fullWidth && '15px'};
  `}
`;

OptionValue.propTypes = {
  fullWidth: PropTypes.bool,
};

OptionValue.defaultProps = {
  fullWidth: false,
};

export default OptionValue;
