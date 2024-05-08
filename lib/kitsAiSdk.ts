export const getKitsAIAuthHeader = () => {
  const apiKey = process.env.KITS_AI_API_KEY;

  if (!apiKey) {
    throw new Error('Invalid KITS_AI_API_KEY value');
  }

  return { Authorization: `Bearer ${apiKey}` };
};
