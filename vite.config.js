import { defineConfig } from 'vite';
import stylelint from 'vite-plugin-stylelint';

export default defineConfig({
  plugins: [
    stylelint({
      fix: true, // 保存時に自動でフォーマットを直してくれるよ♡
      include: ['src/**/*.scss'],
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // 出力されるファイル名を綺麗に固定する設定だよ！
        entryFileNames: 'js/bundle.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'css/style.css';
          }
          return 'assets/[name].[ext]';
        }
      }
    }
  }
});