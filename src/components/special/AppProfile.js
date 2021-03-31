import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Title from '@/components/common/Title';
import OptionItem from '@/components/common/OptionItem';
import OptionText from '@/components/common/OptionText';
import OptionValue from '@/components/common/OptionValue';
import TextBoxSmall from '@/components/common/TextBoxSmall';
import TextField from '@/components/common/form/TextField';
import Alert from '@/components/common/Alert';
import ValidationAlert from '@/components/common/form/ValidationAlert';
import Link from '@/components/common/Link';
import Button from '@/components/common/Button';
import Row from '@/components/grid/Row';
import Col from '@/components/grid/Col';
import { useInput } from '@/hooks';
import routes from '@/router/routes';

const AppProfile = () => {
  const name = useInput('Default');

  return (
    <Root>
      <div className="my-4">
        <OptionItem>
          <OptionText>ID</OptionText>
          <OptionValue>
            <TextBoxSmall>1</TextBoxSmall>
          </OptionValue>
        </OptionItem>
        <OptionItem>
          <OptionText>Имя</OptionText>
          <OptionValue>
            <TextField
              value={name.value}
              onChange={(e) => name.setValue(e.target.value)}
            />
          </OptionValue>
          <ValidationAlert>Неверно указано значение</ValidationAlert>
        </OptionItem>
        <OptionItem>
          <OptionText fullWidth>Файл с настройками</OptionText>
          <OptionValue fullWidth>
            <TextBoxSmall>
              C:\Users\WahaWaher\AppData\Roaming\wot-monitor\app-store.json
            </TextBoxSmall>
            <Row className="mt-3">
              <Col width="50%">
                <Button wide>Импорт</Button>
              </Col>
              <Col width="50%">
                <Button wide>Экспорт</Button>
              </Col>
            </Row>
            <ValidationAlert type="success">
              Настройки успешно импортированы
            </ValidationAlert>
          </OptionValue>
        </OptionItem>
      </div>

      <div className="my-4">
        <Title size="3" slim>
          Привязанные аккаунты
        </Title>
        <div className="my-3">
          <OptionItem>
            <OptionText>ID аккаунта</OptionText>
            <OptionValue>
              <TextBoxSmall>4561216546</TextBoxSmall>
            </OptionValue>
          </OptionItem>
          <OptionItem>
            <OptionText>Ник</OptionText>
            <OptionValue>
              <TextBoxSmall>WahaWaher</TextBoxSmall>
            </OptionValue>
          </OptionItem>
          <OptionItem>
            <OptionText>Токен</OptionText>
            <OptionValue>
              <TextBoxSmall>sdf6sf88g7fg7fg8d</TextBoxSmall>
            </OptionValue>
          </OptionItem>
          <OptionItem>
            <OptionText>Привязка активна до</OptionText>
            <OptionValue>
              <TextBoxSmall>14.06.2021 12:50</TextBoxSmall>
            </OptionValue>
          </OptionItem>
          <Alert type="warning">
            На данный момент нет привязанных аккаунтов World of Tanks. Вы можете
            сделать привязку на странице <Link as={NavLink} to={routes.auth.path}>авторизации</Link>
          </Alert>
        </div>
      </div>
    </Root>
  );
};

const Root = styled.div``;

export default AppProfile;
