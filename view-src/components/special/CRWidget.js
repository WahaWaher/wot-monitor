import ButtonIconed from '@/components/common/ButtonIconed';
import Switch from '@/components/common/Switch';
import ReserveSlot from '@/components/widgets/parts/ReserveSlot';
import Widget from '@/components/widgets/Widget';
import { useCRWidgetRefreshCounter } from '@/hooks';
import { useStoreProfileActions } from '@/store/hooks/useStoreActions';
import {
  getAuth,
  getClanReserves,
  getWCRSettings,
  hasActiveReserves,
} from '@/store/selectors/profileSelectors';
import {
  formatReserveTimeLeft,
  formatSeconds,
  fromatDateFromTimeStamp,
  getNowTimeStamp,
} from '@/utils/dates';
import { mdiBellOffOutline, mdiBellOutline, mdiRefresh } from '@mdi/js';
import Icon from '@mdi/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import List from '@/components/common/List';
import Loader from '@/components/common/Loader';
import Title from '@/components/common/Title';
import debounce from 'lodash-es/debounce';
import { timeout } from '@/utils';
import { reserveStatusNames } from '@/messages/data';

const timeLeft = ({ isActive, active: { active_till } = {} }) => {
  const isLessMin = active_till - getNowTimeStamp() <= 60;

  if (isLessMin) {
    return 'менее минуты';
  }

  return isActive && formatReserveTimeLeft(active_till);
};

const genStockStatus = (stock = []) => {
  const [{ status } = {}] = stock;
  const { unknown } = reserveStatusNames;

  return reserveStatusNames[status] || unknown;
};

const genStatus = (on, error, hasActives, token) => {
  if (on && !error && !hasActives) {
    return 'Ведется мониторинг. На данный момент нет активных клановых резервов';
  }
  if (on && !error && hasActives) {
    return 'Ведется мониторинг. Найдены активные клановые резервы';
  }
  if (on && error.name === 'INTERNET_DISCONNECTED_ERR') {
    return 'Нет доступа к сети. Мониторинг будет возобновлен после наладки соединения';
  }
  if (on && error) {
    return `${
      error?.message ? error.message : 'Ошибка'
    }. Если ошибка временная, мониторинг будет автоматически возобновлен`;
  }
  if (!on && !error) {
    return 'Виджет не активен. Требуется заупск';
  }
  if (!on && !token) {
    return 'Необходимо подключть аккаунт World of Tanks и выполнить повторный запуск';
  }
  if (!on && error) {
    return `Мониторинг приостановлен${
      error?.message ? `. ${error.message}` : ''
    }`;
  }

  return 'Статус мониторинга неизвестен. Пожалуйста, перезапустите виджет';
};

const genStatusDebounced = debounce(
  (on, error, hasActives, token, setState) => {
    setState(genStatus(on, error, hasActives, token));
  },
  200
);

const CRWidgetInfo = () => {
  const hasActives = useSelector(hasActiveReserves);
  const { on, error } = useSelector(getClanReserves);
  const { token } = useSelector(getAuth);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    genStatusDebounced(on, error, hasActives, token, setStatus);
  }, [on, error, hasActives, token]);

  return (
    <div className="mx-auto" style={{ width: '80%' }}>
      {status}
    </div>
  );
};

const CRWidgetControls = () => {
  const { on } = useSelector(getClanReserves);
  const { sendNotices } = useSelector(getWCRSettings);
  const {
    toogleCRWidget,
    doCRWidgetTik,
    saveSettings,
  } = useStoreProfileActions();
  const [isRefreshDisabled, setIsRefreshDisabled] = useState(false);

  return (
    <div className="d-flex align-items-center">
      {on && (
        <ButtonIconed
          size="sm"
          type="light"
          disabled={isRefreshDisabled}
          onClick={async () => {
            setIsRefreshDisabled(true);
            doCRWidgetTik({ single: true });
            await timeout(3000);
            setIsRefreshDisabled(false);
          }}
        >
          <Icon path={mdiRefresh} />
        </ButtonIconed>
      )}
      <ButtonIconed
        size="sm"
        type="light"
        onClick={() =>
          saveSettings({
            widgets: {
              widgetClanRes: { sendNotices: !sendNotices },
            },
          })
        }
      >
        <Icon path={sendNotices ? mdiBellOutline : mdiBellOffOutline} />
      </ButtonIconed>
      <Switch
        className="ml-2"
        size="sm"
        checked={on}
        onChange={toogleCRWidget}
      />
    </div>
  );
};

const CRWidget = () => {
  const { reserves } = useSelector(getClanReserves);
  const { counter } = useCRWidgetRefreshCounter();

  return (
    <Root>
      <Widget
        title="Клановые резервы"
        info={<CRWidgetInfo />}
        controls={<CRWidgetControls />}
        renderStatusLine={() =>
          counter ? (
            <span>
              До обновления: {counter === 'loading' ? <Loader /> : counter}
            </span>
          ) : (
            <span> Виджет не активен </span>
          )
        }
      >
        <div
          className="d-flex flex-wrap justify-content-center my-n3"
          style={{ minHeight: 90 }}
        >
          {Object.values(reserves).map((item) => {
            const { type, name, isActive, active = {}, in_stock = [] } = item;
            const {
              active_till,
              activated_at,
              action_time,
              bonus_values = [],
            } = active;

            return (
              <ReserveSlot
                className="my-2"
                type={type}
                active={isActive}
                timeLeft={timeLeft(item)}
                rednderTooltip={() => (
                  <div className="my-n2">
                    <Title size="4" className="mb-2">
                      {name}
                    </Title>
                    <div className="mt-2">
                      <strong> Статус </strong>: {genStockStatus(in_stock)}
                    </div>
                    {isActive ? (
                      <div className="mt-2">
                        {bonus_values.map(({ value, battle_type }, key) => (
                          <div key={key}>
                            <strong> +{value * 100} % </strong> на{' '}
                            {formatSeconds(action_time)}{' '}
                            {battle_type.toLowerCase()}
                          </div>
                        ))}
                        <div className="my-2">
                          <div>
                            Активирован :{fromatDateFromTimeStamp(activated_at)}
                          </div>
                          <div>
                            Активен до: {fromatDateFromTimeStamp(active_till)}
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {in_stock.length > 0 && (
                      <div className="mt-2">
                        <Title size="5" className="m-0">
                          На складе:
                        </Title>
                        <List size="sm" className="mt-1">
                          {in_stock.map(({ amount, level }, key) => (
                            <List.Item key={key}>
                              <small>
                                {level} уровень: {amount} шт.
                              </small>
                            </List.Item>
                          ))}
                        </List>
                      </div>
                    )}
                  </div>
                )}
                key={type}
              />
            );
          })}
        </div>
      </Widget>
    </Root>
  );
};

const Root = styled.div`
  user-select: none;
`;

export default CRWidget;
