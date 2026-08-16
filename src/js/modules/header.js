/**
 * @file ヘッダー機能モジュール
 * @description ヘッダーの初期出現アニメーション、ハンバーガーメニューの開閉制御、およびナビゲーションリンクからのスムーススクロール機能を管理します。
 */

// =========================================================================
// header.js (ヘッダー機能モジュール)
// =========================================================================

import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { BREAKPOINTS, GSAP_CONFIG } from '../utils/constants.js';

gsap.registerPlugin(ScrollToPlugin);

/**
 * ヘッダーのアニメーションとイベントを初期化する
 * @description ページ読み込み時のヘッダー降下アニメーションを実行し、完了後にPromiseをresolveします。SP時のメニュー開閉処理、リサイズ時の状態リセット、ページ内リンクのスムーススクロール（ヘッダー高さ分のオフセット考慮）を設定します。
 * @returns {Promise<void>} ヘッダーの出現アニメーションが完了したタイミングでresolveされるPromise
 */
export const initHeader = () => {
  return new Promise((resolve) => {
    const header = document.getElementById('js-header');
    const hamburger = document.getElementById('js-hamburger');
    const nav = document.getElementById('js-header-nav');
    const navLinks = document.querySelectorAll('.js-header-nav-link');

    if (!header || !hamburger || !nav || navLinks.length === 0) {
      resolve();
      return;
    }

    // ヘッダー出現アニメーション
    gsap.fromTo(header,
      {
        yPercent: -100,
        autoAlpha: 0
      },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.6,
        ease: GSAP_CONFIG.EASE,
        onComplete: resolve
      }
    );

    // =========================================================================
    // メニューの開閉状態管理とタイムライン
    // =========================================================================
    let isOpen = false;
    const tl = gsap.timeline({ paused: true });

    tl.to(nav, {
      autoAlpha: 1,
      duration: 0.3,
      ease: GSAP_CONFIG.EASE
    }).fromTo(navLinks,
      {
        y: 20,
        autoAlpha: 0
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.3,
        stagger: 0.1,
        ease: GSAP_CONFIG.EASE
      },
      '-=0.15'
    );

    // メニューを開く処理
    const openMenu = () => {
      isOpen = true;
      hamburger.classList.add('is-active');
      document.body.classList.add('is-noscroll');
      tl.play(); // アニメーションを再生
    };

    // メニューを閉じる処理
    const closeMenu = (immediate = false) => {
      isOpen = false;
      hamburger.classList.remove('is-active');
      document.body.classList.remove('is-noscroll');

      if (immediate) {
        tl.progress(0).pause(); // PC表示への切り替え時は一瞬で初期状態に戻す
      } else {
        tl.reverse(); // 通常時は逆再生で閉じる
      }
    };

    // =========================================================================
    // 各種イベントリスナー
    // =========================================================================

    // ハンバーガーボタンのクリックイベント
    hamburger.addEventListener('click', () => {
      if (isOpen) {
        closeMenu(); // 開いていたら閉じる
      } else {
        openMenu();  // 閉じていたら開く
      }
    });

    // アンカーリンクのスムーススクロールとメニューを閉じる処理
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href');

        // メニューを閉じる
        if (isOpen) closeMenu();

        // 対象のセクションまでスムーススクロール
        gsap.to(window, {
          duration: GSAP_CONFIG.DURATION_SCROLL,
          scrollTo: {
            y: target,
            offsetY: () => header.offsetHeight // クリックした瞬間のヘッダーの高さを取得し、その高さ分ずらす
          },
          ease: GSAP_CONFIG.EASE_SCROLL
        });
      });
    });

    // PC表示切り替え判定(768px以上)
    const mql = window.matchMedia(`(width >= ${BREAKPOINTS.MD}px)`);

    // PC表示切り替え時処理
    const handleMediaQuery = (e) => {
      if (e.matches) {
        // アニメーションなしで一瞬で閉じる
        if (isOpen) closeMenu(true);

        // PC表示用にGSAPのインラインスタイルを全てクリアする
        gsap.set([nav, navLinks], { clearProps: 'all' });
      }
    };

    // ブレイクポイントを跨いだ瞬間に発火
    mql.addEventListener('change', handleMediaQuery);

    // 初期表示時にも判定を実行
    handleMediaQuery(mql);
  });
};