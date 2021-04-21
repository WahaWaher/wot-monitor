import styled from 'styled-components';
import TextBoxSmall from '@/components/common/TextBoxSmall';
import Switch from '@/components/common/Switch';
import NumericField from '@/components/common/form/NumericField';
import Option from '@/components/common/Option';
import { useSelector } from 'react-redux';
import {
  getProfileInfo,
  getSettings,
  getWCRSettings,
} from '@/store/selectors/profileSelectors';
import { useStoreProfileActions } from '@/store/hooks/useStoreActions';
import Title from '@/components/common/Title';
import Select from '@/components/common/form/Select';
import { osNoticeTypeNames } from '@/messages/data';
import ValidationAlert from '../common/form/ValidationAlert';
import { timeout } from '@/utils';
import { useFormik } from 'formik';

const AppSettings = () => {
  const { saveSettings, switchOpenOnStartup } = useStoreProfileActions();
  const profileInfo = useSelector(getProfileInfo);
  const {
    common: {
      openOnSystemStartUp,
      minimizeOnClose,
      openMinimized,
      showUnreadBadge,
      osNoticesOnMinimizedOnly,
    },
    widgets: { widgetClanRes },
  } = useSelector(getSettings);

  return (
    <Root>
      <TextBoxSmall>
        Текущий профиль: <strong>{profileInfo.name}</strong>
      </TextBoxSmall>

      <div className="mt-3">
        <Title size="3">Общие</Title>
        <Option>
          <Option.Text>Запускать при старте системы</Option.Text>
          <Option.Value>
            <Switch
              checked={openOnSystemStartUp}
              onChange={switchOpenOnStartup}
            />
          </Option.Value>
        </Option>
        <Option>
          <Option.Text>Запускать в фоновом режиме</Option.Text>
          <Option.Value>
            <Switch
              checked={openMinimized}
              onChange={(value) =>
                saveSettings({
                  common: { openMinimized: value },
                })
              }
            />
          </Option.Value>
        </Option>
        <Option>
          <Option.Text>Сворачивать в трей при закрытии</Option.Text>
          <Option.Value>
            <Switch
              checked={minimizeOnClose}
              onChange={(value) =>
                saveSettings({
                  common: { minimizeOnClose: value },
                })
              }
            />
          </Option.Value>
        </Option>
        <Option>
          <Option.Text>
            Показывать бейдж с непрочитанными сообщениями на кнопке уведомлений
          </Option.Text>
          <Option.Value>
            <Switch
              checked={showUnreadBadge}
              onChange={(value) =>
                saveSettings({
                  common: { showUnreadBadge: value },
                })
              }
            />
          </Option.Value>
        </Option>
        <Option>
          <Option.Text>
            Отправлять сообщения в центр уведомления Windows только если
            приложение свернуто
          </Option.Text>
          <Option.Value>
            <Switch
              checked={osNoticesOnMinimizedOnly}
              onChange={(value) =>
                saveSettings({
                  common: { osNoticesOnMinimizedOnly: value },
                })
              }
            />
          </Option.Value>
        </Option>
      </div>

      <div className="mt-4">
        <Title size="3">Виджет «Клановые резервы»</Title>
        <Option>
          <Option.Text>
            Активация при запуске
            <small className="d-block mt-2">
              <em>
                При вкл. опции виджет будет активирован принудительно, в
                противном случае - по последнему состоянию
              </em>
            </small>
          </Option.Text>
          <Option.Value>
            <Switch
              checked={widgetClanRes.startOnOpen}
              onChange={(value) =>
                saveSettings({
                  widgets: { widgetClanRes: { startOnOpen: value } },
                })
              }
            />
          </Option.Value>
        </Option>
        <Option>
          <Option.Text>Получать уведомления о работе виджета</Option.Text>
          <Option.Value>
            <Switch
              checked={widgetClanRes.sendNotices}
              onChange={(value) =>
                saveSettings({
                  widgets: { widgetClanRes: { sendNotices: value } },
                })
              }
            />
          </Option.Value>
        </Option>
        <Option>
          <Option.Text>
            Отправлять уведомление о работе виджета в Центр Уведомлений Windows
          </Option.Text>
          <Option.Value>
            <Switch
              checked={widgetClanRes.sendOSNotices}
              onChange={(value) =>
                saveSettings({
                  widgets: { widgetClanRes: { sendOSNotices: value } },
                })
              }
            />
          </Option.Value>
        </Option>
        <Option>
          <Option.Text fullWidth>
            Центр Уведомлений Windows: <br />
            Фильтр сообщений
            <small className="d-block mt-2">
              <em>
                В Центр Уведомлений Windows будут поступать сообщения только
                выбранных типов
              </em>
            </small>
          </Option.Text>
          <Option.Value fullWidth>
            <Select
              wide
              noOptionsMessage={() => 'Нет доступных вариантов'}
              isMulti
              options={['reserve', 'stop'].map((value) => ({
                value,
                label: osNoticeTypeNames[value],
              }))}
              value={widgetClanRes.osNoticesTypes.map((value) => ({
                value,
                label: osNoticeTypeNames[value],
              }))}
              onChange={(selected) =>
                saveSettings({
                  widgets: {
                    widgetClanRes: {
                      osNoticesTypes: selected.map(({ value }) => value),
                    },
                  },
                })
              }
            />
          </Option.Value>
        </Option>
        <Option>
          <Option.Text fullWidth>Интервал обновления, сек</Option.Text>
          <Option.Value fullWidth>
            <UpdateIntervalField />
          </Option.Value>
        </Option>
      </div>
    </Root>
  );
};

const UpdateIntervalField = () => {
  const { updateInterval } = useSelector(getWCRSettings);
  const { saveSettings } = useStoreProfileActions();
  const { values, isSubmitting, setFieldValue, submitForm, errors } = useFormik(
    {
      initialValues: { updateInterval },
      onSubmit: async (values, { setSubmitting }) => {
        if (values.updateInterval === updateInterval) return;

        await saveSettings({
          widgets: { widgetClanRes: { updateInterval: values.updateInterval } },
        });
        await timeout(500);

        setSubmitting(false);
      },
    }
  );

  return (
    <>
      <NumericField
        min={5}
        max={86400}
        step={1}
        value={values.updateInterval}
        onChange={(value) => setFieldValue('updateInterval', value)}
        onBlur={submitForm}
        isLoading={isSubmitting}
        strict
      />
      {errors.updateInterval && (
        <ValidationAlert type="warning">
          {errors.updateInterval}
        </ValidationAlert>
      )}
    </>
  );
};

const Root = styled.div``;

export default AppSettings;
