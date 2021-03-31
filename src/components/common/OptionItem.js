import styled, { css } from 'styled-components';

const OptionItem = (props) => <Root {...props} />;

const Root = styled.div`
  ${({ theme: { palette, transitions, utils } }) => css`
    cursor: default;
    display: flex;
    flex-wrap: wrap;
    background-color: ${utils.toRgba(palette.background.light, 0.2)};
    padding: 0.75rem 1rem;
    margin: 5px 0;
    transition: background-color ${transitions.duration.main}s;
    position: relative;
    &::before {
      content: '';
      display: block;
      width: 2px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      background-color: ${utils.lighten(palette.background.light, 3)};
      transition: all ${transitions.duration.main}s;
      opacity: 0;
    }
    &:hover {
      &::before {
        opacity: 1;
      }
    }
  `}
`;

export default OptionItem;
