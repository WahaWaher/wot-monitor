import { FC } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  className?: string;
};

const Paragraph: FC<Props> = (props) => <Root {...props} />;

const Root = styled.div`
  ${({ theme: { fonts } }) => css`
    font-family: ${fonts.main};
    font-size: 1rem;
    margin: 0.75em 0;
  `}
`;

export default Paragraph;
