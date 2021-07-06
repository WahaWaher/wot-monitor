import { useTheme } from '@/hooks';
import styled, { css } from 'styled-components';
import ReactModal, { Props as ReactModalProps } from 'react-modal';
import ButtonIconed from '@/components/common/ButtonIconed';
import TypedModalContent from '@/components/common/Modal/TypedModalContent';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import { FC } from 'react';

export type ModalTypes = 'info' | 'warning' | 'error' | 'reserve' | 'empty' | 'success';

type Props = {
  type?: ModalTypes;
  renderControls?: () => Nullable<JSX.Element>;
  isOpen?: boolean;
  setOpen?: () => void;
} & ReactModalProps;

const defaultProps: Props = {
  type: 'info',
  isOpen: false,
  renderControls: () => null,
};

ReactModal.setAppElement('#root');

const Modal: FC<Props> = ({
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
        isOpen: isOpen,
        onRequestClose: () => setOpen && setOpen(),
        style: {
          content: {
            color: palette.text.main,
            border: 0,
            borderRadius: 0,
            background: palette.background.main,
            padding: 0,
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
            onClick={() => setOpen && setOpen()}
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
  flex-shrink: 0;
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

Modal.defaultProps = defaultProps;

export default Modal;
