import '../scss/style.scss';
import { initHeader } from './modules/header.js';

// すべての読み込みと描画準備が完了したら、preloadクラスを外してアニメーションを解禁する
window.addEventListener('load', () => {
  document.body.classList.remove('preload');
});

// 処理をまとめて実行する初期化関数
const init = () => {
  initHeader();
};

// 初期化を実行
init();