// =========================================================================
// common.js (共通モジュール)
// =========================================================================

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { GSAP_CONFIG } from '../utils/constants.js';

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
        duration: GSAP_CONFIG.DURATION_SCROLL,
        scrollTo: 0,
        ease: GSAP_CONFIG.EASE_SCROLL
      });
    });
  });
};

export const initPageTop = () => {
  const pagetop = document.querySelector('.js-pagetop');

  // 要素が存在しない場合は処理を止める
  if (!pagetop) return;

  // FV（#fv）を通り過ぎて、Conceptセクション（#concept）が見え始めたらボタンを表示
  ScrollTrigger.create({
    trigger: '#concept',
    start: 'top 70%',
    onEnter: () => pagetop.classList.add('is-active'),
    onLeaveBack: () => pagetop.classList.remove('is-active')
  });
};