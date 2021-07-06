import LayoutDefault from '@/layout/LayoutDefault';
import React, { FC } from 'react';
import { Route } from 'react-router-dom';

type Props = {
  component: React.FunctionComponent;
  layout?: React.FunctionComponent;
  access?: 'public';
  exact?: boolean;
};

const defaultProps: Props = {
  component: LayoutDefault,
  layout: LayoutDefault,
  access: 'public',
  exact: true,
};

const SpecialRoute: FC<Props> = (props) => {
  const { component: PageComponent, layout: Layout, access, ...rest } = props;

  if (!Layout) return null;

  return (
    <Layout>
      <Route {...rest} exact render={() => <PageComponent />} />
    </Layout>
  );
};

SpecialRoute.defaultProps = defaultProps;

export default SpecialRoute;
