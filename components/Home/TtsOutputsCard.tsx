'use client';

import React, { useEffect } from 'react';
import { InferenceJob } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { usePolling } from '@/hooks/usePolling';
import TtsJob from './TtsJob';

// TODO: reallocate all api call to same folder
const fetchTtsJobs = async () => {
  const response = await fetch('/api/ttsJobs');
  const { data } = await response.json();

  return data;
};

const TtsOutputsCard = () => {
  const { data: ttsJobs, setRun } = usePolling<InferenceJob[]>({
    pollFn: fetchTtsJobs,
    delay: 3000,
  });

  // stop pollling when all jobs are done
  useEffect(() => {
    const runningJobs = (ttsJobs || []).some((job) => job.status === 'running');

    setRun(!!runningJobs);
  }, [ttsJobs, setRun]);

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
