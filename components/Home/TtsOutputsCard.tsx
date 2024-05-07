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

      <CardContent className="flex flex-col gap-8"></CardContent>
    </Card>
  );
};

export default TtsOutputsCard;
