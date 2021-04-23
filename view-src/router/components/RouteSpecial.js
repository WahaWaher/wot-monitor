import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import LayoutDefault from '@/layout/LayoutDefault';

const SpecialRoute = (props) => {
  const { component: PageComponent, layout: Layout, access, ...rest } = props;

  return (
    <Layout>
      <Route {...rest} exact render={() => <PageComponent />} />
    </Layout>
  );
};

SpecialRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  layout: PropTypes.elementType,
  access: PropTypes.oneOf(['public']),
  exact: PropTypes.bool,
};

SpecialRoute.defaultProps = {
  layout: LayoutDefault,
  access: 'public',
  exact: true,
};

export default SpecialRoute;
