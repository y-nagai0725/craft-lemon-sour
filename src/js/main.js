import '../scss/style.scss';
import { initScrollTop, initPageTop } from './modules/common.js';
import { initHeader } from './modules/header.js';
import { initFv } from './modules/fv.js';
import { initConcept } from './modules/concept.js';
import { initProcess } from './modules/process.js';
import { initLineup } from './modules/lineup.js';
import { initFooter } from './modules/footer.js';

// すべての読み込みと描画準備が完了したら、preloadクラスを外してアニメーションを解禁する
window.addEventListener('load', () => {
  document.body.classList.remove('preload');
});

// 処理をまとめて実行する初期化関数
const init = () => {
  initScrollTop();
  initPageTop();
  initHeader();
  initFv();
  initConcept();
  initProcess();
  initLineup();
  initFooter();
};

// 初期化を実行
init();