import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { BREAKPOINTS, COLORS } from '../utils/constants.js';

gsap.registerPlugin(ScrollTrigger);

export const initProcess = () => {
  const processSection = document.querySelector('.js-process-bg');
  const processTitle = document.querySelector('.p-process__title');
  const texts = document.querySelectorAll('.js-process-text');
  const images = document.querySelectorAll('.js-process-image');

  /* ------------------------------
    背景とテキストのカラーチェンジ
  ------------------------------ */
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: processSection,
      start: 'top 50%',
      toggleActions: 'play none none reverse',
    }
  });

  tl.to(processSection, {
    backgroundColor: COLORS.LIGHT,
    color: COLORS.DARK,
    duration: 1.5,
    ease: 'power2.out',
  }, 0)
    .to(processTitle, {
      color: COLORS.DARK,
      duration: 1.5,
      ease: 'power2.out',
    }, 0);

  /* ------------------------------
    テキストと画像の出現アニメーション
  ------------------------------ */
  const mm = gsap.matchMedia();

  mm.add({
    isSp: `(width < ${BREAKPOINTS.MD}px)`,
    isPc: `(width >= ${BREAKPOINTS.MD}px)`
  }, (context) => {
    let { isSp, isPc } = context.conditions;

    if (isPc) {
      // PC時：横並びなので、テキストと画像を一気にStaggerで登場させる
      gsap.from([...texts, ...images], {
        y: 60,
        autoAlpha: 0,
        duration: 1.2,
        stagger: 0.2, // テキスト→レモン→麦→樽の順
        ease: 'power3.out',
        scrollTrigger: {
          trigger: processSection,
          start: 'top 50%',
        }
      });
    } else {
      // SP時：縦積みなので、テキストと画像を別々のトリガーで発火させる

      // 上にあるテキストのアニメーション
      gsap.from(texts, {
        y: 60,
        autoAlpha: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: processSection,
          start: 'top 60%',
        }
      });

      // 下にある画像のアニメーション
      gsap.from(images, {
        y: 60,
        autoAlpha: 0,
        duration: 1.2,
        stagger: 0.2, // 3枚の画像は順番に出す
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.p-process__images', // 画像エリア自体が画面に入ったら発火
          start: 'top 60%',
        }
      });
    }
  });
};