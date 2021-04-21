import styled from 'styled-components';

const SideMenu = (props) => <Root {...props} />;

const Root = styled.ul`
  display: block;
  width: 100%;
  list-style-type: none;
  padding: 0;
  margin: 0;
  user-select: none;
`;

export default SideMenu;
