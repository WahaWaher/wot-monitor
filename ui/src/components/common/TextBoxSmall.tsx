import { FC } from 'react';
import styled, { css } from 'styled-components';

const TextBoxSmall: FC<{ className?: string }> = (props) => <Root {...props} />;

const Root = styled.div`
  ${({ theme: { palette, utils } }) => css`
    font-size: 0.8rem;
    color: ${utils.toRgba(palette.text.main, 1)};
    opacity: 0.5;
  `}
`;

export default TextBoxSmall;
