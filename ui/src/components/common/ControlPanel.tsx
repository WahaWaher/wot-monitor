import GridContainer from '@/components/grid/Container';
import { FC } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  renderControls?: () => Nullable<JSX.Element>;
  renderInfoBar?: () => Nullable<JSX.Element>;
  className?: string;
};

const ControlPanel: FC<Props> = ({
  renderInfoBar,
  renderControls,
  ...rest
}) => (
  <Root {...rest}>
    <Container>
      {renderInfoBar && <InfoBarContainer>{renderInfoBar()}</InfoBarContainer>}
      {renderControls && (
        <ControlsContainer>{renderControls()}</ControlsContainer>
      )}
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

export default ControlPanel;
