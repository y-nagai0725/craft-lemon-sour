// =========================================================================
// concept.js (Conceptセクション用モジュール)
// =========================================================================

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { BREAKPOINTS, GSAP_CONFIG } from '../utils/constants.js';

gsap.registerPlugin(ScrollTrigger);

export const initConcept = () => {
  // ------------------------------
  // ボトルの登場アニメーション
  // ------------------------------
  gsap.fromTo('.js-bottle-image', {
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

  const mm = gsap.matchMedia();

  mm.add({
    isSp: `(width < ${BREAKPOINTS.MD}px)`,
    isPc: `(width >= ${BREAKPOINTS.MD}px)`
  }, (context) => {
    let { isSp, isPc } = context.conditions;

    // ヘッダー要素を取得
    const header = document.getElementById('js-header');

    // headerが存在すれば高さを取得、なければ予備としてSCSSの固定値を使う
    const headerHeight = header ? header.offsetHeight : (isPc ? 80 : 60);

    // ------------------------------
    // ボトルのPin留め（固定）
    // ------------------------------
    ScrollTrigger.create({
      trigger: '.p-concept',
      start: `top top+=${headerHeight}`, // ヘッダーの下端に触れたらスタート
      end: 'bottom bottom', // セクションの最後まで固定
      pin: '.js-pin-bottle',
      pinSpacing: isPc ? true : false, // SP時はテキストを上に被せるためにfalse、PC時は横並びを維持するためにtrueにする
    });

    // ------------------------------
    // テキストブロックのフェードイン
    // ------------------------------
    const blocks = document.querySelectorAll('.js-concept-text');

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
  });
};