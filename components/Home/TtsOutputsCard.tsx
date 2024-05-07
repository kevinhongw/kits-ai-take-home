'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import TtsJob from './TtsJob';
import { Separator } from '../ui/separator';

type Props = {};

const TtsOutputsCard = ({}: Props) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Output</CardTitle>
        <CardDescription>
          This section will show your last 5 conversions.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-col-8 p-0">
        <Separator />
        <TtsJob />
      </CardContent>
    </Card>
  );
};

export default TtsOutputsCard;
