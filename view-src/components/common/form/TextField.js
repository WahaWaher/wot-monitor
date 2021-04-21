import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Loader from '../Loader';

const TextField = (props) => {
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

const Root = styled.span`
  ${({ wide, theme: { palette, transitions, utils } }) => css`
    display: ${wide ? 'block' : 'inline-flex'};
    font-size: 1rem;
    position: relative;
  `}
`;

const LoadingIndicator = styled.span`
  ${({ isLoading, theme: { palette, transitions } }) => css`
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

const Input = styled.input`
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

TextField.propTypes = {
  wide: PropTypes.bool,
  loading: PropTypes.bool,
};

TextField.defaultProps = {
  wide: true,
  isLoading: false,
};

export default TextField;
