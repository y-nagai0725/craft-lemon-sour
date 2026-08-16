/**
 * @file FV（ファーストビュー）機能モジュール
 * @description FVセクションにおけるテキストの分割表示、SP/PCごとの登場演出、マウス連動パララックス、およびスクロール連動パララックスを管理します。
 */

// =========================================================================
// fv.js (FV機能モジュール)
// =========================================================================

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitText from 'gsap/SplitText';
import { BREAKPOINTS, GSAP_CONFIG } from '../utils/constants.js';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * FVセクションのアニメーションを初期化する
 * @description テキストを1文字ずつ分割して表示するアニメーション、画面幅（SP/PC）に応じた各要素の登場アニメーション、およびPC専用のマウス追従パララックスとスクロール連動パララックスを設定します。
 * @returns {void}
 */
export const initFv = () => {
  const fvSection = document.querySelector('.p-fv');
  const catchText = document.querySelector('.js-fv-catch');
  const titleText = document.querySelector('.js-fv-title');
  const itemWraps = document.querySelectorAll('.js-fv-item-wrap');
  const bottleItems = document.querySelectorAll('.js-fv-item-bottle');
  const mainItem = document.querySelector('.js-fv-item-main');
  const mainImage = document.querySelector('.js-fv-image-main');

  // 要素が存在しない場合は処理を止める
  if (!fvSection || !catchText || !titleText || itemWraps.length === 0 || bottleItems.length === 0 || !mainItem || !mainImage) return;

  // テキストの分割と初期表示（キャッチコピーとタイトル両方を取得）
  const splitTitle = SplitText.create([catchText, titleText], { type: 'chars' });
  const chars = splitTitle.chars;
  gsap.set([catchText, titleText], { autoAlpha: 1 });

  // 各アイテムの初期配置（中央寄せ＋回転など）
  gsap.set('.p-fv__item--bottle-rich', { xPercent: -50, yPercent: -50 });
  gsap.set('.p-fv__item--bottle-standard', { xPercent: -50, yPercent: -50, rotation: -5 });
  gsap.set('.p-fv__item--bottle-dry', { xPercent: -50, yPercent: -50, rotation: 8 });
  gsap.set('.p-fv__item--main', { xPercent: -50, yPercent: -50 });

  const mm = gsap.matchMedia();

  mm.add({
    isSp: `(width < ${BREAKPOINTS.MD}px)`,
    isPc: `(width >= ${BREAKPOINTS.MD}px)`
  }, (context) => {
    let { isSp, isPc } = context.conditions;
    const tl = gsap.timeline();

    // -----------------------------------
    // 登場アニメーション
    // -----------------------------------
    if (isSp) {
      // SP表示：下からフワッっとフェードイン
      tl.fromTo(chars, // テキストは下から入ってくる（1文字ずつ）
        {
          y: 20,
          autoAlpha: 0
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: GSAP_CONFIG.EASE
        }
      ).fromTo(itemWraps, // 画像も下からアニメーション
        {
          y: 60,
          autoAlpha: 0
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.0,
          stagger: 0.1,
          ease: GSAP_CONFIG.EASE
        },
        '-=0.4'
      );
    } else {
      // PC表示：左右からフェードイン
      tl.fromTo(chars, // テキストは左から入ってくる（1文字ずつ）
        {
          x: -20,
          autoAlpha: 0
        },
        {
          x: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.035,
          ease: GSAP_CONFIG.EASE
        }
      ).fromTo(itemWraps, // 画像たちは右からフワッと迫ってくる
        {
          x: 40,
          autoAlpha: 0
        },
        {
          x: 0,
          autoAlpha: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: GSAP_CONFIG.EASE
        },
        '-=0.4'
      );
    }

    // -----------------------------------
    // マウス連動パララックス（PCのみ）
    // -----------------------------------
    if (isPc) {
      fvSection.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth) - 0.5;
        const yPos = (e.clientY / window.innerHeight) - 0.5;

        // ボトルの動き
        bottleItems.forEach(item => {
          const speed = item.dataset.speed || 0.5;
          gsap.to(item, {
            x: xPos * 40 * speed,
            y: yPos * 40 * speed,
            duration: 0.6,
            ease: 'power1.out'
          });
        });

        // 主役のグラスは少しだけ逆に動かす
        gsap.to(mainItem, {
          x: xPos * -15,
          y: yPos * -15,
          duration: 0.8,
          ease: 'power1.out'
        });
      });
    }

    // -----------------------------------
    // スクロール連動パララックス
    // -----------------------------------
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: fvSection,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });

    // 主役のグラス
    scrollTl.to(mainImage, {
      y: -150,
      scale: 1.33,
      ease: 'none'
    }, 0);


    // 奥のボトル画像たち
    bottleItems.forEach(item => {
      const speed = item.dataset.speed || 0.5;
      const innerImage = item.querySelector('.js-fv-image-bottle');

      if (innerImage) {
        scrollTl.to(innerImage, {
          y: -150 * speed,
          ease: 'none'
        }, 0);
      }
    });

  });
};