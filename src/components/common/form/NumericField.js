import InputNumber from 'rc-input-number';
import styled, { css } from 'styled-components';
import Icon from '@mdi/react';
import { mdiMenuDown, mdiMenuUp } from '@mdi/js';
import PropTypes from 'prop-types';

const UpHandler = <Icon path={mdiMenuUp} />;
const DownHandler = <Icon path={mdiMenuDown} />;

const TextFieldNumeric = ({ wide, ...rest }) => (
  <Root wide={wide}>
    <InputNumber upHandler={UpHandler} downHandler={DownHandler} {...rest} />
  </Root>
);

const Root = styled.div`
  ${({ wide, theme: { palette, transitions, utils } }) => css`
    display: ${wide ? 'block' : 'inline-block'};
    width: ${wide && '100%'};
    position: relative;
    .rc-input-number {
      &-input {
        display: ${wide ? 'block' : 'inline-block'};
        width: ${wide && '100%'};
        min-height: 28px;
        color: ${palette.text.main};
        border: 1px solid ${palette.background.light};
        background-color: transparent;
        padding: 0.3em 2.5em 0.3em 0.5em;
        transition: all ${transitions.duration.main}s;
        &:hover,
        &:focus {
          background-color: ${utils.toRgba(palette.background.light, 0.25)};
        }
      }
      &-handler-wrap {
        width: 28px;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
      }
      &-handler {
        cursor: pointer;
        display: flex;
        justify-content: center;
        position: absolute;
        left: 0;
        right: 0;
        color: ${palette.text.main};
        overflow: hidden;
        transition: all ${transitions.duration.main}s;
        &:hover,
        &:focus {
          background-color: ${utils.toRgba(palette.background.light, 0.75)};
        }
        &:active {
          background-color: ${utils.toRgba(palette.background.light, 0.5)};
        }
        svg {
          color: #fff;
          width: 16.8px;
          height: 16.8px;
          fill: currentColor;
          color: inherit;
        }
      }
      &-handler-up {
        align-items: flex-start;
        top: 0;
        bottom: 50%;
      }
      &-handler-down {
        align-items: flex-end;
        top: 50%;
        bottom: 0;
      }
    }
  `}
`;

TextFieldNumeric.propTypes = {
  wide: PropTypes.bool,
};

TextFieldNumeric.defaultProps = {
  wide: true,
};

export default TextFieldNumeric;
