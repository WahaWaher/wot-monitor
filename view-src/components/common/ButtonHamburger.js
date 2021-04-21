import { Sling as Hamburger } from 'hamburger-react';
import styled from 'styled-components';

const ButtonHamburger = ({ children, title, onClick, ...rest }) => (
  <Root title={title}>
    <div onClick={onClick}>
      <Hamburger
        {...{
          size: 18,
          direction: 'right',
          duration: 0.3,
          distance: 'md',
          color: '#b8b8a2',
          ...rest,
        }}
      />
    </div>
  </Root>
);

const Root = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  > div {
    width: 48px;
    height: 48px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) !important;
  }
`;

export default ButtonHamburger;
