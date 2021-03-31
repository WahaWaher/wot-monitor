import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import ImgBattlePayments from '@/assets/img/reserves/150x150/battle_payments.png';
import ImgAdditionalBriefing from '@/assets/img/reserves/150x150/additional_briefing.png';
import ImgMilitaryManeuvers from '@/assets/img/reserves/150x150/military_maneuvers.png';
import ImgTacticalTraining from '@/assets/img/reserves/150x150/tactical_training.png';
import ImgClanBusterIcon from '@/assets/img/clan-booster-icon.png';
import Tooltip from '@/components/common/Tooltip';

const reserves = {
  BATTLE_PAYMENTS: {
    icon: ImgBattlePayments,
  },
  ADDITIONAL_BRIEFING: {
    icon: ImgAdditionalBriefing,
  },
  TACTICAL_TRAINING: {
    icon: ImgTacticalTraining,
  },
  MILITARY_MANEUVERS: {
    icon: ImgMilitaryManeuvers,
  },
};

const ReserveSlot = ({ size, active, type, timeLeft, ...rest }) => (
  <Root {...rest}>
    <Container size={size}>
      <BgProgress />
      <ReserveIcon active={active} data-tip data-for="reserve-descr">
        {reserves[type]?.icon && (
          <img src={reserves[type].icon} alt="reserve" />
        )}
      </ReserveIcon>
      <Tooltip id="reserve-descr" delayShow={500}>
        <div className="text-center">
          Развернутое <br /> описание
        </div>
      </Tooltip>
      <ActivatedIcon active={active}>
        <img src={ImgClanBusterIcon} alt="active" />
      </ActivatedIcon>
    </Container>
    <Timer active={active}>{timeLeft}</Timer>
  </Root>
);

const Root = styled.div`
  flex-wrap: wrap;
  position: relative;
`;

const Container = styled.div`
  ${({ size }) => css`
    width: ${size}px;
    height: ${size}px;
    position: relative;
  `}
`;

const BgProgress = styled.div`
  position: relative;
`;

const ReserveIcon = styled.div`
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

const ActivatedIcon = styled.div`
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

const Timer = styled.div`
  ${({ active }) => css`
    display: ${active ? 'flex' : 'none'};
    min-height: 0.8rem;
    align-items: center;
    white-space: nowrap;
    justify-content: center;
    line-height: 1;
    font-size: 0.8rem;
  `}
`;

ReserveSlot.propTypes = {
  size: PropTypes.number,
  active: PropTypes.bool,
  timeLeft: PropTypes.string,
  type: PropTypes.oneOf([
    'BATTLE_PAYMENTS',
    'ADDITIONAL_BRIEFING',
    'TACTICAL_TRAINING',
    'MILITARY_MANEUVERS',
  ]),
};

ReserveSlot.defaultProps = {
  size: 75,
  active: false,
  timeLeft: null,
  type: null,
};

export default ReserveSlot;
