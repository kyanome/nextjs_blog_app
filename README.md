## 概要

Nextjs を用いたブログアプリ

## セットアップ手順

1. 依存関係のインストール

```bash
npm install
npm i lucide-react --force
```

2. 環境設定
   プロジェクトディレクトリに `.env` ファイルを作成し、以下の内容を設定してください：

```
DATABASE_URL="file:./dev.db"
```

3. データベースのセットアップ

```bash
npx prisma migrate dev --name init
```

4. アプリケーションの起動

```bash
npm run dev
```

## 使い方

1. 管理画面にアクセス

```
http://localhost:3000/admin
```

2. まずはカテゴリを作成してください

   - カテゴリ一覧ページからカテゴリを作成できます
   - 必要に応じてカテゴリの編集・削除が可能です

3. その後、記事を作成してください

   - 記事一覧ページから記事を作成できます
   - 記事作成時、画像 URL は `/coffee.jpg` を設定してください
   - タイトル、内容、カテゴリの設定が可能です

4. 最後に、作成したコンテンツを確認してください

```
http://localhost:3000
```
