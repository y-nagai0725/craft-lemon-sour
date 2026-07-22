import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { BREAKPOINTS } from '../utils/constants.js';

gsap.registerPlugin(ScrollTrigger);

export const initConcept = () => {
  // ------------------------------
  // ボトルの登場アニメーション
  // ------------------------------
  gsap.from('.js-pin-bottle img', {
    y: 80, // 下から少しゆったりと
    autoAlpha: 0,
    duration: 1.5,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.p-concept',
      start: 'top 65%',
    }
  });

  const mm = gsap.matchMedia();

  mm.add({
    isSp: `(width < ${BREAKPOINTS.MD}px)`,
    isPc: `(width >= ${BREAKPOINTS.MD}px)`
  }, (context) => {
    let { isSp, isPc } = context.conditions;

    // ヘッダー要素を取得
    const header = document.querySelector('.l-header');

    // headerが存在すれば高さを取得、なければ予備としてSCSSの固定値を使う
    const headerHeight = header ? header.offsetHeight : (isPc ? 80 : 60);

    /* ------------------------------
      ボトルのPin留め（固定）
    ------------------------------ */
    ScrollTrigger.create({
      trigger: '.p-concept',
      start: `top top+=${headerHeight}`, // ヘッダーの下端に触れたらスタート
      end: 'bottom bottom', // セクションの最後まで固定
      pin: '.js-pin-bottle',
      pinSpacing: isPc ? true : false, // SP時はテキストを上に被せるためにfalse、PC時は横並びを維持するためにtrueにする
    });

    /* ------------------------------
      テキストブロックのフェードイン
    ------------------------------ */
    const blocks = document.querySelectorAll('.p-concept__block');

    blocks.forEach((block) => {
      gsap.from(block, {
        y: 40,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: block,
          start: 'top 80%',
        }
      });
    });
  });
};