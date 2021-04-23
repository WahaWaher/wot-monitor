import { memo } from 'react';
import Container from '@/components/grid/Container';
import Title from '@/components/common/Title';
import Link from '@/components/common/Link';
import PageFrame from '@/layout/parts/PageFrame';
import List from '@/components/common/List';
import { version, author, repository } from './../../package.json';
import preval from 'preval.macro';
import Button from '@/components/common/Button';
import { useAppUpdate } from '@/hooks';
import Loader from '@/components/common/Loader';
import Alert from '@/components/common/Alert';
import byteSize from 'byte-size';
import TextBoxSmall from '@/components/common/TextBoxSmall';
import format from 'date-fns/format';

const buildDate = preval`module.exports = new Date().toLocaleString();`;

const UpdateModule = () => {
  const {
    update,
    checkForUpdates,
    downloadUpdate,
    installUpdate,
  } = useAppUpdate();

  return (
    <div>
      <Button
        onClick={checkForUpdates}
        disabled={update.loading || update.progress}
      >
        Проверить наличие обновлений
      </Button>
      {update.loading && !update.available && <Loader className="ml-2" />}

      {update.info && !update.error && (
        <div>
          <div className="my-3">
            <div>
              <TextBoxSmall className="d-inline-block">
                Последняя версия:
              </TextBoxSmall>{' '}
              {update?.info?.version}
            </div>
            <div>
              <TextBoxSmall className="d-inline-block">
                Дата выхода:
              </TextBoxSmall>{' '}
              {format(new Date(update?.info?.releaseDate), 'dd.MM.yyyy')}
            </div>
          </div>
          <div className="my-2">
            {update.available &&
              update.downloaded === null &&
              !update.progress && (
                <>
                  <Alert type="warning" dense className="my-2">
                    <strong>Найдена новая версия!</strong> <br />
                    Нажмите «Скачать» и следуйте дальнейшим инструкциям
                  </Alert>
                  <Button onClick={downloadUpdate} disabled={update.loading}>
                    Скачать обновления
                  </Button>
                  {update.loading && (
                    <>
                      <Loader className="mx-2" />{' '}
                      <TextBoxSmall className="d-inline-block">
                        Пожалуйста, подождите...
                      </TextBoxSmall>
                    </>
                  )}
                </>
              )}
            {update.available === false && update.downloaded === null && (
              <Alert type="success" dense className="my-2">
                <strong>Обновление не требуется!</strong> <br />
                Используется последняя версия приложения
              </Alert>
            )}
            {update.downloaded && (
              <>
                <Alert type="success" dense className="my-2">
                  <strong>Обновления успешно скачаны!</strong> <br />
                  Нажмите «Установить обновления» <br />
                  Приложение закроется, запустится процесс установки
                </Alert>
                <Button onClick={installUpdate} disabled={update.loading}>
                  Установить обновления
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {update.progress && (
        <div className="my-2">
          <Alert type="success" dense className="my-2">
            <strong>Запущен процесс скачивания!</strong> <br />
            Пожалуйста, дождитесь окончания
          </Alert>
          <Loader className="mr-2" />
          <span>
            <strong className="pr-3">
              {update.progress.percent.toFixed(1)} %
            </strong>
            <TextBoxSmall className="d-inline-block">
              {byteSize(update.progress.transferred).toString()} из{' '}
              {byteSize(update.progress.total).toString()}
            </TextBoxSmall>
          </span>
        </div>
      )}

      {update.error && (
        <div className="my-2">
          <Alert type="danger" dense>
            Ошибка!
            <br />
            {update?.error?.message}
          </Alert>
        </div>
      )}
    </div>
  );
};

const About = () => {
  return (
    <PageFrame basicFrame>
      <Container>
        <Title>О программе</Title>
        <List size="sm">
          <List.Item>
            <TextBoxSmall className="d-inline-block">
              Текущая версия:
            </TextBoxSmall>{' '}
            {version}
          </List.Item>
          <List.Item>
            <TextBoxSmall className="d-inline-block">Дата выхода:</TextBoxSmall>{' '}
            {buildDate}
          </List.Item>
          <List.Item>
            <TextBoxSmall className="d-inline-block">Автор:</TextBoxSmall>{' '}
            {author.name} / Сергей Кравченко
          </List.Item>
          <List.Item>
            <TextBoxSmall className="d-inline-block">E-mail:</TextBoxSmall>{' '}
            <Link href={`mailto:${author.email}`}>{author.email}</Link>
          </List.Item>
        </List>
        <div className="mt-4"></div>
        <Title size="3">Обновления и обратная свзяь</Title>
        <Alert type="info" className="mb-3">
          Посмотреть историю изменений, задать вопрос, сообщить об ошибке, а
          также{' '}
          <Link href={`${repository.url}/releases`}>
            скачать последнюю версию приложения
          </Link>{' '}
          можно на <br />
          <Link href={repository.url}>оф. репозитории GitHub</Link>
        </Alert>
        <UpdateModule />
      </Container>
    </PageFrame>
  );
};

export default memo(About);
