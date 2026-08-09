// =========================================================================
// shop.js (Shopセクション用モジュール)
// =========================================================================

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { GSAP_CONFIG } from '../utils/constants.js';

gsap.registerPlugin(ScrollTrigger);

export const initShop = () => {
  const section = document.querySelector('.p-shop');
  const imageWrap = document.querySelector('.js-shop-image-wrap');
  const bottleImage = document.querySelector('.js-shop-image');
  const textWrap = document.querySelector('.js-shop-text');
  const magneticButton = document.querySelector('.js-magnetic-button');

  // 要素が存在しない場合は処理を止める
  if (!section || !imageWrap || !bottleImage || !textWrap || !magneticButton) return;

  // ---------------------------------------------------
  // テキストと画像の出現アニメーション
  // ---------------------------------------------------
  const commonFrom = {
    y: 60,
    autoAlpha: 0,
  };

  const commonTo = {
    y: 0,
    autoAlpha: 1,
    duration: 1.2,
    ease: GSAP_CONFIG.EASE,
  };

  // タイムラインを使って画像→テキストの順番で登場させる
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 65%',
      toggleActions: 'play none none reverse',
    }
  });

  tl.fromTo(imageWrap, {
    ...commonFrom
  }, {
    ...commonTo
  })
    .fromTo(textWrap, {
      ...commonFrom
    }, {
      ...commonTo
    },
      '-=0.8');

  // ---------------------------------------------------
  // ボトル画像アニメーション（ふわふわさせる）
  // ---------------------------------------------------
  gsap.to(bottleImage, {
    y: -15,
    duration: 2.5,
    ease: 'sine.inOut', // なめらかに加速・減速
    repeat: -1,
    yoyo: true,
  });

  // ---------------------------------------------------
  // マグネティックボタン（吸い付くボタン）
  // ---------------------------------------------------
  const mm = gsap.matchMedia();

  // マウスが使えるPC環境の時だけ実行する
  mm.add("(hover: hover) and (pointer: fine)", () => {

    // マウスがボタンの上で動いた時の処理
    magneticButton.addEventListener('mousemove', (e) => {
      const rect = magneticButton.getBoundingClientRect();

      // ボタンの「中心座標」を計算
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // マウスとボタンの中心との「距離」を計算
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // 距離の0.3倍移動させて、自然な磁力感を出す
      gsap.to(magneticButton, {
        x: distanceX * 0.3,
        y: distanceY * 0.3,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    // マウスがボタンから離れた時の処理
    magneticButton.addEventListener('mouseleave', () => {
      // 元の位置（x: 0, y: 0）に戻す
      gsap.to(magneticButton, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)' // ぽよんっと弾ませる
      });
    });
  });
};