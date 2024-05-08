import React from 'react';
import { Progress } from '@/components/ui/progress';
import TypographySmall from '../ui/TypographySmall';
import { InferenceJob, InferenceJobStatus } from '@/types';
import { cn } from '@/lib/utils';
import moment from 'moment';
import AudioPlayer from './AudioPlayer';
import { Button } from '../ui/button';
import { Download } from 'lucide-react';

type Props = {
  job: InferenceJob;
};

const statusColorMap: Record<InferenceJobStatus, string> = {
  running: 'bg-amber-500',
  success: 'bg-sky-500',
  error: 'bg-rose-500',
  cancelled: 'bg-stone-500',
};
const statusLabeleMap: Record<InferenceJobStatus, string> = {
  running: 'Converting',
  success: 'Ready',
  error: 'Error',
  cancelled: 'Cancelled',
};

const TtsJob: React.FC<Props> = ({ job }) => {
  const { status, createdAt, model } = job;

  const statusColor = statusColorMap[status];
  const statusLabel = statusLabeleMap[status];

  const relativeCreatedTime = moment(
    new Date(createdAt).toLocaleString('en-US', { timeZone: 'PST' }),
  ).fromNow();

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className={cn('h-2 w-2 rounded-full', statusColor)} />
        <div className="flex gap-2 items-center">
          <TypographySmall>{statusLabel}</TypographySmall>
          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
          <TypographySmall className="text-muted-foreground">
            {relativeCreatedTime}
          </TypographySmall>
          <span className="h-1 w-1 rounded-full bg-muted-foreground" />
          <TypographySmall className="underline">
            {model?.title || 'n/a'}
          </TypographySmall>
        </div>
      </div>
      {status === 'running' && (
        <Progress value={100} className="w-full animate-pulse duration-1000	" />
      )}
      {status === 'success' && (
        <div className="flex items-center gap-3">
          <AudioPlayer audioUrl={job.outputFileUrl} />
          <Progress value={100} className="w-full" />
          <a
            href={job.outputFileUrl || ''}
            download={`kitai_tts_${job.id}`}
            target="_blank"
          >
            <Button variant="outline" size="icon">
              <Download />
            </Button>
          </a>
        </div>
      )}
      {['error', 'cancelled'].includes(status) && (
        <Progress value={0} className="w-full" />
      )}
    </div>
  );
};

export default TtsJob;
