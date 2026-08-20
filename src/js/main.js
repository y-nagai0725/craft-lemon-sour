/**
 * @file サイト全体のエントリーポイント
 * @description 各モジュールの読み込みと初期化処理を束ね、OPアニメーションからページ本編へのシームレスなローディング制御、および各セクションのアニメーション実行順序を管理します。
 */

import '../scss/style.scss';
import gsap from 'gsap';
import { GSAP_CONFIG } from './utils/constants.js';
import { initScrollTop, initPageTop } from './modules/common.js';
import { initHeader } from './modules/header.js';
import { initFv } from './modules/fv.js';
import { initConcept } from './modules/concept.js';
import { initProcess } from './modules/process.js';
import { initLineup } from './modules/lineup.js';
import { initMessage } from './modules/message.js';
import { initShop } from './modules/shop.js';
import { initFooter } from './modules/footer.js';

/**
 * OPアニメーションとローディング制御を実行する
 * @description ページアクセス時にロゴとドットのアニメーションを展開し、最低表示時間（1.8秒）と読み込み完了（loadイベント）の両方をPromiseで待機します。完了後、OP画面をフェードアウトさせてアニメーションを停止し、本編の表示（FVやヘッダーのアニメーション）へと繋ぎます。
 * @returns {Promise<void>} すべてのローディングと初期表示アニメーションが完了したタイミングでresolveされるPromise
 */
const initLoader = async () => {
  const opener = document.getElementById('js-opener');
  const logo = document.querySelector('.js-opener-logo');
  const dots = document.querySelectorAll('.js-opener-dot');

  // ロゴとドットをフェードイン
  const introTl = gsap.timeline();
  introTl.to(logo, {
    autoAlpha: 1,
    duration: 0.8,
    ease: GSAP_CONFIG.EASE
  }).to(dots, {
    autoAlpha: 1,
    duration: 0.4,
    stagger: 0.1
  }, '-=0.4');

  // ドットのバウンドアニメーション（無限ループ）
  dots.forEach((dot, index) => {
    gsap.to(dot, {
      y: -12,
      duration: 0.5,
      delay: 0.25 * index,
      ease: GSAP_CONFIG.EASE,
      yoyo: true,
      repeat: -1
    })
  });

  // 「最低1.8秒間はOPを見せる」Promise
  const minimumTimePromise = new Promise((resolve) => {
    setTimeout(resolve, 1800);
  });

  // 「ページの読み込み完了」Promise
  const windowLoadPromise = new Promise((resolve) => {
    if (document.readyState === 'complete') {
      resolve();
    } else {
      window.addEventListener('load', resolve);
    }
  });

  // 両方の処理が終わるのを待つ
  await Promise.all([minimumTimePromise, windowLoadPromise]);

  // 読み込み完了後、OP画面をフワッと消す
  await gsap.to(opener, {
    autoAlpha: 0,
    duration: 0.8,
    ease: GSAP_CONFIG.EASE
  });

  // バウンドアニメーションを止める
  gsap.killTweensOf(dots);

  // OP画面をDOMから隠し、スクロール制限を解除
  gsap.set(opener, { display: 'none' });
  document.body.classList.remove('is-noscroll', 'preload');

  // サイト全体（.l-wrapper）をフワッとフェードインさせる
  await gsap.to('.l-wrapper', {
    autoAlpha: 1,
    duration: 0.8,
    ease: GSAP_CONFIG.EASE
  });

  // ヘッダーが上から降りてくるのを待つ
  await initHeader();

  // ヘッダーが降りきったら、FVのアニメーションをスタート
  initFv();
};

/**
 * 各セクションのJSモジュールをまとめて初期化する
 * @description ページトップへのスクロールや、各セクション（Concept, Process, Lineupなど）のスクロール連動アニメーションの初期化関数を呼び出します。
 * @returns {void}
 */
const init = () => {
  initScrollTop();
  initPageTop();
  initConcept();
  initProcess();
  initLineup();
  initMessage();
  initShop();
  initFooter();
};

// 初期化を実行
initLoader();
init();