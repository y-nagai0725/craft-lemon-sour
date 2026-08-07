// =========================================================================
// message.js (Messageセクション用モジュール)
// =========================================================================

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { GSAP_CONFIG } from '../utils/constants.js';

gsap.registerPlugin(ScrollTrigger);

export const initMessage = () => {
  const section = document.querySelector('.js-message-section');
  const bg = document.querySelector('.js-message-bg');
  const textWrap = document.querySelector('.js-message-text');
  const title = document.querySelector('.js-message-title');
  const desc = document.querySelector('.js-message-desc');

  // 要素が存在しない場合は処理を止める
  if (!section || !bg || !textWrap || !title || !desc) return;

  // ---------------------------------------------------
  // 背景画像のパララックス
  // ---------------------------------------------------

  // SCSSで scale で拡大している画像を、スクロールに合わせて scale(1) に戻していく
  gsap.to(bg, {
    scale: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top bottom', // セクションが画面の下から見え始めたらスタート
      end: 'bottom top',   // セクションが画面の上へ抜けきったらエンド
      scrub: true,
    }
  });

  // ---------------------------------------------------
  // テキストのクリップパスアニメーション
  // ---------------------------------------------------

  // clipPathで要素の下100%を切り取っておく
  gsap.set([title, desc], {
    autoAlpha: 1,
    clipPath: 'inset(100% 0% 0% 0%)',
    y: 20 // 少しだけ下にずらしておく
  });

  // タイムラインを作成
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: textWrap,
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    }
  });

  // .toの共通設定
  const commonTo = {
    clipPath: 'inset(0% 0% 0% 0%)',
    y: 0,
    duration: 1.2,
    ease: GSAP_CONFIG.EASE,
    clearProps: 'clipPath', // アニメーション終了後に clipPath プロパティの設定を削除しておく（text-shadow の影を正しく効かせるため）
  };

  // タイトルを下から表示
  tl.to(title, {
    ...commonTo,
  })
    // 説明文を少し遅れて表示
    .to(desc, {
      ...commonTo,
    }, '-=0.8'); // タイトルのアニメーションが終わる0.8秒前からスタートさせる
};