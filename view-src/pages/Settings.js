import { memo } from 'react';
import Container from '@/components/grid/Container';
import Title from '@/components/common/Title';
import PageFrame from '@/layout/parts/PageFrame';
import AppSettings from '@/components/special/AppSettings';

const Settings = () => {
  return (
    <PageFrame basicFrame>
      <Container>
        <Title>Настройки</Title>
        <AppSettings />
      </Container>
    </PageFrame>
  );
};

export default memo(Settings);
