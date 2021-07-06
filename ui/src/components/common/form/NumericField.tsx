import styled, { css } from 'styled-components';
import NumericInput, { NumericInputProps } from 'react-numeric-input';
import Icon from '@mdi/react';
import { mdiMenuDown, mdiMenuUp } from '@mdi/js';
import { renderToStaticMarkup } from 'react-dom/server';
import Loader from '../Loader';
import { FC } from 'react';

type Props = {
  wide?: boolean;
  isLoading?: boolean;
};

const defaultProps: Props = {
  wide: true,
  isLoading: false,
};

const NumericField: FC<Props & NumericInputProps> = ({
  wide,
  isLoading,
  ...rest
}) => (
  <Root wide={wide}>
    {/* eslint-disable-next-line react/style-prop-object */}
    <NumericInput className="numeric-input" style={false} {...rest} />
    <LoadingIndicator {...{ isLoading }}>
      <Loader />
    </LoadingIndicator>
  </Root>
);

const Root = styled.div<Props>`
  ${({ wide, theme: { palette, transitions, utils } }) => css`
    position: relative;
    .react-numeric-input {
      display: ${wide ? 'block' : 'inline-flex'};
      width: ${wide && '100%'};
      position: relative;
      .numeric-input {
        width: 100%;
        min-height: 29px;
        color: ${palette.text.main};
        border: 1px solid ${palette.background.light};
        background-color: transparent;
        padding: 0.3em 4em 0.3em 0.5em;
        transition: all ${transitions.duration.main}s;
        &:hover,
        &:focus {
          background-color: ${utils.toRgba(palette.background.light, 0.25)};
        }
      }
      b {
        position: absolute;
        top: 0;
        right: 0;
        width: 1.8em;
        &:hover {
          i {
            &::before {
              opacity: 0.7;
            }
          }
        }
        &:active {
          i {
            &::before {
              opacity: 0.9;
            }
          }
        }
        i {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          &::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-repeat: no-repeat;
            background-position: center;
            transition: all ${transitions.duration.main}s;
          }
        }
      }
      > * {
        &:nth-child(2) {
          top: 0;
          bottom: 50%;
          i {
            &::before {
              top: 2px;
              background-image: url('data:image/svg+xml,${encodeURIComponent(
                renderToStaticMarkup(
                  <Icon
                    /* @ts-ignore */
                    xmlns="http://www.w3.org/2000/svg"
                    path={mdiMenuUp}
                    color={palette.text.main}
                    width="18"
                  />
                )
              )}');
            }
          }
        }
        &:nth-child(3) {
          top: 50%;
          bottom: 0;
          i {
            &::before {
              bottom: 2px;
              background-image: url('data:image/svg+xml,${encodeURIComponent(
                renderToStaticMarkup(
                  <Icon
                    /* @ts-ignore */
                    xmlns="http://www.w3.org/2000/svg"
                    path={mdiMenuDown}
                    color={palette.text.main}
                    width="18"
                  />
                )
              )}');
            }
          }
        }
      }
    }
  `}
`;

const LoadingIndicator = styled.span<Props>`
  ${({ isLoading, theme: { transitions } }) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 1.5em;
    width: 2em;
    opacity: ${isLoading ? '1' : '0'};
    visibility: ${isLoading ? 'visible' : 'hidden'};
    user-select: none;
    transition: all ${transitions.duration.main}s;
    > * {
      font-size: 0.65em;
    }
  `}
`;

NumericField.defaultProps = defaultProps;

export default NumericField;
