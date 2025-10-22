import { z } from 'zod';

export type SessionCategory = 'workout' | 'yoga' | 'meditation';

export interface Session {
  id: string;
  title: string;
  category: SessionCategory;
  duration: number; // in seconds
  audioUrl: string;
  imageUrl: string;
  imageHint: string;
}

export interface Category {
  id: SessionCategory;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
}

export interface LoggedSession {
  sessionId: string;
  completedAt: string; // ISO string
}

export const CreateSessionInputSchema = z.object({
  title: z.string().min(2, { message: 'セッション名は2文字以上で入力してください。'}),
  category: z.enum(['workout', 'yoga', 'meditation'], { required_error: 'カテゴリーを選択してください。'}),
  audioDataUri: z
    .string()
    .describe(
      "A recording of the session audio, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type CreateSessionInput = z.infer<typeof CreateSessionInputSchema>;

export const CreateSessionOutputSchema = z.object({
  approved: z.boolean().describe('Whether the session was automatically approved.'),
  transcription: z.string().describe('The transcribed text from the audio.'),
});
export type CreateSessionOutput = z.infer<typeof CreateSessionOutputSchema>;

export interface SubmittedSession {
    id: string;
    title: string;
    category: SessionCategory;
    submittedAt: string; // ISO string
    status: 'pending' | 'processing' | 'completed' | 'failed';
    transcription?: string;
    approved?: boolean;
}
