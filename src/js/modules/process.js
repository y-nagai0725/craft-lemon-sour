import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initProcess = () => {
  const processSection = document.querySelector('.js-process-bg');
  const processTitle = document.querySelector('.p-process__title');
  const items = document.querySelectorAll('.js-process-item');

  /* ------------------------------
    1. 背景とテキストのカラーチェンジ
  ------------------------------ */
  // セクション全体の色を反転！
  gsap.to(processSection, {
    backgroundColor: '#fcfaf2', // 背景を優しいオフホワイト（g.$color-light）に♡
    color: '#12161a',           // 本文テキストをダークネイビー（g.$color-dark）に♡
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: processSection,
      start: 'top 40%', // 画面の60%の位置にセクションの頭が来たら発火！
      // スクロールで上に戻った時に、ちゃんと元のダークモードに戻す魔法！♡
      toggleActions: 'play none none reverse',
    }
  });

  // タイトルの色も背景に合わせてダークネイビーに変更！
  gsap.to(processTitle, {
    color: '#12161a',
    duration: 1.5,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: processSection,
      start: 'top 40%',
      toggleActions: 'play none none reverse',
    }
  });

  /* ------------------------------
    2. テキストと画像が順番に出現（Stagger）
  ------------------------------ */
  gsap.from(items, {
    y: 60, // 下から60pxスッと上がる
    autoAlpha: 0,
    duration: 1.2,
    stagger: 0.2, // 0.2秒ズレで順番に登場させる最強のプロパティ！♡
    ease: 'power3.out',
    scrollTrigger: {
      trigger: processSection,
      start: 'top 40%', // 色が変わり始めるのとほぼ同時にフワッと出すよ！
    }
  });
};