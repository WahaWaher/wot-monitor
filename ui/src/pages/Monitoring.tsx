import { memo, FC } from 'react';
import Container from '@/components/grid/Container';
import Title from '@/components/common/Title';
import PageFrame from '@/layout/parts/PageFrame';
import CRWidget from '@/components/special/CRWidget';

const Monitoring: FC = () => {
  return (
    <PageFrame basicFrame>
      <Container>
        <Title>Мониторинг</Title>
        <CRWidget />
      </Container>
    </PageFrame>
  );
};

export default memo(Monitoring);
