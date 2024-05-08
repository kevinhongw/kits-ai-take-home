import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import TtsCreatJobCard from '@/components/Home/TtsCreatJobCard';
import TtsOutputsCard from '@/components/Home/TtsOutputsCard';
import TypographyH1 from '@/components/ui/TypographyH1';
import TypographyLead from '@/components/ui/TypographyLead';
import { getKitsAIAuthHeader } from '@/lib/kitsAiSdk';
import { VoiceModel, KitsAiPaginateResponse } from '@/types';

export default function Home({
  voiceModels,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container my-8 mx-auto">
      <div className="flex flex-col items-center gap-8">
        <TypographyH1 className="text-center">
          Kits AI Text-to-speech
        </TypographyH1>
        <TypographyLead className="max-w-2xl text-center">
          Play with unique AI voice models, languages, and pitch without the
          need for voice actors, microphones, or recordings.
        </TypographyLead>
      </div>
      <div className="mt-8 flex gap-8 flex-wrap justify-center">
        <TtsCreatJobCard voiceModels={voiceModels} />
        <TtsOutputsCard />
      </div>
    </div>
  );
}

export const getServerSideProps = (async () => {
  const response = await fetch('https://arpeggi.io/api/kits/v1/voice-models', {
    headers: getKitsAIAuthHeader(),
  });
  const { data: voiceModels }: KitsAiPaginateResponse<VoiceModel> =
    await response.json();

  return { props: { voiceModels } };
}) satisfies GetServerSideProps<{
  voiceModels: VoiceModel[];
}>;
