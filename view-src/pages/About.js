import { memo } from 'react';
import Container from '@/components/grid/Container';
import Title from '@/components/common/Title';
import Link from '@/components/common/Link';
import PageFrame from '@/layout/parts/PageFrame';
import List from '@/components/common/List';
import { version, author } from './../../package.json';
import preval from 'preval.macro';
import Button from '@/components/common/Button';
import { checkForUpdates } from '@/api/electronAPI';

const buildDate = preval`module.exports = new Date().toLocaleString();`;

const About = () => (
  <PageFrame basicFrame>
    <Container>
      <Title>О программе</Title>
      <List size="sm">
        <List.Item>Версия: {version}</List.Item>
        <List.Item>Дата: {buildDate}</List.Item>
        <List.Item>Автор: {author.name}</List.Item>
        <List.Item>
          E-mail: <Link href={`mailto:${author.email}`}>{author.email}</Link>
        </List.Item>
      </List>
      <Button className="mt-3" onClick={checkForUpdates}>Проверить наличие обновлений</Button>
    </Container>
  </PageFrame>
);

export default memo(About);
