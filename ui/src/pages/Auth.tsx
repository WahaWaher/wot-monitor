import { memo } from 'react';
import Container from '@/components/grid/Container';
import Title from '@/components/common/Title';
import Paragraph from '@/components/common/Paragraph';
import ButtonAction from '@/components/common/ButtonAction';
import PageFrame from '@/layout/parts/PageFrame';
import { useStoreProfileActions } from '@/store/hooks/useStoreActions';
import { useSelector } from 'react-redux';
import { getAuth } from '@/store/selectors/profileSelectors';
import { useToggle, useMessage } from '@/hooks';
import Loader from '@/components/common/Loader';
import Alert from '@/components/common/Alert';
import { fromatDateFromTimeStamp } from '@/utils/dates';
import Button from '@/components/common/Button';

const Auth = () => {
  const { doWotAuth, doWotLogout } = useStoreProfileActions();
  const { expires, token } = useSelector(getAuth);
  const isAuthProcessing = useToggle(false);
  const succesMsg = useMessage(null);
  const errorMsg = useMessage(null);

  const authenticate = () => {
    isAuthProcessing.set(true);
    errorMsg.set(null);
    succesMsg.set(null);

    return (
      doWotAuth()
        /* @ts-ignore */
        .then(({ data, error }) => {
          return error
            ? errorMsg.set(error.message)
            : succesMsg.set('Аутентификация прошла успешно!');
        })
        .finally(() => isAuthProcessing.set(false))
    );
  };

  return (
    <PageFrame verticalAlign basicFrame>
      <Container>
        <Title align="center">Аутентификация</Title>
        {token ? (
          <Paragraph className="d-block text-center mt-4">
            На данный момент к текущему профилю уже привязан аккаунт World of
            Tanks. Привязка активна до:{' '}
            <strong>{expires && fromatDateFromTimeStamp(expires)}</strong>
          </Paragraph>
        ) : (
          <Paragraph className="d-block text-center mt-4">
            Подключите свой аккаунт World of Tanks, <br /> чтобы получить
            возможность отслеживать состояние клановых резервов.
          </Paragraph>
        )}
        <div className="d-flex flex-column align-items-center text-center mt-4">
          <ButtonAction onClick={authenticate}>
            {token ? 'Продлить привязку' : 'Подключить аккаунт'}
          </ButtonAction>
          {token && (
            <Button className="mt-3" onClick={doWotLogout}>
              Отвязать аккаунт
            </Button>
          )}
        </div>
        {isAuthProcessing.on && (
          <div className="text-center mt-3">
            <Loader />
          </div>
        )}
        {succesMsg.text && (
          <Alert type="success" className="mt-3">
            {succesMsg.text}
          </Alert>
        )}
        {errorMsg.text && (
          <Alert type="danger" className="mt-3">
            {errorMsg.text}
          </Alert>
        )}
      </Container>
    </PageFrame>
  );
};

export default memo(Auth);
