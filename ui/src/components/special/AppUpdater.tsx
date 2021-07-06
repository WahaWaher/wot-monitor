import Alert from '@/components/common/Alert';
import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import TextBoxSmall from '@/components/common/TextBoxSmall';
import { useStoreUpdateActions } from '@/store/hooks/useStoreActions';
import { getUpdate } from '@/store/selectors/updateSelectors';
import byteSize from 'byte-size';
import format from 'date-fns/format';
import { FC } from 'react';
import { useSelector } from 'react-redux';

const AppUpdater: FC = () => {
  const { info, available, downloaded, loading, progress, error } =
    useSelector(getUpdate);
  const { checkForUpdates, downloadUpdate, installUpdate } =
    useStoreUpdateActions();

  return (
    <div>
      <Button onClick={checkForUpdates} disabled={loading || progress}>
        Проверить наличие обновлений
      </Button>
      {loading && !available && <Loader className="ml-2" />}

      {info && !error && (
        <div>
          <div className="my-3">
            <div>
              <TextBoxSmall className="d-inline-block">
                Последняя версия:
              </TextBoxSmall>{' '}
              {info?.version}
            </div>
            <div>
              <TextBoxSmall className="d-inline-block">
                Дата выхода:
              </TextBoxSmall>{' '}
              {format(new Date(info?.releaseDate), 'dd.MM.yyyy')}
            </div>
          </div>
          <div className="my-2">
            {available && downloaded === null && !progress && (
              <>
                <Alert type="warning" dense className="my-2">
                  <strong>Найдена новая версия!</strong> <br />
                  Нажмите «Скачать» и следуйте дальнейшим инструкциям
                </Alert>
                <Button onClick={downloadUpdate} disabled={loading}>
                  Скачать обновления
                </Button>
                {loading && (
                  <>
                    <Loader className="mx-2" />{' '}
                    <TextBoxSmall className="d-inline-block">
                      Пожалуйста, подождите...
                    </TextBoxSmall>
                  </>
                )}
              </>
            )}
            {available === false && downloaded === null && (
              <Alert type="success" dense className="my-2">
                <strong>Обновление не требуется!</strong> <br />
                Используется последняя версия приложения
              </Alert>
            )}
            {downloaded && (
              <>
                <Alert type="success" dense className="my-2">
                  <strong>Обновления успешно скачаны!</strong> <br />
                  Нажмите «Установить обновления» <br />
                  Приложение закроется, запустится процесс установки
                </Alert>
                <Button onClick={installUpdate} disabled={loading}>
                  Установить обновления
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {progress && (
        <div className="my-2">
          <Alert type="success" dense className="my-2">
            <strong>Запущен процесс скачивания!</strong> <br />
            Пожалуйста, дождитесь окончания
          </Alert>
          <Loader className="mr-2" />
          <span>
            <strong className="pr-3">{progress.percent.toFixed(1)} %</strong>
            <TextBoxSmall className="d-inline-block">
              {byteSize(progress.transferred).toString()} из{' '}
              {byteSize(progress.total).toString()}
            </TextBoxSmall>
          </span>
        </div>
      )}

      {error && (
        <div className="my-2">
          <Alert type="danger" dense>
            <strong>Ошибка!</strong>
            <br />
            {error?.message}
          </Alert>
        </div>
      )}
    </div>
  );
};

export default AppUpdater;
