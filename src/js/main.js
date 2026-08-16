/**
 * @file サイト全体のエントリーポイント
 * @description 各モジュールの読み込みと初期化処理を束ね、ページ読み込み完了時のローディング制御やアニメーションの実行順序を管理します。
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

// すべての読み込みと描画準備が完了したら、preloadクラスを外してアニメーションを解禁する
window.addEventListener('load', async () => {
  document.body.classList.remove('preload');

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
});

/**
 * 各セクションのJSモジュールをまとめて初期化する
 * @description ページトップへのスクロールや、各セクション（Concept, Process, Lineupなど）のスクロール連動アニメーションの初期化関数を呼び出します。FVとヘッダーはloadイベント内で別途順番に制御するためここには含めません。
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
init();