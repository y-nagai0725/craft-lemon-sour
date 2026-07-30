// =========================================================================
// fv.js (FV機能モジュール)
// =========================================================================

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import { BREAKPOINTS, GSAP_CONFIG } from '../utils/constants.js';

// GSAPプラグインの登録
gsap.registerPlugin(ScrollTrigger, SplitText);

export const initFv = () => {
  // テキストを1文字ずつ分割する処理
  const splitTitle = SplitText.create('.js-fv-text', { type: 'chars' });
  const chars = splitTitle.chars;

  // テキスト分割の親要素の非表示を解除
  gsap.set('.js-fv-text', { autoAlpha: 1 });

  const mm = gsap.matchMedia();

  mm.add({
    isSp: `(width < ${BREAKPOINTS.MD}px)`,
    isPc: `(width >= ${BREAKPOINTS.MD}px)`
  }, (context) => {
    let { isSp, isPc } = context.conditions;

    const tl = gsap.timeline();

    if (isSp) {
      // -----------------------------------
      // SP表示：下からフワッっとフェードイン
      // -----------------------------------
      // テキストのアニメーション（1文字ずつ）
      tl.fromTo(chars,
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: GSAP_CONFIG.EASE
        }
      )
        // 画像たちのアニメーション
        .fromTo('.js-fv-item',
          { y: 100, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.0,
            stagger: 0.1,
            ease: GSAP_CONFIG.EASE
          },
          '-=0.4' // テキストが完全に終わる少し前に画像を出し始める
        );

    } else {
      // -----------------------------------
      // PC表示：左右からフェードイン
      // -----------------------------------
      // テキストは左から入ってくる（1文字ずつ）
      tl.fromTo(chars,
        { x: -20, autoAlpha: 0 },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.035, // PCは文字が横に並ぶから少し早めにする
          ease: GSAP_CONFIG.EASE
        }
      )
        // 画像たちは右からフワッと迫ってくる
        .fromTo('.js-fv-item',
          { x: 50, autoAlpha: 0 },
          {
            x: 0,
            autoAlpha: 1,
            duration: 1.0,
            stagger: 0.1,
            ease: GSAP_CONFIG.EASE
          },
          '-=0.4'
        );
    }
  });

  // スクロール連動のパララックス
  const parallaxItems = document.querySelectorAll('.js-parallax');
  parallaxItems.forEach(item => {
    const speed = item.dataset.speed || 0.5;
    gsap.to(item, {
      y: () => -200 * speed,
      ease: 'none',
      scrollTrigger: {
        trigger: '.p-fv',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  });
};