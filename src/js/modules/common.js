import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

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