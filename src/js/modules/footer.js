import gsap from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

// GSAPプラグインの登録
gsap.registerPlugin(ScrollToPlugin);

export const initFooter = () => {
  const footer = document.getElementById('js-footer');
  const navLinks = document.querySelectorAll('.js-footer-nav-link');

  // 要素が存在しない場合は処理を止める
  if (!footer || navLinks.length === 0) return;

  // ヘッダーの高さ取得
  const getHeaderHeight = () => {
    // ヘッダー要素を取得
    const header = document.getElementById('js-header');

    // headerが存在すれば高さを取得
    const headerHeight = header ? header.offsetHeight : 0;

    return headerHeight;
  };

  // アンカーリンクのスムーススクロール
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');

      // 対象のセクションまでスムーススクロール
      gsap.to(window, {
        duration: 0.8,
        scrollTo: {
          y: target,
          offsetY: () => getHeaderHeight() // クリックした瞬間のヘッダーの高さを取得し、その高さ分ずらす
        },
        ease: 'power3.inOut'
      });
    });
  });
};