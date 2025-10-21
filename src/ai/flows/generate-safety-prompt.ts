'use server';

/**
 * @fileOverview An AI agent for generating safety prompts.
 *
 * - generateSafetyPrompt - A function that generates a safety disclaimer.
 * - GenerateSafetyPromptInput - The input type for the generateSafetyPrompt function.
 * - GenerateSafetyPromptOutput - The return type for the generateSafetyPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSafetyPromptInputSchema = z.object({
  sessionType: z.string().describe('The type of session (workout, yoga, meditation).'),
});
export type GenerateSafetyPromptInput = z.infer<typeof GenerateSafetyPromptInputSchema>;

const GenerateSafetyPromptOutputSchema = z.object({
  safetyPrompt: z.string().describe('A variation of the safety disclaimer.'),
});
export type GenerateSafetyPromptOutput = z.infer<typeof GenerateSafetyPromptOutputSchema>;

export async function generateSafetyPrompt(input: GenerateSafetyPromptInput): Promise<GenerateSafetyPromptOutput> {
  return generateSafetyPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSafetyPromptPrompt',
  input: {schema: GenerateSafetyPromptInputSchema},
  output: {schema: GenerateSafetyPromptOutputSchema},
  prompt: `You are an AI assistant that generates safety prompts for different types of sessions.

  Generate a variation of the safety disclaimer based on the session type.

  Session Type: {{{sessionType}}}

  Here is the general safety disclaimer:
  "Before starting, ensure you are in a safe environment. Stay hydrated and listen to your body. If you experience any pain or discomfort, stop immediately."

  Your generated prompt should be a concise reminder of key safety precautions relevant to the session type.
  The generated prompt should be no more than 3 sentences.
  The tone should be encouraging, calm and caring.
`,
});

const generateSafetyPromptFlow = ai.defineFlow(
  {
    name: 'generateSafetyPromptFlow',
    inputSchema: GenerateSafetyPromptInputSchema,
    outputSchema: GenerateSafetyPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
