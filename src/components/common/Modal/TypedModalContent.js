import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import {
  mdiInformation,
  mdiAlert,
  mdiLightningBolt,
  mdiCloseCircle,
} from '@mdi/js';

const contentTypes = {
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
};

const TypedModalContent = ({ type, children, ...rest }) => (
  <Root {...rest}>
    <IconBox>{contentTypes[type].icon}</IconBox>
    <ContentBox>{children}</ContentBox>
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

const ContentBox = styled.div`
  padding-left: 15px;
`;

TypedModalContent.propTypes = {
  type: PropTypes.oneOf(['info', 'warning', 'error', 'reserve']),
};

TypedModalContent.defaultProps = {
  type: null,
};

export default TypedModalContent;
