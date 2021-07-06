import Alert, { Props as AlertProps } from '@/components/common/Alert';
import { FC } from 'react';

const ValidationAlert: FC<AlertProps> = (props) => (
  <Alert type="danger" dense className="mt-2" {...props} />
);

export default ValidationAlert;
