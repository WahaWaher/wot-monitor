import { memo } from 'react';
import Container from '@/components/grid/Container';
import Title from '@/components/common/Title';
import PageFrame from '@/layout/parts/PageFrame';
import AppNotifications from '@/components/special/AppNotifications';

const Notifications = () => (
  <PageFrame basicFrame>
    <Container>
      <Title>Уведомления</Title>
    </Container>
    <AppNotifications />
  </PageFrame>
);

export default memo(Notifications);
