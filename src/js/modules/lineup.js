/**
 * @file Lineupセクション機能モジュール
 * @description Lineupセクションにおける横スクロールアニメーション、スクロール連動型インジケーターの制御、および各アイテムの画面内進入に伴うフェードイン演出を管理します。
 */

// =========================================================================
// lineup.js (Lineupセクション用モジュール)
// =========================================================================

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { GSAP_CONFIG, BREAKPOINTS } from '../utils/constants.js';

gsap.registerPlugin(ScrollTrigger);

/**
 * Lineupセクションのアニメーションを初期化する
 * @description セクションをピン留めし、画面幅から算出した距離だけトラックを横方向へ動かすアニメーションを設定します。同時に、スクロール進捗に連動したインジケーターバーの伸縮や、横スクロール内で各アイテムが画面に入った瞬間の出現アニメーション（スケール＆ブラー解除）を実行します。
 * @returns {void}
 */
export const initLineup = () => {
  const trigger = document.querySelector('.js-lineup-trigger');
  const track = document.querySelector('.js-lineup-track');
  const items = document.querySelectorAll('.js-lineup-item');
  const progressBars = document.querySelectorAll('.js-lineup-progress');

  // 要素が存在しない場合は処理を止める
  if (!trigger || !track || items.length === 0 || progressBars.length === 0) return;

  // 左に動かす「距離」を計算する関数
  const getScrollAmount = () => track.clientWidth - window.innerWidth;

  // スクロール量（ScrollTrigger の end に設定する値）を計算
  const getScrollEnd = () => {
    // 基本のスクロール量
    const baseAmount = getScrollAmount();

    // SPの時はスクロール量を増やしてゆっくり見せる
    // 画面幅がMD（768px）未満なら2倍、以上なら1倍（そのまま）にする
    const multiplier = window.innerWidth < BREAKPOINTS.MD ? 2 : 1;
    return `+=${baseAmount * multiplier}`;
  };

  // ---------------------------------------------------
  // 横スクロールのアニメーション
  // ---------------------------------------------------
  const scrollTween = gsap.to(track, {
    x: () => -getScrollAmount(),
    ease: 'none',
    scrollTrigger: {
      trigger: trigger,
      pin: ".js-lineup-pin",
      scrub: 1,
      start: 'top top',
      end: getScrollEnd,
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
      end: getScrollEnd,
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
    scale: 0.9,
    filter: 'blur(8px)',
    autoAlpha: 0,
  };

  // .toの共通設定
  const commonTo = {
    scale: 1,
    filter: 'blur(0px)',
    autoAlpha: 1,
    duration: 1.2,
    ease: 'power2.out',
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