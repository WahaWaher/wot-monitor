import { ModalTypes } from '@/components/common/Modal';
import {
  mdiAlert,
  mdiCloseCircle,
  mdiInformation,
  mdiLightningBolt,
} from '@mdi/js';
import Icon from '@mdi/react';
import { FC } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  type?: ModalTypes;
};

const defaultProps: Props = {
  type: 'empty',
};

const contentTypes: { [key in ModalTypes]: { icon: JSX.Element } } = {
  empty: {
    icon: <div></div>,
  },
  info: {
    icon: <Icon path={mdiInformation} />,
  },
  warning: {
    icon: <Icon path={mdiAlert} />,
  },
  error: {
    icon: <Icon path={mdiCloseCircle} />,
  },
  reserve: {
    icon: <Icon path={mdiLightningBolt} />,
  },
  success: {
    icon: <div></div>,
  },
};

const TypedModalContent: FC<Props> = ({ type, children, ...rest }) => (
  <Root {...rest}>
    {type && type !== 'empty' && <IconBox>{contentTypes[type].icon}</IconBox>}
    <ContentBox type={type}>{children}</ContentBox>
  </Root>
);

const Root = styled.div`
  width: 100%;
  display: flex;
`;

const IconBox = styled.div`
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  flex-shrink: 0;
  > * {
    width: 26px;
    height: 26px;
    fill: currentColor;
    opacity: 0.5;
  }
`;

const ContentBox = styled.div<Props>`
  ${({ type }) => css`
    padding-left: ${type !== 'empty' && '15px'};
  `}
`;

TypedModalContent.defaultProps = defaultProps;

export default TypedModalContent;
