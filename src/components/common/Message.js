import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Icon from '@mdi/react';
import {
  mdiInformation,
  mdiAlert,
  mdiLightningBolt,
  mdiCloseCircle,
} from '@mdi/js';

const messageTypes = {
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

const Message = ({ children, type, date, read, renderControls, ...rest }) => (
  <Root {...rest}>
    <IconBox>{messageTypes[type].icon}</IconBox>
    <ContentBox>
      <Text>{children}</Text>
      <Footer>
        <Date>{date}</Date>
        {renderControls && <Controls>{renderControls()}</Controls>}
      </Footer>
    </ContentBox>
    {!read && <ReadMarker />}
  </Root>
);

const Root = styled.div`
  ${({ theme: { palette, transitions, utils } }) => css`
    cursor: default;
    display: flex;
    padding: 10px 0;
    border: 1px solid ${palette.background.light};
    position: relative;
    transition: all ${transitions.duration.main}s;
    &:hover {
      background-color: ${utils.toRgba(palette.background.light, 0.35)};
      ${Controls} {
        transform: translate(0);
        opacity: 1;
        visibility: visible;
      }
    }
  `}
`;

const IconBox = styled.div`
  ${({ theme: { palette } }) => css`
    width: 50px;
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
  `}
`;

const ContentBox = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-top: 5px;
`;

const Text = styled.div`
  font-size: 0.9rem;
  line-height: 1.25;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  margin-top: 8px;
`;

const Date = styled.div`
  flex-grow: 1;
  font-size: 0.8rem;
  opacity: 0.5;
`;

const Controls = styled.div`
  ${({ theme: { transitions } }) => css`
    display: inline-flex;
    align-items: center;
    transform: translate(50%);
    opacity: 0;
    visibility: hidden;
    transition: all ${transitions.duration.main * 1.25}s;
  `}
`;

const ReadMarker = styled.div`
  ${({ theme: { palette } }) => css`
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    transform: translate(-40%, -40%);
    background-color: ${palette.accent.main};
  `}
`;

Message.propTypes = {
  type: PropTypes.oneOf(['info', 'warning', 'error', 'reserve']),
  date: PropTypes.string,
  read: PropTypes.bool,
  renderControls: PropTypes.func,
};

Message.defaultProps = {
  type: 'info',
  date: '',
  read: true,
  renderControls: null,
};

export default Message;
