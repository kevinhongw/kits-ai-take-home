import TtsCreatJobCard from '@/components/Home/TtsCreatJobCard';
import TypographyH1 from '@/components/ui/TypographyH1';
import TypographyLead from '@/components/ui/TypographyLead';
import * as React from 'react';

export default function Home() {
  return (
    <div className="container my-8 mx-auto">
      <div className="flex flex-col items-center gap-8">
        <TypographyH1 className="text-center">
          Kits AI Text-to-speech
        </TypographyH1>
        <TypographyLead className="max-w-2xl text-center">
          Play with unique AI voice models, langugaes, and pitch without the
          need for voice actors, microphones, or recordings.
        </TypographyLead>
        <div>
          <TtsCreatJobCard />
        </div>
      </div>
    </div>
  );
}
