import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Title = (props) => <Root {...props} />;

const Root = styled.div`
  ${({ size, align, slim, theme: { palette, typography, fonts } }) => css`
    font-family: ${fonts.sub};
    color: ${palette.text.main};
    text-align: ${align};
    font-weight: ${slim ? '400' : '700'};
    font-size: ${typography.titles[size]};
    line-height: ${typography.lineHeight / 1.25};
    margin: 0 0 1.3rem 0;
  `}
`;

Title.propTypes = {
  size: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
  align: PropTypes.oneOf(['left', 'right', 'center']),
  slim: PropTypes.bool,
};

Title.defaultProps = {
  size: '1',
  align: 'left',
  slim: false,
};

export default Title;
