import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const initScrollTop = () => {
  const scrollTopLinks = document.querySelectorAll('.js-scroll-top');

  // 要素が存在しない場合は処理を止める
  if (scrollTopLinks.length === 0) return;

  scrollTopLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // デフォルトのリンク遷移をキャンセル

      // ページの一番上（y: 0）へスムーススクロール
      gsap.to(window, {
        duration: 0.8,
        scrollTo: 0,
        ease: 'power3.inOut'
      });
    });
  });
};

export const initPageTop = () => {
  const pagetop = document.querySelector('.js-pagetop');

  if (!pagetop) return;

  // FV（#fv）を通り過ぎて、Conceptセクション（#concept）が見え始めたらボタンを表示
  ScrollTrigger.create({
    trigger: '#concept',
    start: 'top 70%',
    onEnter: () => pagetop.classList.add('is-active'),
    onLeaveBack: () => pagetop.classList.remove('is-active')
  });
};