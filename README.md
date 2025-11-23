# Well-V - フィットネス・ウェルネスアプリ

推しのボイスと一緒に心と体をリフレッシュするフィットネス・ウェルネスアプリです。

## 🎯 最新の更新内容

### UI/UX改善
- 検索バーをシンプルなデザインに変更（リアルタイム検索対応）
- コミュニティページのトレーナー表示を横長カード形式に変更
- オンボーディングのタグ選択からチェックマーク削除
- 最初のページを言語設定に変更

### 技術的改善
- Supabase依存関係を削除してパフォーマンス向上
- Turbopackを無効化して動作を軽量化
- チュートリアルシステムを簡易版に変更
- プロジェクト構造をシンプル化

## 🚀 技術スタック

### フロントエンド
- **Next.js 14** - React フレームワーク（App Router使用）
- **TypeScript** - 型安全性
- **Tailwind CSS** - スタイリング
- **shadcn/ui** - UIコンポーネントライブラリ
- **Lucide React** - アイコンライブラリ
- **Embla Carousel** - カルーセル機能

### バックエンド・データベース
- **Firebase** - バックエンドサービス
  - Firestore - NoSQLデータベース
  - Authentication - ユーザー認証
  - Storage - ファイルストレージ
- **Vercel** - デプロイメント

### 開発ツール
- **ESLint** - コード品質
- **PostCSS** - CSS処理
- **React Hook Form** - フォーム管理
- **Zod** - スキーマバリデーション

## 📦 必要な依存関係

### 主要パッケージ
```json
{
  "next": "^14.0.0",
  "react": "^18.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.0.0",
  "firebase": "^10.0.0",
  "@hookform/resolvers": "^3.0.0",
  "react-hook-form": "^7.0.0",
  "zod": "^3.0.0",
  "lucide-react": "^0.400.0",
  "embla-carousel-react": "^8.0.0",
  "embla-carousel-autoplay": "^8.0.0"
}
```

### shadcn/ui コンポーネント
以下のコンポーネントがインストール済み：
- Button, Card, Input, Label, Form
- Dialog, Sheet, Tabs, Carousel
- Avatar, Badge, Progress, Slider
- Toast, Alert, Skeleton
- Select, Checkbox, Switch
- その他多数

## 🛠️ セットアップ手順

### 1. 環境要件
- **Node.js**: 18.0.0 以上
- **npm**: 9.0.0 以上
- **Git**: 最新版

### 2. プロジェクトクローン
```bash
git clone https://github.com/Yu220284/Well-V.git
cd Well-V
```

### 3. 依存関係インストール
```bash
npm install
```

### 4. 環境変数設定
`.env.local` ファイルを作成し、Firebase設定を追加：
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. 開発サーバー起動
```bash
npm run dev
```

⚠️ **開発時の注意点**
- 初回起動時は `.next` フォルダの生成に時間がかかる場合があります
- ポート3000が使用中の場合は自動的に別のポートが割り当てられます
- ホットリロードが効かない場合はサーバーを再起動してください
- LocalStorageを使用しているため、ブラウザのシークレットモードでは一部機能が制限されます

## 📁 プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # ホーム画面
│   ├── language-select/   # 言語選択
│   ├── onboarding/        # オンボーディングフロー
│   │   ├── tags/         # タグ選択
│   │   ├── follow/       # トレーナーフォロー
│   │   ├── download/     # アプリダウンロード
│   │   ├── tutorial/     # チュートリアル開始
│   │   └── tutorial-session/ # チュートリアルセッション
│   ├── sessions/          # セッション一覧
│   ├── trainers/          # トレーナー一覧
│   ├── community/         # グループ機能
│   ├── menu/              # メニュー画面
│   ├── settings/          # 詳細設定
│   └── session/[slug]/    # セッション詳細
├── components/            # Reactコンポーネント
│   ├── ui/               # shadcn/ui コンポーネント
│   ├── layout/           # レイアウトコンポーネント
│   ├── home/             # ホーム画面コンポーネント
│   ├── session/          # セッション関連コンポーネント
│   ├── onboarding/       # オンボーディングコンポーネント
│   └── tutorial/         # チュートリアルオーバーレイ
├── lib/                  # ユーティリティ
│   ├── data.ts          # モックデータ
│   ├── types.ts         # TypeScript型定義
│   ├── utils.ts         # ヘルパー関数
│   ├── hooks/           # カスタムフック
│   │   ├── use-local-auth.ts  # ローカル認証
│   │   ├── use-language.ts    # 言語管理
│   │   └── use-tutorial.ts    # チュートリアル管理
│   └── i18n/            # 国際化
│       ├── context.tsx  # 言語コンテキスト
│       └── language-pack.ts # 言語パック
├── firebase/            # Firebase設定
├── ai/                  # AI機能（セッション作成）
└── public/
    └── messages/        # 翻訳ファイル（ja/en/zh）
```

## 🎯 主要機能

### 1. ホームダッシュボード
- 週間アクティビティカレンダー（月曜始まり）
- グレイトウィーク/パーフェクトウィーク評価
- ダイヤモンド報酬システム
- 連続記録追跡

### 2. セッション機能
- ワークアウト、ヨガ、ストレッチカテゴリ
- 音声ガイド付きセッション
- プログレス追跡
- お気に入り機能

### 3. コミュニティ機能
- トレーナー別グループ
- 投稿・リアクション機能
- アクティビティ共有

### 4. オンボーディング・チュートリアル
- 言語選択（日本語、英語、中国語）
- タグ選択（興味のあるカテゴリ）
- トレーナーフォロー
- アプリダウンロード案内
- インタラクティブチュートリアル

### 5. 多言語対応
- next-intl による国際化
- 日本語、英語、中国語サポート
- 設定画面から言語切り替え可能

### 6. UI/UX
- レスポンシブデザイン
- ダークモード対応
- 回転広告バナー（600x120）
- ボトムナビゲーション

## 🔧 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm start

# リンター実行
npm run lint

# 型チェック
npm run type-check
```

## 🌐 デプロイ

### Vercel（推奨）
1. Vercelアカウントでリポジトリを接続
2. 環境変数を設定
3. 自動デプロイ

### Firebase Hosting
```bash
npm run build
firebase deploy
```

## 📱 対応ブラウザ

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- モバイルブラウザ（iOS Safari, Chrome Mobile）

## 🤝 コントリビューション

1. フォークしてブランチ作成
2. 機能実装・バグ修正
3. テスト実行
4. プルリクエスト作成

## 📄 ライセンス

MIT License

## 📞 サポート

問題や質問がある場合は、GitHubのIssuesを作成してください。
