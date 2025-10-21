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
