
'use server';

/**
 * @fileOverview An AI agent for generating safety prompts.
 *
 * - generateSafetyPrompt - A function that generates a safety disclaimer.
 * - GenerateSafetyPromptInput - The input type for the generateSafetyPrompt function.
 * - GenerateSafetyPromptOutput - The return type for the generateSafetyPrmpt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import type { GenerateSafetyPromptInput, GenerateSafetyPromptOutput } from '@/lib/types';
import { GenerateSafetyPromptInputSchema, GenerateSafetyPromptOutputSchema } from '@/lib/types';


export async function generateSafetyPrompt(input: GenerateSafetyPromptInput): Promise<GenerateSafetyPromptOutput> {
  return generateSafetyPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSafetyPromptPrompt',
  input: {schema: GenerateSafetyPromptInputSchema},
  output: {schema: GenerateSafetyPromptOutputSchema},
  prompt: `あなたはセッションの種類に応じて、セッション前の注意事項を生成するAIアシスタントです。

  セッションの種類に合わせて、注意事項のバリエーションを生成してください。

  セッションの種類: {{{sessionType}}}

  基本的な注意事項はこちらです:
  - セッションを始める前に、周囲の安全を確かめてください。
  - 水分補給を忘れずに、ご自身の体の声に耳を傾けましょう。
  - 痛みや不快感があった場合はすぐに中止してください。

  生成するプロンプトは、セッションの種類に関連する重要な安全上の注意点を簡潔にまとめた箇条書きにしてください。
  箇条書きは3項目までとします。
  トーンは、励ますような、穏やかで思いやりのあるものにしてください。
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
