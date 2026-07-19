// =========================================================================
// header.js (ヘッダー機能モジュール)
// =========================================================================

import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

// 定数読み込み
import { BREAKPOINTS, GSAP_CONFIG } from '../utils/constants.js';

// GSAPプラグインの登録
gsap.registerPlugin(ScrollToPlugin);

/**
 * ヘッダー機能初期化処理
 */
export const initHeader = () => {
  const header = document.getElementById('js-header');
  const hamburger = document.getElementById('js-hamburger');
  const nav = document.getElementById('js-nav');
  const navLinks = document.querySelectorAll('.js-nav-link');

  if (!header || !hamburger || !nav || navLinks.length === 0) return;

  // メニューが開いているかどうかの状態管理フラグ
  let isOpen = false;

  // メニュー開閉用のGSAPタイムライン（最初は停止状態にしておく）
  const tl = gsap.timeline({ paused: true });

  tl.to(nav, {
    autoAlpha: 1,
    duration: GSAP_CONFIG.DURATION,
    ease: GSAP_CONFIG.EASE
  })
    .fromTo(navLinks,
      { y: 20, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: GSAP_CONFIG.DURATION, stagger: 0.1, ease: GSAP_CONFIG.EASE },
      '-=0.15'
    );

  // ハンバーガーボタンのクリックイベント
  hamburger.addEventListener('click', () => {
    isOpen = !isOpen;
    hamburger.classList.toggle('is-active');

    if (isOpen) {
      tl.play();
    } else {
      tl.reverse();
    }
  });

  // アンカーリンクのスムーススクロールとメニュー閉じる処理
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');

      // もしスマホサイズでメニューが開いていたら、リンク遷移と同時に閉じる
      if (isOpen) {
        isOpen = false;
        hamburger.classList.remove('is-active');
        tl.reverse();
      }

      // 対象のセクションまでスムーススクロール
      gsap.to(window, {
        duration: 0.8,
        scrollTo: {
          y: target,
          offsetY: () => header.offsetHeight // クリックした瞬間のヘッダーの高さを取得し、その高さ分ずらす
        },
        ease: 'power3.inOut'
      });
    });
  });

  // PC表示切り替え判定(768px以上)
  const mql = window.matchMedia(`(width >= ${BREAKPOINTS.MD}px)`);

  // PC表示切り替え時処理
  const handleMediaQuery = (e) => {
    if (e.matches) {
      // メニューが開いている状態でPC表示になったら状態をリセット
      if (isOpen) {
        isOpen = false;
        hamburger.classList.remove('is-active');

        // タイムラインを再生前の初期状態に戻して一時停止する
        tl.progress(0).pause();
      }

      // PC表示用にGSAPのインラインスタイルを全てクリアする
      gsap.set([nav, navLinks], { clearProps: 'all' });
    }
  };

  // ブレイクポイントを跨いだ瞬間に発火
  mql.addEventListener('change', handleMediaQuery);

  // 初期表示時にも判定を実行
  handleMediaQuery(mql);
};