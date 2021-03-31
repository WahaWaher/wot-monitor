import { memo } from 'react';
import Container from '@/components/grid/Container';
import Title from '@/components/common/Title';
import PageFrame from '@/layout/parts/PageFrame';

const Home = () => (
  <PageFrame basicFrame>
    <Container>
      <Title>WOT Monitor</Title>
    </Container>
  </PageFrame>
);

export default memo(Home);
