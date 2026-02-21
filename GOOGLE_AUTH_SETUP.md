# Google認証セットアップガイド

## 問題
Googleログイン時に「接続が拒否されました」エラーが発生

## 解決方法

### 1. Supabase設定

Supabaseダッシュボードで以下のURLを許可リストに追加：

1. https://supabase.com にアクセス
2. プロジェクト選択: `sllytnxtosotzwmbcuqu`
3. **Authentication** → **URL Configuration** に移動
4. 以下のURLを追加：

#### Site URL
```
http://localhost:9002
```

#### Redirect URLs
```
http://localhost:9002/auth/callback
https://well-v.vercel.app/auth/callback
https://well-jpq5py5py-yus-projects-fd204fc6.vercel.app/auth/callback
```

### 2. Google Cloud Console設定

1. https://console.cloud.google.com にアクセス
2. プロジェクト選択
3. **APIs & Services** → **Credentials**
4. OAuth 2.0 Client IDを選択
5. **Authorized redirect URIs** に以下を追加：

```
https://sllytnxtosotzwmbcuqu.supabase.co/auth/v1/callback
http://localhost:9002/auth/callback
https://well-v.vercel.app/auth/callback
```

### 3. 環境変数確認

`.env.local` に以下が設定されているか確認：

```env
NEXT_PUBLIC_SUPABASE_URL=https://sllytnxtosotzwmbcuqu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. テスト手順

1. 開発サーバー再起動
```bash
npm run dev
```

2. http://localhost:9002/auth/login にアクセス
3. Googleボタンをクリック
4. Google認証画面が表示されることを確認
5. 認証後、ホーム画面にリダイレクトされることを確認

## トラブルシューティング

### エラー: redirect_uri_mismatch
- Google Cloud ConsoleのAuthorized redirect URIsを確認
- Supabaseのコールバック URL形式: `https://[PROJECT_REF].supabase.co/auth/v1/callback`

### エラー: Invalid redirect URL
- SupabaseのRedirect URLsに正確なURLが登録されているか確認
- プロトコル（http/https）が一致しているか確認

### 接続が拒否される
- ブラウザのポップアップブロッカーを無効化
- シークレットモードで試す
- ブラウザのキャッシュをクリア

## 参考リンク

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Google OAuth Setup](https://supabase.com/docs/guides/auth/social-login/auth-google)
