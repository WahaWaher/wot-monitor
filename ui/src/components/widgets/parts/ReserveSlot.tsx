import ImgClanBusterIcon from '@/assets/img/clan-booster-icon.png';
import ImgAdditionalBriefing from '@/assets/img/reserves/150x150/additional_briefing.png';
import ImgBattlePayments from '@/assets/img/reserves/150x150/battle_payments.png';
import ImgMilitaryManeuvers from '@/assets/img/reserves/150x150/military_maneuvers.png';
import ImgTacticalTraining from '@/assets/img/reserves/150x150/tactical_training.png';
import Tooltip from '@/components/common/Tooltip';
import {
  ADDITIONAL_BRIEFING,
  BATTLE_PAYMENTS,
  MILITARY_MANEUVERS,
  TACTICAL_TRAINING,
} from '@/constants';
import { FC } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  size?: number;
  active?: boolean;
  timeLeft?: string | boolean;
  rednderTooltip?: () => Nullable<JSX.Element>;
  type?: TargetReservesType;
  className?: string;
};

const defaultProps: Props = {
  size: 75,
  active: false,
  rednderTooltip: () => null,
};

const reserves: { [key in TargetReservesType]: { icon: string } } = {
  [BATTLE_PAYMENTS]: {
    icon: ImgBattlePayments,
  },
  [ADDITIONAL_BRIEFING]: {
    icon: ImgAdditionalBriefing,
  },
  [TACTICAL_TRAINING]: {
    icon: ImgTacticalTraining,
  },
  [MILITARY_MANEUVERS]: {
    icon: ImgMilitaryManeuvers,
  },
};

const ReserveSlot: FC<Props> = ({
  size,
  active,
  type,
  timeLeft,
  rednderTooltip,
  ...rest
}) => (
  <Root {...rest}>
    <Container {...{ size }}>
      <BgProgress />
      <ReserveIcon {...{ active }} data-tip data-for={`reserve-${type}`}>
        {type && reserves[type]?.icon && (
          <img src={reserves[type].icon} alt="reserve" />
        )}
      </ReserveIcon>
      <Tooltip
        id={`reserve-${type}`}
        delayShow={500}
        delayHide={0}
        maxWidth={225}
      >
        {rednderTooltip && rednderTooltip()}
      </Tooltip>
      <ActivatedIcon {...{ active }}>
        <img src={ImgClanBusterIcon} alt="active" />
      </ActivatedIcon>
    </Container>
    <Timer {...{ active }}>{timeLeft}</Timer>
  </Root>
);

const Root = styled.div`
  flex-wrap: wrap;
  position: relative;
`;

const Container = styled.div<Props>`
  ${({ size }) => css`
    width: ${size}px;
    height: ${size}px;
    position: relative;
  `}
`;

const BgProgress = styled.div`
  position: relative;
`;

const ReserveIcon = styled.div<Props>`
  ${({ active, theme: { transitions } }) => css`
    width: 100%;
    height: 100%;
    position: relative;
    transition: all ${transitions.duration.main}s;
    img {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: contain;
      opacity: ${active ? 1 : 0.25};
      filter: grayscale(${active ? 0 : 1});
      transition: all ${transitions.duration.main}s;
    }
  `}
`;

const ActivatedIcon = styled.div<Props>`
  ${({ active, theme: { transitions } }) => css`
    width: 48px;
    height: 48px;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(30%, -35%);
    opacity: ${active ? 1 : 0};
    transition: all ${transitions.duration.main}s;
    img {
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      object-fit: contain;
      transition: all ${transitions.duration.main}s;
    }
  `}
`;

const Timer = styled.div<Props>`
  ${({ active }) => css`
    display: flex;
    min-height: 0.8rem;
    align-items: center;
    white-space: nowrap;
    justify-content: center;
    line-height: 1;
    font-size: 0.8rem;
    visibility: ${active ? 'visible' : 'hidden'};
  `}
`;

ReserveSlot.defaultProps = defaultProps;

export default ReserveSlot;
