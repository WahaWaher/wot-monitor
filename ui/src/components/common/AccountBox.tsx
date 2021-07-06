import { mdiAccountCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { FC, memo } from 'react';

type Props = {
  text?: string;
};

const AccountBox: FC<Props> = memo(({ text }) => (
  <span className="d-flex align-items-center">
    <Icon size={1.25} path={mdiAccountCircle} />{' '}
    <span className="ml-1">{text}</span>
  </span>
));

export default AccountBox;
