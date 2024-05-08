'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TtsJob from './TtsJob';
import { Separator } from '../ui/separator';
import { InferenceJob } from '@/types';
import { usePolling } from '@/hooks/usePolling';

// TODO: reallocate all api call to same folder
const fetchTtsJobs = async () => {
  const response = await fetch('/api/ttsJobs');
  const { data } = await response.json();

  return data;
};

const TtsOutputsCard = () => {
  const ttsJobs = usePolling<InferenceJob[]>({
    pollFn: fetchTtsJobs,
    delay: 3000,
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Output</CardTitle>
        <CardDescription>
          This section will show your last 5 conversions.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-col-8 p-0">
        {(ttsJobs || []).map((job) => (
          <React.Fragment key={job.id}>
            <Separator />
            <TtsJob job={job} />
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};

export default TtsOutputsCard;
