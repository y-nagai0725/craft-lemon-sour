import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// ScrollTriggerを登録
gsap.registerPlugin(ScrollTrigger);

export const initFv = () => {
  // ページ読み込み時の登場アニメーション
  const tl = gsap.timeline();

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
    }, '-=0.8'); // テキストが出終わる前に少し食い気味でスタートさせる

  // スクロール連動のパララックス（視差効果）
  const parallaxItems = document.querySelectorAll('.js-parallax');

  parallaxItems.forEach(item => {
    // HTMLの data-speed 属性から数値を取得
    const speed = item.dataset.speed || 0.5;

    gsap.to(item, {
      y: () => -150 * speed,
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