/**
 * @file サイト全体で使用する共通定数モジュール
 * @description ブレイクポイント、GSAPのアニメーション設定、共通カラーなど、複数ファイルで参照される定数をまとめて管理します。
 */

// =========================================================================
// constants.js (サイト全体で使う共通定数)
// =========================================================================

/**
 * メディアクエリのブレイクポイント（px）
 * @type {{ MD: number }}
 * @property {number} MD - SP（768px未満）とPC・タブレット（768px以上）を切り替えるブレイクポイント
 */
export const BREAKPOINTS = {
  MD: 768
};

/**
 * GSAPの共通アニメーション設定
 * @type {{ EASE: string, EASE_SCROLL: string, DURATION_SCROLL: number }}
 * @property {string} EASE - 要素のフェードインなどで共通使用するイージング関数
 * @property {string} EASE_SCROLL - スムーススクロール用のイージング関数
 * @property {number} DURATION_SCROLL - スムーススクロールの実行時間（秒）
 */
export const GSAP_CONFIG = {
  EASE: 'power3.out',
  EASE_SCROLL: 'power3.inOut',
  DURATION_SCROLL: 0.8,
};

/**
 * サイト全体のテーマカラー
 * @type {{ PRIMARY: string, DARK: string, LIGHT: string }}
 * @property {string} PRIMARY - アクセントとなるレモンイエロー
 * @property {string} DARK - ベースカラーのダークネイビー
 * @property {string} LIGHT - テキストや明るい背景用のオフホワイト
 */
export const COLORS = {
  PRIMARY: '#f9d854', // レモンイエロー
  DARK: '#12161a',    // ダークネイビー
  LIGHT: '#fcfaf2'    // オフホワイト
};