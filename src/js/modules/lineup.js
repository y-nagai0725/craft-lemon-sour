import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initLineup = () => {
  const trigger = document.querySelector('.js-lineup-trigger');
  const track = document.querySelector('.js-lineup-track');

  // 要素が存在しない場合は処理を止める安全設計
  if (!trigger || !track) return;

  // 左に動かす「距離」を計算する関数！
  // (trackの実際の幅) - (現在の画面の幅)
  const getScrollAmount = () => track.scrollWidth - window.innerWidth;

  gsap.to(track, {
    x: () => -getScrollAmount(), // 計算した距離の分だけ、マイナス（左方向）へ移動させる
    ease: 'none',
    scrollTrigger: {
      trigger: trigger,
      pin: true,
      scrub: 1, // 1秒遅れで追従する
      start: 'top top',
      end: () => `+=${getScrollAmount()}`,
      invalidateOnRefresh: true,
    }
  });
};