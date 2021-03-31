import { memo } from 'react';
import Container from '@/components/grid/Container';
import Title from '@/components/common/Title';
import PageFrame from '@/layout/parts/PageFrame';
import AppWidgets from '@/components/special/AppWidgets';

const Monitoring = () => (
  <PageFrame basicFrame>
    <Container>
      <Title>Мониторинг</Title>
      <AppWidgets />
    </Container>
  </PageFrame>
);

export default memo(Monitoring);
