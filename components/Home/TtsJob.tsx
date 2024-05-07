import React from 'react';
import { Progress } from '@/components/ui/progress';
import TypographySmall from '../ui/TypographySmall';

type Props = {
  status: 'running' | 'success' | 'error' | 'cancelled';
};

const getStatusColor = (status: any) => {
  const colorMap = {
    running: 'bg-amber-500',
    success: 'bg-sky-500',
    error: 'bg-rose-500',
    cancelled: 'bg-stone-500',
  } as any;

  return colorMap[status];
};

const TtsJob: React.FC<Props> = ({ status }) => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="h-2 w-2 rounded-full bg-sky-500" />
        <div className="flex gap-2 items-center">
          <TypographySmall>Converting</TypographySmall>
          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
          <TypographySmall className="text-muted-foreground">
            1 minutes ago
          </TypographySmall>
          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
          <TypographySmall className="underline">Male pop</TypographySmall>
        </div>
      </div>
      {status === 'running' && (
        <Progress value={100} className="w-full animate-pulse" />
      )}
      {status === 'success' && (
        <Progress value={100} className="w-full animate-pulse" />
      )}
    </div>
  );
};

export default TtsJob;
