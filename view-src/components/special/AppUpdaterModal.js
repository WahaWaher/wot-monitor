import { getUpdate } from '@/store/selectors/updateSelectors';
import { useSelector } from 'react-redux';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import { useStoreUpdateActions } from '@/store/hooks/useStoreActions';
import { useHistory } from 'react-router-dom';
import routes from '@/router/routes';
import { useState } from 'react';
import Title from '../common/Title';
import TextBoxSmall from '../common/TextBoxSmall';
import format from 'date-fns/format';
import { getCommonSettings } from '@/store/selectors/profileSelectors';

const AppUpdaterModal = (props) => {
  const history = useHistory();
  const { isCheckOnStart, available, info } = useSelector(getUpdate);
  const { checkUpdates } = useSelector(getCommonSettings);
  const { resetUpdateData, downloadUpdate } = useStoreUpdateActions();
  const [isOpen, setIsOpen] = useState(isCheckOnStart && available);
  const close = () => setIsOpen(false);

  if (!checkUpdates) return null;

  return (
    <Modal
      isOpen={isOpen}
      setOpen={close}
      type="info"
      renderControls={() => (
        <div className="d-flex w-100p mt-1">
          <Button
            className="mx-1"
            wide
            onClick={() => {
              history.push(routes.about.path);
              close();
              downloadUpdate();
            }}
          >
            Обновить
          </Button>
          <Button
            className="mx-1"
            wide
            onClick={() => {
              close();
              resetUpdateData();
            }}
          >
            Позже
          </Button>
        </div>
      )}
    >
      <Title size="3">Доступна новая вресия приложения!</Title>
      {info && (
        <div>
          <div>
            <TextBoxSmall className="d-inline-block">
              Последняя версия:
            </TextBoxSmall>{' '}
            {info?.version}
          </div>
          <div>
            <TextBoxSmall className="d-inline-block">Дата выхода:</TextBoxSmall>{' '}
            {format(new Date(info.releaseDate), 'dd.MM.yyyy')}
          </div>
        </div>
      )}
    </Modal>
  );
};

export default AppUpdaterModal;
