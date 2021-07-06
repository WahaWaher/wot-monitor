import ScrollBar from '@/components/common/Scrollbar';
import { FC, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import WDrawer, { Options } from 'wdrawer';
import 'wdrawer/dist/wdrawer.css';

type Props = {
  scrollbar?: boolean;
  onChange?: (on: boolean) => void;
  onOpen?: (inst: WDrawer) => void;
  onClose?: (inst: WDrawer) => void;
} & Partial<Options>;

const defaultProps: Props = {
  width: 144,
  position: 'right',
  prefix: null,
  page: null,
  open: false,

  scrollbar: true,
  onChange: () => {},
  onOpen: () => {},
  onClose: () => {},
};

const Drawer: FC<Props> = (props) => {
  const [instance, setInstance] = useState<WDrawer | null>(null);
  const [open, setOpen] = useState<boolean>(!!props.open);
  const drawerNode = useRef<HTMLDivElement>(null);
  const {
    width,
    position,
    prefix,
    page,
    onChange,
    onOpen,
    onClose,
    scrollbar,
    children,
    ...rest
  } = props;

  useEffect(() => {
    if (!drawerNode.current) return;

    const instance = new WDrawer(drawerNode.current, {
      open,
      ...{ width, position, prefix, page },
    });

    instance.nodes.backdrop.addEventListener('click', () => {
      props.onChange!(false);
    });

    drawerNode.current.addEventListener('wdrawer.open', ((
      e: CustomEvent<{
        instance: WDrawer;
      }>
    ) => {
      props.onOpen && props.onOpen(e.detail.instance);
    }) as EventListener);

    drawerNode.current.addEventListener('wdrawer.close', ((
      e: CustomEvent<{
        instance: WDrawer;
      }>
    ) => {
      props.onClose && props.onClose(e.detail.instance);
    }) as EventListener);

    setInstance(instance);

    return () => {
      instance.nodes.backdrop.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (instance) {
      props.open ? instance.open() : instance.close();
      setOpen(!!props.open);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  return (
    <Root ref={drawerNode} {...rest}>
      <ScrollBar>
        <Content>{children}</Content>
      </ScrollBar>
    </Root>
  );
};

const Root = styled.div`
  ${({ theme: { palette, utils } }) => css`
    top: 75px;
    overflow-y: auto;
    background: ${utils.toRgba(
      utils.lighten(palette.background.extraDark, 1.4),
      0.99
    )};
  `}
`;

const Content = styled.div`
  width: 100%;
`;

Drawer.defaultProps = defaultProps;

export default Drawer;
