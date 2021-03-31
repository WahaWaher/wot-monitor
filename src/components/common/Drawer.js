import { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import ScrollBar from '@/components/common/Scrollbar';
import WDrawer from 'wdrawer';
import 'wdrawer/dist/wdrawer.css';

const Drawer = (props) => {
  const [instance, setInstance] = useState(null);
  const [open, setOpen] = useState(props.open);
  const drawerNode = useRef(null);
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
    const instance = new WDrawer(drawerNode.current, {
      open,
      ...{ width, position, prefix, page },
    });

    instance.nodes.backdrop.addEventListener('click', () => {
      props.onChange(false);
    });

    drawerNode.current.addEventListener('wdrawer.open', (e) => {
      props.onOpen(e.detail.instance);
    });

    drawerNode.current.addEventListener('wdrawer.close', (e) => {
      props.onClose(e.detail.instance);
    });

    setInstance(instance);

    return () => {
      instance.nodes.backdrop.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (instance) {
      props.open ? instance.open() : instance.close();
      setOpen(props.open);
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

Drawer.defaultProps = {
  width: 144, // drawer width, px
  position: 'right', // drawer appearing from "left" or "right"
  prefix: null, // prefix for main classes
  page: null, // selector of page content node or null if page shifting not used

  scrollbar: true,
  onChange: () => {},
  onOpen: () => {},
  onClose: () => {},
};

export default Drawer;
