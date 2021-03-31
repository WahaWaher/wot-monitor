import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Col = (props) => <Root {...props} />;

const Root = styled.div`
  ${({ width, height, theme: { grid, utils } }) => css`
    width: ${utils.genSizes(width)};
    height: ${utils.genSizes(height)};
    min-width: 0;
    max-width: 100%;
    position: relative;
    padding-right: ${grid.gutterWidth}px;
    padding-left: ${grid.gutterWidth}px;
  `}
`;

Col.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Col.defaultProps = {
  width: 'auto',
  height: 'auto',
};

export default Col;
