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
* **GSAPプラグインを駆使した、没入感のあるアニメーション実装**

  標準のGSAPに加え、ScrollTrigger、ScrollToPlugin、SplitTextといったプラグインを適材適所で活用しています。マウス連動パララックス（FVセクション）や、`containerAnimation` を用いた横スクロール（Lineupセクション）、PC環境限定のマグネティックボタン（Shopセクション）など、ユーザーの操作やスクロールに連動する、リッチで没入感のあるUXを追求しました。

* **GSAP matchMedia を用いた、デバイス最適化のアニメーション制御**

  レスポンシブ対応において、CSSによるレイアウト変更だけでなく、アニメーションの発火タイミングや順序もデバイスごとに最適化しています。GSAPの `matchMedia` を利用し、PC（横並びレイアウト）ではタイムラインによる連動したアニメーションを、SP（縦積みレイアウト）では個別のScrollTriggerによるアニメーションを出し分けるなど、どのデバイスでも違和感のない自然な動きを実現しました。

* **FLOCSSアーキテクチャに基づく、保守性の高いCSS設計**

  CSSの設計にはFLOCSSを採用し、レイアウト、プロジェクト、コンポーネントごとにSass (SCSS) ファイルを細かく分割して管理しています。特に `z-index` の管理においては、ヘッダーやハンバーガーメニューなどのグローバルに競合する値は [`_variables.scss`](src/scss/global/_variables.scss) で一元管理し、セクション内でのみ完結する重なり順は各SCSSファイル内に直接記述するルールを設けることで、破綻しにくく保守性の高いスタイル管理を実践しました。

* **機能ごとのJavaScriptモジュール化と、JSDocによるドキュメント化**

  [`main.js`](src/js/main.js) に全ての処理を記述するのではなく、ヘッダー機能や各セクションのアニメーションなど、機能単位でJavaScriptをモジュール化して分割しています。さらに、エクスポートする各初期化関数にはJSDocを用いて役割や引数・戻り値を明文化し、複数人でのチーム開発を想定した、可読性が高くメンテナンスしやすいコードベースを構築しました。

* **Vite + Stylelint を導入したモダンな開発・ビルド環境の構築**

  フロントエンドのビルドツールとしてViteを採用し、HMRによる高速な開発環境を構築しています。また、Stylelint（Recess Orderによるプロパティ順序の自動ソート含む）を導入し、保存時の自動フォーマット化によりコード品質を担保しています。公開に向けては、Viteによるファイルのバンドルと圧縮、Autoprefixerによるベンダープレフィックスの自動付与を行い、パフォーマンスを意識した最適なビルドプロセスを実践しました。

## 使用技術
**フロントエンド**
* HTML
* Sass (SCSS)
* JavaScript (ES Modules)
* GSAP (ScrollTrigger, ScrollToPlugin, SplitText)

**設計・開発環境**
* FLOCSS (CSSアーキテクチャ)
* Vite (ビルドツール)
* Node.js / npm (パッケージ管理)
* Stylelint (静的解析・コードフォーマッター)

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
![背景レイヤーの画像](docs/bg/bg.png)

サイト全体のベースとなる背景専用のレイヤーです。

`position: fixed` で画面全体に固定配置し、高さに `100lvh` を指定することで、スマートフォン環境におけるアドレスバーの開閉時にも背景の下部に隙間ができないよう工夫しています。

また、単なる単色のベタ塗りではなく、疑似要素（::before）を用いて[ノイズテクスチャの画像](src/assets/images/common/noise.jpg)を重ねています。`mix-blend-mode: color-dodge` を用いて白い粒立ちを際立たせ、適度な透過（`opacity: 0.12`）を適用することで、大人っぽさや高級感を引き立てるリッチな質感を演出しました。

※なお、このレイヤーは後述の「[Processセクション](#processセクション)」における、スクロールに連動した背景色切り替えのベース要素としても機能しています。

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
