import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Option = (props) => <OptionRoot {...props} />;
const OptionText = (props) => <OptionTextRoot {...props} />;
const OptionValue = (props) => <OptionValueRoot {...props} />;

const OptionRoot = styled.div`
  ${({ theme: { palette, transitions, utils } }) => css`
    cursor: default;
    display: flex;
    flex-wrap: wrap;
    background-color: ${utils.toRgba(palette.background.light, 0.2)};
    padding: 0.75rem 1rem;
    margin: 5px 0;
    transition: background-color ${transitions.duration.main}s;
    position: relative;
    &::before {
      content: '';
      display: block;
      width: 2px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      background-color: ${utils.lighten(palette.background.light, 3)};
      transition: all ${transitions.duration.main}s;
      opacity: 0;
    }
    &:hover {
      &::before {
        opacity: 1;
      }
    }
  `}
`;

const OptionTextRoot = styled.div`
  ${({ fullWidth }) => css`
    width: ${fullWidth ? '100%' : '60%'};
    flex-grow: 1;
    font-size: 0.85rem;
    line-height: 1.3;
  `}
`;

const OptionValueRoot = styled.div`
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

OptionText.propTypes = {
  fullWidth: PropTypes.bool,
};

OptionText.defaultProps = {
  fullWidth: false,
};

OptionValue.propTypes = {
  fullWidth: PropTypes.bool,
};

OptionValue.defaultProps = {
  fullWidth: false,
};

Option.Text = OptionText;
Option.Value = OptionValue;

export default Option;
