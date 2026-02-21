# お問い合わせメール設定ガイド

## 現在の設定

**メール送信先**: 
- `CONTACT_EMAIL=support@well-v.com` (`.env.local`)
- フォールバック: `iwase.220284@gmail.com`

**現在の状態**: 
- Resend APIキーが未設定のため、メールは送信されず、コンソールログのみ出力

## メール送信を有効化する手順

### 1. Resendアカウント作成
1. https://resend.com にアクセス
2. アカウント作成（無料プランで月100通まで送信可能）
3. ドメイン認証（オプション）

### 2. APIキー取得
1. Resendダッシュボード → API Keys
2. 新しいAPIキーを作成
3. キーをコピー（`re_` で始まる文字列）

### 3. 環境変数設定

#### ローカル環境
`.env.local` に追加：
```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxx
CONTACT_EMAIL=iwase.220284@gmail.com
```

#### Vercel本番環境
1. Vercelダッシュボード → プロジェクト選択
2. Settings → Environment Variables
3. 以下を追加：
   - `RESEND_API_KEY`: `re_xxxxxxxxxxxxxxxxxx`
   - `CONTACT_EMAIL`: `iwase.220284@gmail.com`

### 4. メール送信の仕組み

お問い合わせフォーム送信時：
1. **管理者宛メール**: `CONTACT_EMAIL` に通知
2. **ユーザー宛自動返信**: 送信者のメールアドレスに確認メール

### 5. テスト

1. https://well-v.vercel.app/contact にアクセス
2. フォームに入力して送信
3. 管理者メール（`iwase.220284@gmail.com`）を確認

## 代替案：Resendを使わない場合

Resendの代わりに他のメールサービスを使用する場合：
- SendGrid
- AWS SES
- Mailgun
- Postmark

コードを修正して対応するAPIを使用してください。

## 現在の動作

APIキー未設定の場合、以下のログがサーバーコンソールに出力されます：
```
=== メール送信（開発モード）===
管理者宛: iwase.220284@gmail.com
件名: [Well-V] お問い合わせ件名
差出人: ユーザー名 <user@example.com>
内容: お問い合わせ内容
```
