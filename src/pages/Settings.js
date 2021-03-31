import { memo } from 'react';
import Container from '@/components/grid/Container';
import Title from '@/components/common/Title';
import PageFrame from '@/layout/parts/PageFrame';
import TextBoxSmall from '@/components/common/TextBoxSmall';
import Switch from '@/components/common/Switch';
import TextField from '@/components/common/form/TextField';
import NumericField from '@/components/common/form/NumericField';
import ValidationAlert from '@/components/common/form/ValidationAlert';
import OptionItem from '@/components/common/OptionItem';
import OptionText from '@/components/common/OptionText';
import OptionValue from '@/components/common/OptionValue';
import Select from '@/components/common/form/Select';
import { useToggle, useInput } from '@/hooks';

const Settings = () => {
  const openOnSystemStartUp = useToggle(true);
  const minimizeOnClose = useToggle(true);
  const pushToNotePanel = useToggle(true);
  const checkInterval = useInput(5);

  return (
    <PageFrame basicFrame>
      <Container>
        <Title>Настройки</Title>

        <TextBoxSmall>
          Текущий профиль: <strong>Default</strong>
        </TextBoxSmall>

        <div className="mt-3">
          <OptionItem>
            <OptionText>Запускать при старте системы</OptionText>
            <OptionValue>
              <Switch
                checked={openOnSystemStartUp.on}
                onChange={openOnSystemStartUp.toggle}
              />
            </OptionValue>
          </OptionItem>
          <OptionItem>
            <OptionText>Сворачивать в трей при закрытии</OptionText>
            <OptionValue>
              <Switch
                checked={minimizeOnClose.on}
                onChange={minimizeOnClose.toggle}
              />
            </OptionValue>
          </OptionItem>
          <OptionItem>
            <OptionText>
              Отправлять сообщения в Центр уведомлений Windows
            </OptionText>
            <OptionValue>
              <Switch
                checked={pushToNotePanel.on}
                onChange={pushToNotePanel.toggle}
              />
            </OptionValue>
          </OptionItem>
          <OptionItem>
            <OptionText fullWidth>Тестовое тектовое поле</OptionText>
            <OptionValue fullWidth>
              <TextField
                value={checkInterval.value}
                onChange={(e) => checkInterval.setValue(e.target.value)}
              />
              <ValidationAlert>Неверно указано значение</ValidationAlert>
            </OptionValue>
          </OptionItem>
          <OptionItem>
            <OptionText fullWidth>Интервал обновления виджетов, мин</OptionText>
            <OptionValue fullWidth>
              <NumericField
                min={0}
                max={1440}
                value={checkInterval.value}
                onChange={(value) => checkInterval.setValue(value)}
              />
              <ValidationAlert>Неверно указано значение</ValidationAlert>
            </OptionValue>
          </OptionItem>
          <OptionItem>
            <OptionText fullWidth>
              Фильтр сообщений в панели уведомлений.
              <small className="d-block mt-2">
                <em>
                  Выберите типы сообщений, которые хотите видеть в панели
                  уведомлений.
                </em>
              </small>
            </OptionText>
            <OptionValue fullWidth>
              <Select
                wide
                name="checkInterval"
                noOptionsMessage={() => 'Нет доступных типов...'}
                isMulti
                options={[
                  { value: 'info', label: 'Общие информационные сообщения' },
                  { value: 'warnings', label: 'Общие предупреждения' },
                  { value: 'errors', label: 'Ошбщие ошибки' },
                  { value: 'reserves', label: 'Состояние клановых резервов' },
                ]}
                // value={[
                //   { value: 'info', label: 'Общие информационные сообщения' },
                //   { value: 'warnings', label: 'Общие предупреждения' },
                //   { value: 'errors', label: 'Ошбщие ошибки' },
                //   { value: 'reserves', label: 'Состояние клановых резервов' },
                // ]}
              />
            </OptionValue>
          </OptionItem>
        </div>
      </Container>
    </PageFrame>
  );
};

export default memo(Settings);
