import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const TypographySmall: React.FC<Props> = ({ children, className }) => {
  return (
    <span className={cn('text-sm font-medium leading-none', className)}>
      {children}
    </span>
  );
};

export default TypographySmall;
