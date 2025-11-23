# チュートリアル実装ガイド

## ⚠️ 重要な実装ルール

### ハイライト処理の優先順位
チュートリアル開始時は、**背景暗転より先にハイライト対象を描画すること**。
対象要素が未描画の場合は待機し、描画完了後にハイライトを適用する。

### Z-index レイヤー構造
```
z-[9998]  : 背景暗転レイヤー（bg-black/50）
z-[9999]  : ハイライトレイヤー（box-shadow）
z-[10000] : メッセージカード・ボタン
```

## 📝 data-tutorial 属性の追加方法

各UIコンポーネントに `data-tutorial` 属性を追加してください：

```tsx
// トレーナーリスト
<div data-tutorial="trainer-list">...</div>

// トレーナーカード
<div data-tutorial="trainer-card">...</div>

// セッションリスト
<div data-tutorial="session-list">...</div>

// セッションカード
<div data-tutorial="session-card">...</div>

// プレイヤーコントロール
<button data-tutorial="play-button">...</button>
<div data-tutorial="volume">...</div>
<button data-tutorial="rewind">...</button>
<button data-tutorial="forward">...</button>
<button data-tutorial="favorite">...</button>
<div data-tutorial="progress">...</div>

// コミュニティ
<button data-tutorial="post">...</button>
<button data-tutorial="share">...</button>
```

## 🔄 チュートリアルフロー

1. `/onboarding/tutorial` - チュートリアル開始確認
2. localStorage に `wellv_tutorial_active: true` を設定
3. `/` にリダイレクト
4. `TutorialOverlay` が自動表示
5. 各ステップで対象要素をハイライト
6. 全ステップ完了後、`onboardingCompleted: true` を設定

## 🎯 ハイライト動作仕様

- 対象要素が存在しない場合は100msごとにチェック
- 要素が見つかったら即座にハイライト適用
- ハイライトは `box-shadow` で実装（白枠 + 外側暗転）
- 対象要素の周囲に8pxのマージンを確保

## 🐛 トラブルシューティング

### チュートリアルが開始しない
- localStorage の `wellv_tutorial_active` を確認
- ブラウザのシークレットモードでは LocalStorage が制限される

### ハイライトが表示されない
- 対象要素に `data-tutorial` 属性が設定されているか確認
- 要素が画面に描画されているか確認（display: none ではないか）

### 灰色のまま進行してしまう
- `TutorialOverlay.tsx` の useEffect が正しく動作しているか確認
- 対象要素のセレクタが正しいか確認
