import Alert from '@/components/common/Alert';

const ValidationAlert = ({ children, ...rest }) => (
  <Alert type="danger" dense className="mt-2" {...rest}>
    {children}
  </Alert>
);

export default ValidationAlert;
