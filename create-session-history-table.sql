-- Supabase SQL Editor で実行するテーブル作成SQL

CREATE TABLE session_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  duration_seconds INTEGER NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- インデックス作成
CREATE INDEX idx_session_history_user_id ON session_history(user_id);
CREATE INDEX idx_session_history_completed_at ON session_history(completed_at);

-- RLS (Row Level Security) 有効化
ALTER TABLE session_history ENABLE ROW LEVEL SECURITY;

-- ユーザーは自分のセッション履歴のみアクセス可能
CREATE POLICY "Users can view own session history" ON session_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own session history" ON session_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);