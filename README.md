# The Craft Lemon Sour<!-- omit in toc -->
![サイト画像]()

## 目次<!-- omit in toc -->
- [概要](#概要)
- [公開URL](#公開url)
- [目的](#目的)
- [こだわったポイント](#こだわったポイント)
- [使用技術](#使用技術)
- [使用フォント](#使用フォント)
- [各画面・機能紹介](#各画面機能紹介)
  - [背景レイヤー](#背景レイヤー)
  - [ヘッダー](#ヘッダー)
  - [FVセクション](#fvセクション)
  - [Conceptセクション](#conceptセクション)
  - [Processセクション](#processセクション)
  - [Lineupセクション](#lineupセクション)
  - [Messageセクション](#messageセクション)
  - [Shopセクション](#shopセクション)
  - [フッター](#フッター)
  - [トップへ戻るボタン](#トップへ戻るボタン)

## 概要
架空のクラフトレモンサワー「The Craft Lemon Sour」のプロモーションを目的としたランディングページ（LP）です。

Viteをビルドツールとして採用し、FLOCSSベースのSCSS設計や、各セクション（コンポーネント）ごとに分割したJavaScriptモジュールの運用など、実務を強く意識したモダンなフロントエンド開発環境で制作しました。

特にGSAP（GreenSock Animation Platform）をフル活用し、ユーザーのスクロールや操作に連動するリッチで魅力的なUI/UXを実現しています。

## 公開URL
[https://craft-lemon-sour.mikanbako.jp/](https://craft-lemon-sour.mikanbako.jp/)

## 目的
コーダーおよびフロントエンドエンジニアとしての、自身のコーディングスキルと高度な実装力を証明するためのポートフォリオ作品として制作しました。
単なる静的なWebページ制作にとどまらず、以下のような実践的なスキルのアピールを目的としています。

* **高度なアニメーション実装力：**
  GSAPの ScrollTrigger などを駆使した、パララックス（視差効果）、要素のピン留めによる横スクロール、シームレスなローディング演出などの複雑なアニメーション制御。

* **保守性・拡張性の高いコード設計：**
  FLOCSSの概念を取り入れたCSSアーキテクチャや、モジュール化されたJavaScriptによる、チーム開発を見据えた綺麗なコードベースの構築。

* **モダンな開発環境の活用：**
  Viteを用いたスムーズな開発体験と、本番環境を見据えた最適なビルドプロセス（最適化・デプロイ）の実践。

## こだわったポイント
* **見出し**

  テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト

* **見出し**

  テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト

* **見出し**

  テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト

* **見出し**

  テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト

* **見出し**

  テキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト

## 使用技術
**フロントエンド**
* GSAP
* JavaScript
* Sass (SCSS)
* HTML

**インフラ・その他**
* さくらVPS
* Apache (Webサーバー)
* Git / GitHub (バージョン管理)

## 使用フォント
* [Zen Maru Gothic](https://fonts.google.com/specimen/Zen+Maru+Gothic)
* [M PLUS Rounded 1c](https://fonts.google.com/specimen/M+PLUS+Rounded+1c)

## 各画面・機能紹介

本サイトの構成と、各セクションに実装している機能やこだわりポイントについて、実際の動き（webp動画）やスクリーンショットを交えながら紹介します。

### 背景レイヤー
![背景レイヤーの画像]()

>関連SCSSファイル: [_bg.scss](src/scss/object/component/_bg.scss)

### ヘッダー
![ヘッダーのwebp動画]()

>関連JSファイル: [header.js](src/js/modules/header.js)

>関連SCSSファイル: [_header.scss](src/scss/layout/_header.scss)

### FVセクション
![FVセクションのwebp動画]()

>関連JSファイル: [fv.js](src/js/modules/fv.js) / [main.js](src/js/main.js)

>関連SCSSファイル: [_fv.scss](src/scss/object/project/_fv.scss)

### Conceptセクション
![Conceptセクションのwebp動画]()

>関連JSファイル: [concept.js](src/js/modules/concept.js)

>関連SCSSファイル: [_concept.scss](src/scss/object/project/_concept.scss)

### Processセクション
![Processセクションのwebp動画]()

>関連JSファイル: [process.js](src/js/modules/process.js)

>関連SCSSファイル: [_process.scss](src/scss/object/project/_process.scss)

### Lineupセクション
![Lineupセクションのwebp動画]()

>関連JSファイル: [lineup.js](src/js/modules/lineup.js)

>関連SCSSファイル: [_lineup.scss](src/scss/object/project/_lineup.scss)

### Messageセクション
![Messageセクションのwebp動画]()

>関連JSファイル: [message.js](src/js/modules/message.js)

>関連SCSSファイル: [_message.scss](src/scss/object/project/_message.scss)

### Shopセクション
![Shopセクションのwebp動画]()

>関連JSファイル: [shop.js](src/js/modules/shop.js)

>関連SCSSファイル: [_shop.scss](src/scss/object/project/_shop.scss) / [_button.scss](src/scss/object/component/_button.scss)

### フッター
![フッターのwebp動画]()

>関連JSファイル: [footer.js](src/js/modules/footer.js)

>関連SCSSファイル: [_footer.scss](src/scss/layout/_footer.scss)

### トップへ戻るボタン
![トップへ戻るボタンのwebp動画]()

>関連JSファイル: [common.js](src/js/modules/common.js)

>関連SCSSファイル: [_pagetop.scss](src/scss/object/component/_pagetop.scss)
