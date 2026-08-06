// =========================================================================
// lineup.js (Lineupセクション用モジュール)
// =========================================================================

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { GSAP_CONFIG } from '../utils/constants.js';

gsap.registerPlugin(ScrollTrigger);

export const initLineup = () => {
  const trigger = document.querySelector('.js-lineup-trigger');
  const track = document.querySelector('.js-lineup-track');
  const items = document.querySelectorAll('.js-lineup-item');
  const progressBars = document.querySelectorAll('.js-lineup-progress');

  // 要素が存在しない場合は処理を止める
  if (!trigger || !track || items.length === 0 || progressBars.length === 0) return;

  // 左に動かす「距離」を計算する関数
  const getScrollAmount = () => track.clientWidth - window.innerWidth;

  // ---------------------------------------------------
  // 横スクロールのアニメーション
  // ---------------------------------------------------
  const scrollTween = gsap.to(track, {
    x: () => -getScrollAmount(),
    ease: 'none',
    scrollTrigger: {
      trigger: trigger,
      pin: ".js-lineup-pin",
      scrub: 1, // 1秒遅れで追従する
      start: 'top top',
      end: () => `+=${getScrollAmount()}`,
      invalidateOnRefresh: true,
    }
  });

  // ---------------------------------------------------
  // インジケーターのアニメーション
  // ---------------------------------------------------

  // 横スクロールに連動するタイムラインを作成
  const progressTl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger,
      start: 'top top',
      end: () => `+=${getScrollAmount()}`,
      scrub: 1,
      invalidateOnRefresh: true,
    }
  });

  // 取得したバーを、順番に scaleX: 1 (100%) にしていく
  progressBars.forEach((bar) => {
    progressTl.to(bar, {
      scaleX: 1,
      ease: 'none', // スクロール量に比例させるために 'none' にする
    });
  });

  // ---------------------------------------------------
  // 各アイテムを順番に表示させる
  // ---------------------------------------------------

  // .fromの共通設定
  const commonFrom = {
    y: 60,
    autoAlpha: 0,
  };

  // .toの共通設定
  const commonTo = {
    y: 0,
    autoAlpha: 1,
    duration: 1.0,
    ease: GSAP_CONFIG.EASE,
  };

  items.forEach((item, index) => {
    const itemImage = item.querySelector(".js-lineup-image"); // アイテム内の画像要素
    if (index === 0) {
      // 最初のアイテムは、「縦スクロール」で発火させる
      gsap.fromTo(item,
        {
          ...commonFrom,
        },
        {
          ...commonTo,
          scrollTrigger: {
            trigger: itemImage,
            start: 'top 65%',
            toggleActions: 'play none none reverse',
          }
        }
      );
    } else {
      // 2番目以降のアイテムは、「横スクロール」に連動させて発火させる
      gsap.fromTo(item,
        {
          ...commonFrom,
        },
        {
          ...commonTo,
          scrollTrigger: {
            trigger: itemImage,
            containerAnimation: scrollTween, // 横スクロールと連動
            start: 'left 80%', // 右から入ってきたら発火
            toggleActions: 'play none none reverse',
          }
        }
      );
    }
  });
};