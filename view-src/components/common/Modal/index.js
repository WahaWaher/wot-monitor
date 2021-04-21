import { useTheme } from '@/hooks';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import ButtonIconed from '@/components/common/ButtonIconed';
import TypedModalContent from '@/components/common/Modal/TypedModalContent';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

ReactModal.setAppElement('#root');

const Modal = ({
  isOpen,
  setOpen,
  renderControls,
  type,
  children,
  ...rest
}) => {
  const { palette, utils } = useTheme();

  return (
    <ReactModal
      {...{
        isOpen,
        onRequestClose: setOpen,
        style: {
          content: {
            color: palette.text.main,
            border: null,
            borderRadius: null,
            background: palette.background.main,
            padding: null,
            width: '100%',
            maxWidth: 310,
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
          },
          overlay: {
            backgroundColor: utils.toRgba(palette.background.light, 0.75),
            transition: 'all .25s',
          },
        },
        ...rest,
      }}
    >
      <Root>
        <Header>
          <ButtonIconed
            size="sm"
            type="light"
            onClick={() => setOpen(false)}
            renderIcon={() => <Icon path={mdiClose} />}
          />
        </Header>
        <Content>
          {type ? (
            <TypedModalContent type={type}>{children}</TypedModalContent>
          ) : (
            children
          )}
        </Content>
        {renderControls && <Controls>{renderControls()}</Controls>}
      </Root>
    </ReactModal>
  );
};

const Root = styled.div`
  ${({ theme: { fonts } }) => css`
    font-family: ${fonts.main};
    font-size: 0.85rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 25px;
  `}
`;
const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-shring: 0;
`;
const Content = styled.div`
  flex-grow: 1;
  padding: 0 25px;
`;
const Controls = styled.div`
  width: 100%;
  display: flex;
  padding: 15px 25px 0 25px;
`;

TypedModalContent.propTypes = {
  type: PropTypes.oneOf(['info', 'warning', 'error', 'reserve', 'empty']),
  renderControls: PropTypes.func,
  setOpen: PropTypes.func,
};

TypedModalContent.defaultProps = {
  type: null,
  renderControls: null,
  setOpen: () => {},
};

export default Modal;
