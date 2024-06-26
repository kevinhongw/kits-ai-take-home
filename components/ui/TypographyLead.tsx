import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const TypographyLead: React.FC<Props> = ({ children, className }) => {
  return (
    <span className={cn('text-xl text-muted-foreground', className)}>
      {children}
    </span>
  );
};

export default TypographyLead;
