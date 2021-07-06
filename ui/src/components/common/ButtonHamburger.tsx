import { Sling as Hamburger } from 'hamburger-react';
import { FC } from 'react';
import styled from 'styled-components';
import { CommonBurgerProps } from 'hamburger-react/dist-types';

type Props = {
  title?: string;
  onClick?: () => void;
};

const defaultProps: Props = {
  title: '',
  onClick: () => {},
};

const ButtonHamburger: FC<Props & CommonBurgerProps> = ({
  children,
  title,
  onClick,
  ...rest
}) => (
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

ButtonHamburger.defaultProps = defaultProps;

export default ButtonHamburger;
