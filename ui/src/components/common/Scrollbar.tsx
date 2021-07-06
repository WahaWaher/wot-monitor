import styled, { css } from 'styled-components';
import { Scrollbars, ScrollbarProps } from 'react-custom-scrollbars';
import { FC } from 'react';

const Scrollbar: FC<ScrollbarProps> = (props) => (
  <Scrollbars
    {...{
      universal: true,
      renderTrackVertical: (props) => <TrackVertical {...props} />,
      renderView: (props) => <View {...props} />,
      ...props,
    }}
  />
);

const TrackVertical = styled.div`
  ${({ theme: { palette, utils } }) => css`
    position: absolute;
    width: 6px;
    right: 2px;
    bottom: 2px;
    top: 2px;
    border-radius: 3px;
    > div {
      border-radius: 3px !important;
      background-color: ${utils.toRgba(
        utils.lighten(palette.background.light, 5),
        0.85
      )} !important;
    }
  `}
`;

const View = styled.div``;

export default Scrollbar;
