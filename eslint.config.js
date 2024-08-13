import globals from 'globals';
import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                ...globals.browser,
            },
        },
        ignores: ['lib/'],
        rules: {
            'no-else-return': 'error',
            'no-empty': 'error',
            'no-empty-function': 'error',
            'no-empty-static-block': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            'sort-imports': 'error',
            'strict': 'error',
            'no-console': 'error',
            'no-debugger': 'error',
            'no-eval': 'error',
            'semi': 'error',
            'eqeqeq': 'error',
            'indent': ['error', 4],
            'quotes': ['error', 'single'],
            'no-multi-spaces': ['error'],
            'no-trailing-spaces': ['error'],
        }
    }
];