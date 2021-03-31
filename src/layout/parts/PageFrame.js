import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const PageFrame = ({ children, ...rest }) => (
  <Root {...rest}>
    <Wrap>{children}</Wrap>
  </Root>
);

const Root = styled.div`
  ${({ verticalAlign, basicFrame }) => css`
    width: 100%;
    ${verticalAlign &&
    css`
      display: flex;
      align-items: center;
      flex-flow: wrap;
    `}
    ${basicFrame &&
    css`
      ${Wrap} {
        padding-top: 15px;
        padding-bottom: 15px;
      }
    `}
  `}
`;

const Wrap = styled.div``;

PageFrame.propTypes = {
  verticalAlign: PropTypes.bool,
  basicFrame: PropTypes.bool,
};

PageFrame.defaultProps = {
  verticalAlign: false,
  basicFrame: false,
};

export default PageFrame;
