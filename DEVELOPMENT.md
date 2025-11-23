# 開発者向けドキュメント

## 🔧 開発環境セットアップ詳細

### 必須ツール
```bash
# Node.js バージョン確認
node --version  # v18.0.0以上

# npm バージョン確認
npm --version   # v9.0.0以上

# Git バージョン確認
git --version   # 最新版推奨
```

### shadcn/ui セットアップ
プロジェクトには以下のshadcn/uiコンポーネントがインストール済み：

```bash
# 既にインストール済みのコンポーネント
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add form
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add sheet
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add carousel
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add progress
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add skeleton
npx shadcn-ui@latest add select
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add switch
```

### 追加コンポーネントのインストール
新しいshadcn/uiコンポーネントを追加する場合：
```bash
npx shadcn-ui@latest add [component-name]
```

## 📦 重要な依存関係詳細

### Core Dependencies
```json
{
  "next": "14.2.5",
  "react": "^18",
  "react-dom": "^18",
  "typescript": "^5"
}
```

### UI & Styling
```json
{
  "tailwindcss": "^3.4.1",
  "@tailwindcss/typography": "^0.5.13",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.3.0"
}
```

### Form & Validation
```json
{
  "react-hook-form": "^7.52.0",
  "@hookform/resolvers": "^3.6.0",
  "zod": "^3.23.8"
}
```

### Firebase
```json
{
  "firebase": "^10.12.2"
}
```

### Icons & UI Components
```json
{
  "lucide-react": "^0.400.0",
  "@radix-ui/react-*": "各種Radixコンポーネント"
}
```

### Carousel
```json
{
  "embla-carousel-react": "^8.1.5",
  "embla-carousel-autoplay": "^8.1.5"
}
```

## 🏗️ アーキテクチャ詳細

### ディレクトリ構造詳細
```
src/
├── app/                          # Next.js 14 App Router
│   ├── globals.css              # グローバルスタイル
│   ├── layout.tsx               # ルートレイアウト
│   ├── page.tsx                 # ホーム画面
│   ├── sessions/                # セッション一覧
│   │   └── page.tsx
│   ├── session/                 # 個別セッション
│   │   └── [slug]/
│   │       ├── page.tsx         # セッション詳細
│   │       └── result/
│   │           └── page.tsx     # セッション結果
│   ├── trainers/                # トレーナー一覧
│   │   └── page.tsx
│   ├── trainer/                 # 個別トレーナー
│   │   └── [trainerId]/
│   │       └── page.tsx
│   ├── community/               # コミュニティ
│   │   └── page.tsx
│   ├── menu/                    # メニュー（旧settings）
│   │   ├── page.tsx
│   │   ├── profile/
│   │   │   └── page.tsx
│   │   └── notifications/
│   │       └── page.tsx
│   ├── settings/                # 詳細設定
│   │   └── page.tsx
│   ├── favorites/               # お気に入り
│   │   └── page.tsx
│   ├── add-session/             # セッション追加
│   │   └── page.tsx
│   └── category/                # カテゴリ別セッション
│       └── [category]/
│           └── page.tsx
├── components/                   # Reactコンポーネント
│   ├── ui/                      # shadcn/ui コンポーネント
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ... (その他多数)
│   ├── layout/                  # レイアウトコンポーネント
│   │   ├── Header.tsx           # ヘッダー（設定・通知アイコン付き）
│   │   ├── BottomNav.tsx        # ボトムナビゲーション
│   │   └── AdBanner.tsx         # 広告バナー（600x120）
│   ├── home/                    # ホーム画面専用
│   │   ├── CategoryCard.tsx     # カテゴリカード
│   │   ├── ProgressTracker.tsx  # 進捗トラッカー
│   │   └── FirstLaunchModal.tsx # 初回起動モーダル
│   ├── session/                 # セッション関連
│   │   ├── Player.tsx           # セッションプレイヤー
│   │   └── SafetyPromptDialog.tsx # 安全確認ダイアログ
│   └── settings/                # 設定関連
│       └── SubmittedSessions.tsx # 送信済みセッション
├── lib/                         # ユーティリティ・設定
│   ├── utils.ts                 # cn()関数など
│   ├── data.ts                  # モックデータ
│   ├── types.ts                 # TypeScript型定義
│   └── hooks/                   # カスタムフック
│       ├── use-session-store.ts # セッション状態管理
│       ├── use-submission-store.ts # 送信状態管理
│       └── use-toast.ts         # トースト通知
├── firebase/                    # Firebase設定
│   ├── config.ts               # Firebase初期化
│   └── index.ts                # Firebase関数エクスポート
├── ai/                         # AI機能
│   └── flows/
│       └── create-session-flow.ts # セッション作成AI
└── hooks/                      # グローバルフック
    └── use-toast.ts
```

### 状態管理
- **Zustand**: 軽量な状態管理（セッション履歴、お気に入り）
- **React Hook Form**: フォーム状態管理
- **Local Storage**: 永続化データ

### スタイリング規則
- **Tailwind CSS**: ユーティリティファースト
- **CSS Variables**: ダークモード対応
- **Responsive Design**: モバイルファースト

## 🔥 Firebase設定

### 必要なFirebaseサービス
1. **Authentication** - ユーザー認証
2. **Firestore** - データベース
3. **Storage** - ファイルストレージ
4. **Hosting** - ウェブホスティング（オプション）

### Firestore コレクション構造
```
users/
├── {userId}/
│   ├── profile: UserProfile
│   ├── sessions: SessionHistory[]
│   ├── favorites: string[]
│   └── settings: UserSettings

sessions/
├── {sessionId}/
│   ├── title: string
│   ├── category: string
│   ├── duration: number
│   ├── audioUrl: string
│   └── imageUrl: string

trainers/
├── {trainerId}/
│   ├── name: string
│   ├── specialty: string
│   ├── imageUrl: string
│   └── groupId: string
```

## 🎨 デザインシステム

### カラーパレット
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;
  --secondary-foreground: 222.2 84% 4.9%;
  --muted: 210 40% 96%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96%;
  --accent-foreground: 222.2 84% 4.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}
```

### タイポグラフィ
- **見出し**: `font-headline` (カスタムフォント)
- **本文**: システムフォント
- **コード**: `font-mono`

## 🧪 テスト

### テスト環境セットアップ
```bash
# Jest & Testing Library (将来追加予定)
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

### テスト戦略
1. **Unit Tests**: コンポーネント単体テスト
2. **Integration Tests**: ページ統合テスト
3. **E2E Tests**: Playwright/Cypress

## 🚀 パフォーマンス最適化

### 画像最適化
- Next.js Image コンポーネント使用
- WebP形式対応
- 遅延読み込み

### バンドル最適化
- Tree shaking
- Code splitting
- Dynamic imports

### SEO対策
- メタタグ設定
- 構造化データ
- サイトマップ

## 🔒 セキュリティ

### Firebase Security Rules
```javascript
// Firestore Rules例
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 環境変数管理
- `.env.local` - ローカル開発
- `.env.production` - 本番環境
- Vercel環境変数 - デプロイ時

## 📱 PWA対応（将来予定）

### Service Worker
- オフライン対応
- キャッシュ戦略
- プッシュ通知

### Manifest
- アプリアイコン
- スプラッシュスクリーン
- インストール可能

## 🐛 デバッグ・トラブルシューティング

### よくある問題
1. **Firebase接続エラー**: 環境変数確認
2. **ビルドエラー**: 型定義確認
3. **スタイル適用されない**: Tailwind設定確認

### デバッグツール
- React Developer Tools
- Firebase Emulator Suite
- Next.js DevTools

## 📈 監視・分析

### 分析ツール
- Google Analytics
- Firebase Analytics
- Vercel Analytics

### エラー監視
- Sentry（将来追加予定）
- Firebase Crashlytics

## 🔄 CI/CD

### GitHub Actions（将来設定予定）
```yaml
name: CI/CD
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run build
```

### デプロイメント
- **Vercel**: 自動デプロイ
- **Firebase Hosting**: 手動デプロイ

## 📚 参考資料

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)