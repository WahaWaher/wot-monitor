import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import GridContainer from '@/components/grid/Container';

const ControlPanel = ({ renderInfoBar, renderControls, ...rest }) => (
  <Root {...rest}>
    <Container>
      <InfoBarContainer>{renderInfoBar()}</InfoBarContainer>
      <ControlsContainer>{renderControls()}</ControlsContainer>
    </Container>
  </Root>
);

const Root = styled.div`
  ${({ theme: { palette, utils } }) => css`
    cursor: default;
    display: flex;
    align-items: center;
    font-size: 0.85rem;
    background-color: ${utils.toRgba(palette.background.light, 0.4)};
    padding: 5px 0;
  `}
`;

const Container = styled(GridContainer)`
  display: flex;
  align-items: center;
`;

const InfoBarContainer = styled.div`
  flex-grow: 1;
`;

const ControlsContainer = styled.div``;

ControlPanel.propTypes = {
  renderControls: PropTypes.func,
  renderInfoBar: PropTypes.func,
};

ControlPanel.defaultProps = {
  renderControls: () => {},
  renderInfoBar: () => {},
};

export default ControlPanel;
