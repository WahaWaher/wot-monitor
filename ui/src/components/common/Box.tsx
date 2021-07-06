import { FC } from 'react';

type Props = {
  className?: string;
};

const Box: FC<Props> = (props) => <div {...props} />;

export default Box;
