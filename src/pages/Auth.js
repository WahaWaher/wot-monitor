import { memo } from 'react';
import Container from '@/components/grid/Container';
import Title from '@/components/common/Title';
import Paragraph from '@/components/common/Paragraph';
import ButtonAction from '@/components/common/ButtonAction';
import PageFrame from '@/layout/parts/PageFrame';

const Auth = () => (
  <PageFrame verticalAlign basicFrame>
    <Container>
      <Title align="center">Авторизация</Title>
      <Paragraph className="d-block text-center mt-4">
        Подключите свой аккаунт World of Tanks, <br /> чтобы получить
        возможность отслеживать состояние клановых резервов.
      </Paragraph>
      <div className="text-center mt-4">
        <ButtonAction>Подключить аккаунт</ButtonAction>
      </div>
    </Container>
  </PageFrame>
);

export default memo(Auth);
