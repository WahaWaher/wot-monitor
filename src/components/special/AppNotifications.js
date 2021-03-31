import styled from 'styled-components';
import Container from '@/components/grid/Container';
import Message from '@/components/common/Message';
import ControlPanel from '@/components/common/ControlPanel';
import ButtonIconed from '@/components/common/ButtonIconed';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import Alert from '@/components/common/Alert';
import Icon from '@mdi/react';
import {
  mdiInformationOutline,
  mdiAlertOutline,
  mdiLightningBolt,
  mdiRefresh,
  mdiBroom,
  mdiDeleteForever,
  mdiCheckAll,
  mdiCloseCircleOutline,
} from '@mdi/js';
import { useToggle } from '@/hooks';

const AppNotifications = () => {
  const info = useToggle(true);
  const warnings = useToggle(true);
  const errors = useToggle(true);
  const reserves = useToggle(true);
  const modal = useToggle(false);

  return (
    <Root>
      <ControlPanel
        className="mt-3 mb-3"
        renderInfoBar={() => (
          <div>
            <small>Сообщений:</small> 18/47
          </div>
        )}
        renderControls={() => (
          <div className="d-flex alighn-items-center">
            <div className="mr-3">
              <ButtonIconed
                size="sm"
                type="light"
                active={info.on}
                onClick={info.toggle}
                tooltip="Вкл./Откл. отображение информационных сообщений"
                renderIcon={() => <Icon path={mdiInformationOutline} />}
              />
              <ButtonIconed
                size="sm"
                type="light"
                active={errors.on}
                onClick={errors.toggle}
                tooltip="Вкл./Откл. отображение сообщений об ошибках"
                renderIcon={() => <Icon path={mdiCloseCircleOutline} />}
              />
              <ButtonIconed
                size="sm"
                type="light"
                active={warnings.on}
                onClick={warnings.toggle}
                tooltip="Вкл./Откл. отображение предупреждающих сообщений"
                renderIcon={() => <Icon path={mdiAlertOutline} />}
              />
              <ButtonIconed
                size="sm"
                type="light"
                active={reserves.on}
                onClick={reserves.toggle}
                tooltip="Вкл./Откл. отображение сообщений о состоянии клановых резервов"
                renderIcon={() => <Icon path={mdiLightningBolt} />}
              />
            </div>
            <div>
              <ButtonIconed
                size="sm"
                type="light"
                tooltip="Обновить"
                renderIcon={() => <Icon path={mdiRefresh} />}
              />
              <ButtonIconed
                size="sm"
                type="light"
                tooltip="Пометить все, как прочитанные"
                renderIcon={() => <Icon path={mdiCheckAll} />}
              />
              <ButtonIconed
                size="sm"
                type="light"
                tooltip="Удалить все сообщения"
                renderIcon={() => <Icon path={mdiBroom} />}
              />
            </div>
          </div>
        )}
      />

      <Container>
        <Message
          className="my-2"
          type="info"
          date="03.03.2021 21:48"
          read={false}
          renderControls={() => (
            <ButtonIconed size="sm" type="light" onClick={modal.toggle}>
              <Icon path={mdiDeleteForever} />
            </ButtonIconed>
          )}
        >
          Начат процесс обновления Wargaming.net Game Center.
        </Message>
        <Message
          className="my-2"
          type="warning"
          date="03.03.2021 21:48"
          read={true}
          renderControls={() => (
            <ButtonIconed size="sm" type="light" onClick={modal.toggle}>
              <Icon path={mdiDeleteForever} />
            </ButtonIconed>
          )}
        >
          Найдено обновление для World of Tanks СНГ. Начался процесс обновления.
        </Message>
        <Message
          className="my-2"
          type="reserve"
          date="03.03.2021 21:48"
          read={false}
          renderControls={() => (
            <ButtonIconed size="sm" type="light" onClick={modal.toggle}>
              <Icon path={mdiDeleteForever} />
            </ButtonIconed>
          )}
        >
          Активирован клановый резерв...
        </Message>
        <Message
          className="my-2"
          type="error"
          date="03.03.2021 21:48"
          read={false}
          renderControls={() => (
            <ButtonIconed size="sm" type="light" onClick={modal.toggle}>
              <Icon path={mdiDeleteForever} />
            </ButtonIconed>
          )}
        >
          Что-то пошло не так... Пожалуйста, попробуйте позже.
        </Message>

        <Alert shape="compact" center>
          Уведомления отсутствуют...
        </Alert>
      </Container>

      <Modal
        isOpen={modal.on}
        setOpen={modal.toggle}
        type="warning"
        renderControls={() => (
          <>
            <Button wide onClick={modal.toggle}>
              Удалить
            </Button>
            <span className="mx-1"></span>
            <Button wide onClick={modal.toggle}>
              Отмена
            </Button>
          </>
        )}
      >
        Уверены, что хотите удалить все сообщения?
      </Modal>
    </Root>
  );
};

const Root = styled.div``;

export default AppNotifications;
