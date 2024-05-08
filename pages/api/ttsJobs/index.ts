import { getKitsAIAuthHeader } from '@/lib/kitsAiSdk';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    console.log('[API] create TTS job request received');
    const data = req.body;

    const payload = JSON.parse(data);
    if (!data.inputTtsText || !data.voiceModelId) {
      res.status(400);
    }

    const formData = new FormData();

    formData.append('voiceModelId', payload.voiceModelId);
    formData.append('inputTtsText', payload.inputTtsText);

    try {
      const response = await fetch('https://arpeggi.io/api/kits/v1/tts', {
        method: 'POST',
        headers: getKitsAIAuthHeader(),
        body: formData,
      });

      if (!response.ok) {
        res.status(500).send('Error');
      }

      const ttsJob = await response.json();
      res.status(200).json(ttsJob);
    } catch (error: any) {
      console.error(error);
      res.status(500).json(error);
    }
  } else if (req.method === 'GET') {
    console.log('[API] List TTS job request received');

    try {
      const response = await fetch(
        'https://arpeggi.io/api/kits/v1/tts?page=1&perPage=5&order=desc',
        {
          headers: getKitsAIAuthHeader(),
        },
      );

      if (!response.ok) {
        res.status(500).send('Error calling Kits AI endpoint');
      }

      const ttsJobs = await response.json();
      res.status(200).json(ttsJobs);
    } catch (error: any) {
      console.error(error);
      res.status(500).json(error);
    }
  } else {
    res.status(500).json('Route not supported');
  }
}
