import React, { FC } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;
};

const ButtonAction: FC<Props> = ({ children, ...rest }) => (
  <Root {...rest}>
    <Text>{children}</Text>
  </Root>
);

const Root = styled.button`
  ${({ theme: { palette, transitions, fonts } }) => css`
    cursor: pointer;
    font-family: ${fonts.sub};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1;
    color: ${palette.text.light};
    text-transform: uppercase;
    text-shadow: 0 -1px rgba(71, 0, 0, 0.3);
    border: none;
    border-radius: 1px;
    position: relative;
    padding: 1em 2em;
    box-shadow: 0 2px 0 #661000, inset 0 0 8px rgba(255, 210, 0, 0.1),
      inset 0 1px 0 #fab81b, inset 0 -1px 0 #ef4511;
    background: linear-gradient(to bottom, #fab81b 0%, #ef4511 100%) no-repeat 0,
      linear-gradient(to bottom, #fab81b 0%, #ef4511 100%) no-repeat 100%,
      #f25322 linear-gradient(to bottom, #f60 0%, #a6230e 100%) no-repeat;
    background-size: 1px 100%, 1px 100%, cover;
    &:after {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      content: '';
      box-shadow: inset 0 0 8px rgba(255, 210, 0, 0.1), inset 0 1px 0 #fab81b,
        inset 0 -1px 0 #ff7e00;
      background: linear-gradient(to bottom, #fab81b 0%, #ff7e00 100%) no-repeat
          0,
        linear-gradient(to bottom, #fab81b 0%, #ff7e00 100%) no-repeat 100%,
        #ff7e00 linear-gradient(to bottom, #ff7e00 0%, #c2530a 100%) no-repeat;
      background-size: 1px 100%, 1px 100%, cover;
      z-index: 1;
      opacity: 0;
      transition: opacity ${transitions.duration.main}s ease-out;
    }
    &:hover {
      &::after {
        opacity: 1;
      }
    }
    &:active {
      &::after {
        opacity: 0.7;
      }
    }
  `}
`;

const Text = styled.span`
  position: relative;
  z-index: 2;
`;

export default ButtonAction;
