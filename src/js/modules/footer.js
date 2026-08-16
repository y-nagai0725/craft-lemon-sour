/**
 * @file フッター機能モジュール
 * @description フッター内のナビゲーションリンクからのスムーススクロール機能（クリック時点の動的なヘッダー高さを考慮したオフセット処理）を管理します。
 */

// =========================================================================
// footer.js (フッター用機能モジュール)
// =========================================================================

import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { GSAP_CONFIG } from '../utils/constants.js';

// GSAPプラグインの登録
gsap.registerPlugin(ScrollToPlugin);

/**
 * フッター内のイベントリスナーを初期化する
 * @description フッターのナビゲーションリンクに対し、クリック時に現在のヘッダー高さを動的に取得し、その分をオフセットとして考慮したページ内スムーススクロールを設定します。
 * @returns {void}
 */
export const initFooter = () => {
  const footer = document.getElementById('js-footer');
  const navLinks = document.querySelectorAll('.js-footer-nav-link');

  // 要素が存在しない場合は処理を止める
  if (!footer || navLinks.length === 0) return;

  // ヘッダーの高さ取得
  const getHeaderHeight = () => {
    // ヘッダー要素を取得
    const header = document.getElementById('js-header');

    // headerが存在すれば高さを取得
    const headerHeight = header ? header.offsetHeight : 0;

    return headerHeight;
  };

  // アンカーリンクのスムーススクロール
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');

      // 対象のセクションまでスムーススクロール
      gsap.to(window, {
        duration: GSAP_CONFIG.DURATION_SCROLL,
        scrollTo: {
          y: target,
          offsetY: () => getHeaderHeight() // クリックした瞬間のヘッダーの高さを取得し、その高さ分ずらす
        },
        ease: GSAP_CONFIG.EASE_SCROLL
      });
    });
  });
};