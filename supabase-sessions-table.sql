-- Supabase SQL Editor で実行してください

CREATE TABLE IF NOT EXISTS public.sessions (
  id BIGSERIAL PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  duration INTEGER NOT NULL,
  segments JSONB,
  audio_url TEXT,
  video_url TEXT,
  has_video BOOLEAN DEFAULT false,
  image_url TEXT NOT NULL,
  image_hint TEXT,
  tags TEXT[],
  trainer_id INTEGER,
  is_premium BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security) を有効化
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- 全員が読み取り可能
CREATE POLICY "Anyone can read sessions"
  ON public.sessions
  FOR SELECT
  USING (true);

-- 認証済みユーザーが挿入可能
CREATE POLICY "Authenticated users can insert sessions"
  ON public.sessions
  FOR INSERT
  WITH CHECK (true);
