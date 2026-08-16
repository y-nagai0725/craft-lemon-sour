/**
 * @file Processセクション機能モジュール
 * @description Processセクション到達時の背景色・テキストカラーの反転アニメーションと、スクロールに連動した要素のフェードインアニメーションを管理します。
 */

// =========================================================================
// process.js (Processセクション用モジュール)
// =========================================================================

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { BREAKPOINTS, COLORS, GSAP_CONFIG } from '../utils/constants.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Processセクションのアニメーションを初期化する
 * @description セクション到達時に背景の専用レイヤー（.c-bg）とテキストを明るいテーマへ切り替えるタイムラインと、PC/SPのレイアウト差異を考慮したテキスト・画像の登場アニメーションを設定します。
 * @returns {void}
 */
export const initProcess = () => {
  const globalBg = document.querySelector('.js-global-bg');
  const processSection = document.querySelector('.js-process-bg');
  const textWrap = document.querySelector('.js-process-text-wrap');
  const processTitle = document.querySelector('.js-process-title');
  const processTexts = document.querySelectorAll('.js-process-lead, .js-process-desc');
  const images = document.querySelectorAll('.js-process-image');

  if (!globalBg || !processSection || !textWrap || !processTitle || processTexts.length === 0 || images.length === 0) return;

  // ------------------------------
  // 背景とテキストのカラーチェンジ
  // ------------------------------
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: processSection,
      start: 'top 50%',
      end: 'bottom bottom',
      toggleActions: 'play reverse play reverse',
    }
  });

  tl.to(globalBg, {
    backgroundColor: COLORS.LIGHT,
    duration: 1.0,
    ease: GSAP_CONFIG.EASE,
  }, 0)
    .to(processTitle, {
      color: COLORS.DARK,
      duration: 1.0,
      ease: GSAP_CONFIG.EASE,
    }, 0)
    .to(processTexts, {
      color: COLORS.DARK,
      duration: 1.0,
      ease: GSAP_CONFIG.EASE,
    }, 0);

  // ------------------------------
  // テキストと画像の出現アニメーション
  // ------------------------------
  const mm = gsap.matchMedia();

  // .fromの共通設定
  const commonFrom = {
    y: 60,
    autoAlpha: 0,
  };

  // .toの共通設定
  const commonTo = {
    y: 0,
    autoAlpha: 1,
    duration: 1.2,
    ease: GSAP_CONFIG.EASE,
  };

  mm.add({
    isSp: `(width < ${BREAKPOINTS.MD}px)`,
    isPc: `(width >= ${BREAKPOINTS.MD}px)`
  }, (context) => {
    let { isSp, isPc } = context.conditions;

    if (isPc) {
      // PC時：横並びなので、テキストと画像を一気にStaggerで登場させる
      gsap.fromTo([textWrap, ...images],
        {
          ...commonFrom
        },
        {
          ...commonTo,
          stagger: 0.2, // テキスト→レモン→麦→樽の順
          scrollTrigger: {
            trigger: processSection,
            start: 'top 50%',
          }
        }
      );
    } else {
      // SP時：縦積みなので、テキストと画像を別々のトリガーで発火させる

      // 上にあるテキストのアニメーション
      gsap.fromTo(textWrap,
        {
          ...commonFrom
        },
        {
          ...commonTo,
          scrollTrigger: {
            trigger: processSection,
            start: 'top 60%',
          }
        }
      );

      // 下にある画像のアニメーション
      gsap.fromTo(images,
        {
          ...commonFrom
        },
        {
          ...commonTo,
          stagger: 0.2, // 3枚の画像は順番に出す
          scrollTrigger: {
            trigger: '.p-process__images', // 画像エリア自体が画面に入ったら発火
            start: 'top 60%',
          }
        }
      );
    }
  });
};