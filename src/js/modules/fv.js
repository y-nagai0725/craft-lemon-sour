import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { BREAKPOINTS } from '../utils/constants.js';

// ScrollTriggerを登録
gsap.registerPlugin(ScrollTrigger);

export const initFv = () => {
  // matchMediaを準備
  const mm = gsap.matchMedia();

  // スマホ(SP)とPCで条件を分ける
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
      tl.from('.p-fv__catch, .p-fv__title', {
        y: 30,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      })
        .from('.js-fv-item', {
          y: 100,
          autoAlpha: 0,
          duration: 1.5,
          stagger: 0.1,
          ease: 'power3.out'
        }, '-=0.8');

    } else {
      // -----------------------------------
      // PC表示：左右からフェードイン
      // -----------------------------------
      // テキストは左から入ってくる
      tl.from('.p-fv__catch, .p-fv__title', {
        x: -50, // 左方向にずらしておく
        autoAlpha: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      })
        // 画像たちは右からフワッと迫ってくる
        .from('.js-fv-item', {
          x: 50, // 右方向にずらしておく
          autoAlpha: 0,
          duration: 1.5,
          stagger: 0.1,
          ease: 'power3.out'
        }, '-=0.8');
    }
  });

  // スクロール連動のパララックス（視差効果）
  const parallaxItems = document.querySelectorAll('.js-parallax');

  parallaxItems.forEach(item => {
    // HTMLの data-speed 属性から数値を取得
    const speed = item.dataset.speed || 0.5;

    gsap.to(item, {
      y: () => -200 * speed,
      ease: 'none',
      overwrite: 'auto',
      scrollTrigger: {
        trigger: '.p-fv',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  });
};