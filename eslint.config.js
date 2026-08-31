import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    ignores: ['dist', 'node_modules', 'coverage'],
  },
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['vite.config.js', '*.config.js'],
    languageOptions: { globals: globals.node },
  },
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  ...storybook.configs['flat/recommended'],
  {
    rules: {
      'no-unused-vars': 'warn', // 사용하지 않는 변수가 있으면 경고
      eqeqeq: 'error', // == 대신 === 사용 강제
      'react/prop-types': 'off',
    },
  },
]);
