import { FC } from 'react';

type Props = {
  width?: string | number;
  height?: string | number;
};

const IconClose: FC<Props> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
    <path d="M4 10v1h8v-1z" />
  </svg>
);

export default IconClose;
