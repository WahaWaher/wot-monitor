import Loader from '@/components/common/Loader';
import { FC } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  wide?: boolean;
  isLoading?: boolean;
  name?: string;
  value?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const defaultProps: Props = {
  wide: true,
  isLoading: false,
};

const TextField: FC<Props> = (props) => {
  const { wide, isLoading } = props;

  return (
    <Root {...{ wide, isLoading }}>
      <Input {...props} />
      <LoadingIndicator {...{ isLoading }}>
        <Loader />
      </LoadingIndicator>
    </Root>
  );
};

const Root = styled.span<Props>`
  ${({ wide }) => css`
    display: ${wide ? 'block' : 'inline-flex'};
    font-size: 1rem;
    position: relative;
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
    right: 0;
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

const Input = styled.input<Props>`
  ${({ wide, isLoading, theme: { palette, transitions, utils } }) => css`
    display: ${wide ? 'block' : 'inline-flex'};
    width: ${wide && '100%'};
    min-height: 29px;
    color: ${palette.text.main};
    font-size: 0.95em;
    border: 1px solid ${palette.background.light};
    background-color: transparent;
    padding: 0.3rem 0.5em;
    padding-right: ${isLoading && '2em'};
    transition: all ${transitions.duration.main}s;
    &:hover,
    &:focus {
      background-color: ${utils.toRgba(palette.background.light, 0.25)};
    }
  `}
`;

TextField.defaultProps = defaultProps;

export default TextField;
