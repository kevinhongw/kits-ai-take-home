import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const TypographyLead: React.FC<Props> = ({ children, className }) => {
  return (
    <h4 className={cn('text-xl text-muted-foreground', className)}>
      {children}
    </h4>
  );
};

export default TypographyLead;
