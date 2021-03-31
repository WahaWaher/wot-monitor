import styled, { css } from 'styled-components';

const Loader = (props) => {
  return (
    <Root>
      <div></div>
      <div></div>
      <div></div>
    </Root>
  );
};

const Root = styled.div`
  ${({ theme: { palette } }) => css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 2.2em;
    height: 1.2em;
    font-size: 1em;
    vertical-align: middle;
    color: ${palette.text.main};
    position: relative;
    > div {
      display: inline-flex;
      width: 0.35em;
      height: 0.35em;
      border: 0 solid currentColor;
      position: relative;
      background-color: currentColor;
      margin: 0.1429em;
      animation: ball-pulse 0.7s ease infinite;
      &:nth-child(1) {
        animation-delay: -200ms;
      }
      &:nth-child(2) {
        animation-delay: -100ms;
      }
      &:nth-child(3) {
        animation-delay: 0ms;
      }
    }
    @keyframes ball-pulse {
      0%,
      20%,
      100% {
        opacity: 1;
        transform: scale(1);
      }
      80% {
        opacity: 0.1;
        transform: scale(0.01);
      }
    }
  `}
`;

export default Loader;
