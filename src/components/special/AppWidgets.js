import styled from 'styled-components';
import Widget from '@/components/widgets/Widget';
import ReserveSlot from '@/components/widgets/parts/ReserveSlot';
import ButtonIconed from '@/components/common/ButtonIconed';
import { useToggle } from '@/hooks';
import Switch from '@/components/common/Switch';
import Icon from '@mdi/react';
import { mdiBellOutline, mdiBellOffOutline, mdiRefresh } from '@mdi/js';

const Info = () => (
  <div>
    На данный момент <br /> нет активных клановых резервов
  </div>
);

const WidgetControls = () => {
  const notifications = useToggle(true);
  const power = useToggle(true);

  return (
    <div className="d-flex align-items-center">
      <ButtonIconed size="sm" type="light">
        <Icon path={mdiRefresh} />
      </ButtonIconed>
      <ButtonIconed size="sm" type="light" onClick={notifications.toggle}>
        <Icon path={notifications.on ? mdiBellOutline : mdiBellOffOutline} />
      </ButtonIconed>
      <Switch
        className="ml-2"
        size="sm"
        checked={power.on}
        onChange={power.toggle}
      />
    </div>
  );
};

const AppWidgets = () => (
  <Root>
    <Widget
      title="Клановые резервы"
      info={<Info />}
      controls={<WidgetControls />}
      statusLine="До обновления: 3 мин 45 сек"
    >
      <div
        className="d-flex flex-wrap justify-content-center my-n3"
        style={{ minHeight: 90 }}
      >
        <ReserveSlot
          active={true}
          type="BATTLE_PAYMENTS"
          timeLeft="1 ч 59 мин"
          className="my-2"
        ></ReserveSlot>
        <ReserveSlot
          active={true}
          type="ADDITIONAL_BRIEFING"
          timeLeft="29 мин"
          className="my-2"
        ></ReserveSlot>
        <ReserveSlot
          active={false}
          type="TACTICAL_TRAINING"
          timeLeft="32 мин"
          className="my-2"
        ></ReserveSlot>
        <ReserveSlot
          active={true}
          type="MILITARY_MANEUVERS"
          timeLeft="1 ч 19 мин"
          className="my-2"
        ></ReserveSlot>
      </div>
    </Widget>
  </Root>
);

const Root = styled.div``;

export default AppWidgets;
