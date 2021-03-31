import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const List = (props) => <Root {...props} />;
const Item = (props) => <ItemRoot {...props} />;

const Root = styled.ul`
  ${({ size }) => css`
    font-size: ${size === 'sm' ? '.85rem' : '1rem'};
    list-style-type: none;
    padding: 0;
    margin: 0;
    ${ItemRoot} {
      &::before {
        top: ${size === 'sm' ? '0.6em' : '0.575em'};
      }
    }
  `}
`;

const ItemRoot = styled.li`
  ${({ size, theme: { palette } }) => css`
    display: block;
    padding: 0.15rem 0 0.15rem 1em;
    position: relative;
    &::before {
      content: '';
      display: block;
      width: 0.35em;
      height: 0.35em;
      position: absolute;
      left: 0;
      border-radius: 50%;
      background-color: ${palette.text.main};
    }
  `}
`;

List.propTypes = {
  size: PropTypes.oneOf(['sm', 'md']),
};

List.defaultProps = {
  size: 'md',
};

List.Item = Item;

export default List;
