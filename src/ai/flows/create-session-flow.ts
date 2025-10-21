'use server';

/**
 * @fileOverview A flow for creating and validating new audio sessions.
 * 
 * - createSession - Transcribes audio, checks for inappropriate content, and returns a session object.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import wav from 'wav';
import type { CreateSessionInput, CreateSessionOutput } from '@/lib/types';
import { CreateSessionInputSchema, CreateSessionOutputSchema } from '@/lib/types';


export async function createSession(input: CreateSessionInput): Promise<CreateSessionOutput> {
  return createSessionFlow(input);
}

// Helper to convert audio to WAV format for the speech-to-text model
async function toWav(
    audioBuffer: Buffer,
    channels = 1,
    rate = 16000,
    sampleWidth = 2
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const writer = new wav.Writer({
        channels,
        sampleRate: rate,
        bitDepth: sampleWidth * 8,
      });
  
      let bufs: any[] = [];
      writer.on('error', reject);
      writer.on('data', function (d) {
        bufs.push(d);
      });
      writer.on('end', function () {
        resolve(Buffer.concat(bufs).toString('base64'));
      });
  
      writer.write(audioBuffer);
      writer.end();
    });
}


const createSessionFlow = ai.defineFlow(
  {
    name: 'createSessionFlow',
    inputSchema: CreateSessionInputSchema,
    outputSchema: CreateSessionOutputSchema,
  },
  async (input) => {
    const audioBuffer = Buffer.from(
        input.audioDataUri.substring(input.audioDataUri.indexOf(',') + 1),
        'base64'
    );
    const wavAudioBase64 = await toWav(audioBuffer);
    const wavDataUri = `data:audio/wav;base64,${wavAudioBase64}`;

    // 1. Transcribe the audio
    const { text: transcription } = await ai.generate({
        model: 'googleai/gemini-2.5-flash',
        prompt: [{ media: { url: wavDataUri } }, { text: '音声データを文字起こししてください。' }],
    });

    if (!transcription) {
        throw new Error('Audio transcription failed.');
    }
    
    // 2. Check for inappropriate content
    const { output: contentCheck } = await ai.generate({
        model: 'googleai/gemini-2.5-flash',
        prompt: `あなたは、ユーザーが投稿したコンテンツをレビューするモデレーターです。以下のテキストに、不適切な内容（暴力的、性的、差別的、その他公序良俗に反するもの）が含まれているか確認してください。

        テキスト：
        "${transcription}"

        問題がなければ "true"、問題がある可能性がある場合は "false" とだけ回答してください。`,
        output: {
            schema: z.object({
                isAppropriate: z.boolean(),
            })
        },
        config: {
            temperature: 0.1
        }
    });

    if(!contentCheck) {
        throw new Error('Content check failed.');
    }

    return {
        approved: contentCheck.isAppropriate,
        transcription: transcription,
    };
  }
);
