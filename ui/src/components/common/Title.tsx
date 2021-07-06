import { FC } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  size?: '1' | '2' | '3' | '4' | '5' | '6';
  align?: 'left' | 'right' | 'center';
  slim?: boolean;
  className?: string;
}

const defaultProps: Props = {
  size: '1',
  align: 'left',
  slim: false,
};

const Title: FC<Props> = (props) => <Root {...props} />;

const Root = styled.div<Props>`
  ${({ size, align, slim, theme: { palette, typography, fonts } }) => css`
    font-family: ${fonts.sub};
    color: ${palette.text.main};
    text-align: ${align};
    font-weight: ${slim ? '400' : '700'};
    font-size: ${typography.titles[size!]};
    line-height: ${typography.lineHeight / 1.25};
    margin: 0 0 1.3rem 0;
  `}
`;

Title.defaultProps = defaultProps;

export default Title;
