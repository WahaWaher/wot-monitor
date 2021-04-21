import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import LayoutDefault from '@/layout/LayoutDefault';

const SpecialRoute = (props) => {
  const { component: PageComponent, layout: Layout, access, ...rest } = props;
  const profile = useSelector((state) => state.profile);

  return (
    <Layout>
      <Route
        {...rest}
        exact
        render={(props) => {
          switch (access) {
            case 'authorized': {
              return profile.auth.token ? (
                <PageComponent />
              ) : (
                <Redirect to="/auth" />
              );
            }

            case 'has-profile': {
              return profile.info.id ? <PageComponent /> : <Redirect to="/" />;
            }

            default:
              return <PageComponent />;
          }
        }}
      />
    </Layout>
  );
};

SpecialRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  layout: PropTypes.elementType,
  access: PropTypes.oneOf(['public', 'has-profile', 'authorized']),
  exact: PropTypes.bool,
};

SpecialRoute.defaultProps = {
  layout: LayoutDefault,
  access: 'public',
  exact: true,
};

export default SpecialRoute;
