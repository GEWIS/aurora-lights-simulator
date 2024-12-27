import { Button, ButtonProps, Spinner } from 'react-bootstrap';

interface Props extends ButtonProps {
  loading?: boolean;
}

export default function LoadingButton({ loading, children, ...rest }: Props) {
  if (loading) {
    return (
      <Button {...rest} disabled>
        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
      </Button>
    );
  }

  return <Button {...rest}>{children}</Button>;
}
