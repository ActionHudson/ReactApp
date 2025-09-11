import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import storybook from 'eslint-plugin-storybook';
import globals from 'globals';

export default [
    { ignores: [ 'dist', 'storybook-static' ] },
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module'
            }
        },
        settings: {
            react: { version: '18.3' },
            'import/resolver': {
                node: {
                    extensions: [ '.js', '.jsx' ]
                }
            }
        },
        plugins: {
            react: reactPlugin,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            import: importPlugin
        },
        rules: {
            ...js.configs.recommended.rules,
            ...reactPlugin.configs.recommended.rules,
            ...reactPlugin.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            'react/jsx-no-target-blank': 'off',
            'react-refresh/only-export-components': [ 'warn', { allowConstantExport: true } ],
            curly: [ 'error', 'all' ],
            indent: [ 'error', 4, { SwitchCase: 1 } ],
            'array-bracket-newline': [ 'error', 'consistent' ],
            'array-bracket-spacing': [ 'error', 'always', { singleValue: false } ],
            'array-element-newline': [ 'error', 'consistent' ],
            'arrow-parens': [ 'error', 'as-needed' ],
            'arrow-spacing': [ 'error', { before: true, after: true } ],
            'block-spacing': [ 'error', 'always' ],
            'brace-style': [ 'error', '1tbs', { allowSingleLine: true } ],
            'comma-dangle': [ 'error', 'never' ],
            'comma-spacing': [ 'error', { before: false, after: true } ],
            'comma-style': [ 'error', 'last' ],
            'computed-property-spacing': [ 'error', 'never' ],
            'eol-last': [ 'error', 'always' ],
            'func-call-spacing': [ 'error', 'never' ],
            'function-call-argument-newline': [ 'error', 'consistent' ],
            'function-paren-newline': [ 'error', 'consistent' ],
            'implicit-arrow-linebreak': [ 'error', 'beside' ],
            'key-spacing': [ 'error', { beforeColon: false, afterColon: true } ],
            'keyword-spacing': [ 'error', { before: true, after: true } ],
            'line-comment-position': [ 'error', { position: 'above', ignorePattern: 'px' } ],
            'lines-around-comment': [
                'error',
                {
                    beforeBlockComment: true,
                    beforeLineComment: true,
                    allowBlockStart: true
                }
            ],
            'lines-between-class-members': [ 'error', 'always' ],
            'max-len': [ 1, { code: 80 } ],
            'max-statements-per-line': [ 'error', { max: 1 } ],
            'new-parens': 'error',
            'no-confusing-arrow': 'warn',
            'no-extra-parens': [ 'error', 'all', { ignoreJSX: 'all' } ],
            'no-extra-semi': 'warn',
            'no-floating-decimal': 'error',
            'no-mixed-spaces-and-tabs': [ 'error', 'smart-tabs' ],
            'no-multi-spaces': [ 'error', { ignoreEOLComments: true } ],
            'no-tabs': 'error',
            'no-trailing-spaces': [ 'error', { ignoreComments: true } ],
            'no-whitespace-before-property': 'error',
            'nonblock-statement-body-position': [
                'error',
                'beside',
                { overrides: { while: 'below' } }
            ],
            'object-curly-spacing': [ 'error', 'always' ],
            semi: [ 'error', 'always' ],
            'semi-spacing': 'error',
            'semi-style': [ 'error', 'last' ],
            'space-before-blocks': 'error',
            'space-before-function-paren': 'error',
            'space-infix-ops': 'error',
            'space-unary-ops': 'error',
            'spaced-comment': [ 'error', 'always', { exceptions: ['!'] } ],
            'switch-colon-spacing': 'error',
            'template-curly-spacing': [ 'error', 'always' ],
            'template-tag-spacing': 'error',
            'wrap-iife': [ 'error', 'outside' ],
            'wrap-regex': 'error',
            'yield-star-spacing': [ 'error', 'both' ],
            'react/require-default-props': [
                'error',
                { functions: 'defaultArguments', forbidDefaultForRequired: true }
            ],
            'react/react-in-jsx-scope': 'off',
            'array-callback-return': 'error',
            'for-direction': 'error',
            'getter-return': 'error',
            'no-async-promise-executor': 'error',
            'no-await-in-loop': 'error',
            'no-class-assign': 'error',
            'no-compare-neg-zero': 'error',
            'no-cond-assign': 'error',
            'no-const-assign': 'error',
            'no-constant-binary-expression': 'error',
            'no-constant-condition': 'error',
            'no-constructor-return': 'error',
            'no-control-regex': 'error',
            'no-debugger': 'error',
            'no-dupe-args': 'error',
            'no-dupe-class-members': 'error',
            'no-dupe-else-if': 'error',
            'no-dupe-keys': 'error',
            'no-duplicate-case': 'error',
            'no-duplicate-imports': 'error',
            'no-empty-character-class': 'error',
            'no-empty-pattern': 'error',
            'no-ex-assign': 'error',
            'no-fallthrough': 'error',
            'no-func-assign': 'error',
            'no-import-assign': 'error',
            'no-invalid-regexp': 'error',
            'no-irregular-whitespace': 'error',
            'no-loss-of-precision': 'error',
            'no-misleading-character-class': 'error',
            'no-new-native-nonconstructor': 'error',
            'no-obj-calls': 'error',
            'no-promise-executor-return': 'error',
            'no-prototype-builtins': 'error',
            'no-self-assign': 'error',
            'no-self-compare': 'error',
            'no-setter-return': 'error',
            'no-sparse-arrays': 'error',
            'no-this-before-super': 'error',
            'no-undef': 'error',
            'no-unexpected-multiline': 'error',
            'no-unmodified-loop-condition': 'error',
            'no-unreachable': 'error',
            'no-unreachable-loop': 'error',
            'no-unsafe-finally': 'error',
            'no-unsafe-negation': 'error',
            'no-unsafe-optional-chaining': 'error',
            'no-unused-vars': 'error',
            'no-use-before-define': 'error',
            'no-useless-backreference': 'error',
            'require-atomic-updates': 'error',
            'use-isnan': 'error',
            'valid-typeof': 'error',
            'accessor-pairs': 'error',
            'arrow-body-style': [ 'error', 'as-needed' ],
            'block-scoped-var': 'error',
            'class-methods-use-this': 'error',
            'consistent-return': 'error',
            'consistent-this': [ 'error', 'that' ],
            'default-case': 'error',
            'default-case-last': 'error',
            'default-param-last': 'error',
            'dot-notation': 'error',
            eqeqeq: 'error',
            'no-inner-declarations': 'error',
            'grouped-accessor-pairs': 'error',
            'guard-for-in': 'error',
            'id-denylist': [ 'error', 'callback' ],
            'init-declarations': [ 'error', 'always' ],
            'logical-assignment-operators': [ 'error', 'always' ],
            'no-alert': 'warn',
            'no-console': 'warn',
            'no-array-constructor': 'error',
            'no-bitwise': 'error',
            'no-caller': 'error',
            'no-case-declarations': 'error',
            'no-continue': 'error',
            'no-delete-var': 'error',
            'no-div-regex': 'error',
            'no-else-return': 'error',
            'no-empty': 'error',
            'no-empty-function': 'error',
            'no-empty-static-block': 'error',
            'no-eq-null': 'error',
            'no-eval': 'error',
            'react/prop-types': 'error',
            'sort-imports': [
                'error',
                {
                    ignoreCase: true,
                    ignoreDeclarationSort: true,
                    ignoreMemberSort: false,
                    memberSyntaxSortOrder: [ 'none', 'all', 'multiple', 'single' ]
                }
            ],
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin',
                        'external',
                        'internal',
                        'parent',
                        'sibling',
                        'index',
                        'object',
                        'type'
                    ],
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true
                    },
                    'newlines-between': 'always'
                }
            ],
            'no-redeclare': 'error',
            'no-shadow': 'error',
            'no-unused-private-class-members': 'error',
            'no-useless-escape': 'error',
            'prefer-const': 'error',
            'prefer-destructuring': 'error',
            'prefer-template': 'error',
            'no-multiple-empty-lines': [ 'error', { max: 1, maxEOF: 0, maxBOF: 0 } ],
            'react/jsx-curly-brace-presence': 'error',
            'react/jsx-curly-newline': 'error',
            'react/jsx-curly-spacing': [ 'error', { when: 'always', children: true } ],
            'react/jsx-equals-spacing': [ 'error', 'never' ],
            'react/jsx-first-prop-new-line': [ 'error', 'multiline-multiprop' ],
            'react/jsx-indent': [ 'error', 4 ],
            'react/jsx-indent-props': [ 'error', 4 ],
            'react/jsx-max-props-per-line': [ 'error', { maximum: 1, when: 'multiline' } ],
            'react/jsx-one-expression-per-line': [ 'error', { allow: 'literal' } ],
            'react/jsx-pascal-case': 'error',
            'react/jsx-props-no-multi-spaces': 'error',
            'react/jsx-tag-spacing': [ 'error', { beforeSelfClosing: 'always' } ],
            'react/jsx-wrap-multilines': [
                'error',
                {
                    return: 'parens-new-line',
                    arrow: 'parens'
                }
            ]
        }
    }
];
