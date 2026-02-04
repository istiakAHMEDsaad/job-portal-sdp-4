import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': 'off', // backend uses console
      'no-undef': 'error',

      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'default-case': 'warn',

      'no-empty': 'warn',
      'no-fallthrough': 'error',
      'no-implicit-coercion': 'error',

      'consistent-return': 'warn',
    },
  },
];
