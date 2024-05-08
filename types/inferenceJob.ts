import { VoiceModel } from './voiceModel';

export type InferenceJobStatus = 'running' | 'success' | 'error' | 'cancelled';

export type InferenceJob = {
  id: number;
  createdAt: string;
  type: 'rvc' | 'uvr' | 'tts';
  status: InferenceJobStatus;
  jobStartTime: string;
  jobEndTime: string | null;
  outputFileUrl: string | null;
  lossyOutputFileUrl: string | null;
  recombinedAudioFileUrl: string | null;
  voiceModelId: string | null;
  model: VoiceModel | null;
};
