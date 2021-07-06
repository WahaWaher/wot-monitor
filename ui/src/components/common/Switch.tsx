import { useTheme } from '@/hooks';
import { FC } from 'react';
import ReactSwitch, { ReactSwitchProps } from 'react-switch';

type Props = {
  size?: 'md' | 'sm';
};

const defaultProps: Props = {
  size: 'md',
};

const switchSizes: {
  [key in Required<Props>['size']]: Partial<ReactSwitchProps>;
} = {
  md: {
    handleDiameter: 18,
    height: 18,
    width: 30,
  },
  sm: {
    handleDiameter: 16,
    height: 16,
    width: 28,
  },
};

const checkedHandleIcon: JSX.Element = (
  <div
    style={{
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      textAlign: 'center',
      fontSize: '0.5rem',
      lineHeight: 1,
      padding: 2,
    }}
  >
    <svg height="100%" width="100%" viewBox="-2 -5 17 21">
      <path
        d="M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0"
        fill="#fff"
        fillRule="evenodd"
      ></path>
    </svg>
  </div>
);

const Swicth: FC<Props & ReactSwitchProps> = ({ size, ...rest }) => {
  const { palette } = useTheme();

  const newProps: ReactSwitchProps = {
    onColor: palette.background.light,
    offColor: palette.background.light,
    onHandleColor: palette.accent.main,
    offHandleColor: palette.text.main,
    uncheckedIcon: false,
    checkedIcon: false,
    activeBoxShadow: '',
    checkedHandleIcon: checkedHandleIcon,
    ...switchSizes[size as Required<Props>['size']],
    ...rest,
  };

  return <ReactSwitch {...newProps} />;
};

Swicth.defaultProps = defaultProps;

export default Swicth;
