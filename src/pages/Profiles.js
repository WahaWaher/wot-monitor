import { memo } from 'react';
import Container from '@/components/grid/Container';
import Title from '@/components/common/Title';
import PageFrame from '@/layout/parts/PageFrame';
import AppProfile from '@/components/special/AppProfile';

const Profiles = () => (
  <PageFrame basicFrame>
    <Container>
      <Title>Профиль</Title>
      <AppProfile />
    </Container>
  </PageFrame>
);

export default memo(Profiles);
