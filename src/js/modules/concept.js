/**
 * @file Conceptセクション機能モジュール
 * @description Conceptセクションにおける、スクロールに連動したボトル画像のフェードイン・テキストブロックのフェードイン/ブラー演出を管理します。
 */

// =========================================================================
// concept.js (Conceptセクション用モジュール)
// =========================================================================

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { GSAP_CONFIG } from '../utils/constants.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Conceptセクションのアニメーションを初期化する
 * @description ボトル画像の下からのフェードイン、および各テキストブロックの順次フェードイン（ブラー効果付き）を設定します。
 * @returns {void}
 */
export const initConcept = () => {
  const bottleImage = document.querySelector('.js-bottle-image');
  const blocks = document.querySelectorAll('.js-concept-text');

  // 要素が存在しない場合は処理を止める
  if (!bottleImage || blocks.length === 0) return;

  // ------------------------------
  // ボトルの登場アニメーション
  // ------------------------------
  gsap.fromTo(bottleImage, {
    y: 80, // 下から少しゆったりと
    autoAlpha: 0
  }, {
    y: 0,
    autoAlpha: 1,
    duration: 1.5,
    ease: GSAP_CONFIG.EASE,
    scrollTrigger: {
      trigger: '.p-concept',
      start: 'top 50%',
    }
  });

  // ------------------------------
  // テキストブロックのフェードイン
  // ------------------------------
  blocks.forEach((block) => {
    // ブロックの中にあるタイトルと説明文を取得する
    const title = block.querySelector('.p-concept__title');
    const desc = block.querySelector('.p-concept__desc');

    // タイムラインを作成
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      }
    });

    // ブロック全体をフェードイン
    tl.fromTo(block,
      {
        autoAlpha: 0
      },
      {
        autoAlpha: 1, duration: 0.6, ease: GSAP_CONFIG.EASE
      }
    )
      // タイトルと説明文に「ぼかし(blur)」をかけながら下から順番に表示
      .fromTo([title, desc],
        {
          y: 30,
          autoAlpha: 0,
          filter: 'blur(8px)'
        },
        {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 1.0,
          stagger: 0.2,
          ease: GSAP_CONFIG.EASE
        },
        '-=0.4' // 背景が完全に出る少し前にテキストを出し始める
      );
  });
};