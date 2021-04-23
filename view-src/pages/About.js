import { memo } from 'react';
import Container from '@/components/grid/Container';
import Title from '@/components/common/Title';
import Link from '@/components/common/Link';
import PageFrame from '@/layout/parts/PageFrame';
import List from '@/components/common/List';
import { version, author, repository } from './../../package.json';
import preval from 'preval.macro';
import Alert from '@/components/common/Alert';
import TextBoxSmall from '@/components/common/TextBoxSmall';
import AppUpdater from '@/components/special/AppUpdater';

const buildDate = preval`module.exports = new Date().toLocaleString();`;

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
        <AppUpdater />
      </Container>
    </PageFrame>
  );
};

export default memo(About);
