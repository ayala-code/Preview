import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

// The googleAI() plugin will automatically use service account credentials
// if the GOOGLE_APPLICATION_CREDENTIALS environment variable is set.
// Otherwise, it will attempt to use an API key if GEMINI_API_KEY is set.
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.0-flash',
});
