import { FC } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  title?: string;
  info?: JSX.Element;
  controls?: JSX.Element;
  renderStatusLine?: () => Nullable<JSX.Element>;
};

const Widget: FC<Props> = ({
  title,
  info,
  controls,
  renderStatusLine,
  children,
}) => (
  <Root>
    <Container>
      <Title>{title}</Title>
      <Header>
        <StatusLine>{renderStatusLine && renderStatusLine()}</StatusLine>
        <Controls>{controls}</Controls>
      </Header>
      <Content>{children}</Content>
      <InfoBar>{info}</InfoBar>
    </Container>
  </Root>
);

const Root = styled.div``;

const Container = styled.fieldset`
  ${({ theme: { palette } }) => css`
    cursor: default;
    border: 1px solid ${palette.background.light};
  `}
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 0 0 10px 0;
`;

const Title = styled.legend`
  font-family: ${({ theme: { fonts } }) => fonts.sub};
  font-weight: 700;
  font-size: 1.15rem;
  line-height: 1;
  padding: 0 5px;
`;

const StatusLine = styled.div`
  display: flex;
  align-items: center;
  min-height: 20px;
  flex-grow: 1;
  font-size: 0.8rem;
  line-height: 1;
  opacity: 0.5;
`;

const Controls = styled.div``;

const Content = styled.div`
  padding: 15px 0;
`;

const InfoBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 45px;
  font-size: 0.85rem;
  line-height: 1.1;
  text-align: center;
  padding: 0 0 15px 0;
  opacity: 0.5;
`;

export default Widget;
