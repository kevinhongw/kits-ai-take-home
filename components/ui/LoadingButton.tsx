import React from 'react';
import { Button, ButtonProps } from './button';
import { Loader2 } from 'lucide-react';
interface Props extends ButtonProps {
  loading: boolean;
}

const LoadingButton: React.FC<Props> = ({
  loading,
  disabled,
  children,
  ...props
}) => {
  return (
    <Button {...props} disabled={disabled}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default LoadingButton;
