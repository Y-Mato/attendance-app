# 勤怠管理アプリ（attendance-app）

出勤・退勤・休憩の打刻ができる、モバイル風の勤怠管理アプリです。Next.js（App Router）と React の学習を兼ねて、1からUIとロジックを実装しました。

## スクリーンショット


[screenshot](./public/screenshot.png)


## 主な機能

- 出勤 / 退勤 / 休憩開始 / 休憩終了 の打刻（タップした瞬間の時刻を記録）
- 未出勤時は退勤・休憩ボタンを押せないなど、状態に応じたボタンの活性/非活性制御
- 現在時刻のリアルタイム表示（1秒ごとに更新）
- 実績時間・休憩時間・残業時間の自動計算
- Tailwind CSSによるモバイルアプリ風のUI

## 使用技術

- [Next.js](https://nextjs.org/) 16 (App Router / Turbopack)
- [React](https://react.dev/) 19
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v4

## セットアップ

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開いてください。

## 今後の課題

現時点で分かっている改善点は [Issues](https://github.com/Y-Mato/attendance-app/issues) で管理しています。

- 実績時間・休憩時間・残業時間の表示フォーマット（HH:MM形式）への対応
- 残業時間がマイナス値になる場合の表示修正
- 日付のリアルタイム化（現在は固定値）
- ページタイトル・メタデータの調整
