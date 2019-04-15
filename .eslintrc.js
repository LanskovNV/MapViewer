module.exports = {
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
        'jest': true
    },
    'extends': ['eslint:recommended', "plugin:react/recommended"],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': ['react'],
    'rules': {
        'accessor-pairs': 'error',
        'array-bracket-newline': 'error',
        'array-bracket-spacing': 'error',
        'array-callback-return': 'error',
        'arrow-body-style': 'error',
        'arrow-parens': [
            'error',
            'as-needed'
        ],
        'arrow-spacing': [
            'error',
            {
                'after': true,
                'before': true
            }
        ],
        'block-scoped-var': 'error',
        'block-spacing': 'error',
        'brace-style': [
            'error',
            '1tbs'
        ],
        'callback-return': 'error',
        'camelcase': 'error',
        'capitalized-comments': 'off',
        'class-methods-use-this': 'off',
        'comma-dangle': 'error',
        'comma-spacing': [
            'error',
            {
                'after': true,
                'before': false
            }
        ],
        'comma-style': 'error',
        'complexity': 'error',
        'computed-property-spacing': 'error',
        'consistent-return': 'error',
        'consistent-this': 'error',
        'curly': 'error',
        'default-case': 'error',
        'dot-location': [
            'error',
            'property'
        ],
        'dot-notation': [
            'error',
            {
                'allowKeywords': true
            }
        ],
        'eol-last': 'error',
        'eqeqeq': 'off',
        'func-call-spacing': 'error',
        'func-name-matching': 'error',
        'function-paren-newline': 'off',
        'generator-star-spacing': 'error',
        'global-require': 'error',
        'guard-for-in': 'error',
        'handle-callback-err': 'error',
        'id-blacklist': 'error',
        'id-match': 'error',
        'indent': 'off',
        'indent-legacy': 'off',
        'jsx-quotes': [
            'error',
            'prefer-double'
        ],
        'key-spacing': 'error',
        'keyword-spacing': [
            'error',
            {
                'after': true,
                'before': true
            }
        ],
        'lines-around-comment': 'error',
        'lines-around-directive': 'error',
        'lines-between-class-members': 'error',
        'max-classes-per-file': 'error',
        'max-depth': 'error',
        'max-len': 'off',
        'max-lines': 'error',
        'max-nested-callbacks': 'error',
        'max-statements-per-line': 'error',
        'new-cap': 'error',
        'new-parens': 'error',
        'newline-after-var': 'off',
        'newline-per-chained-call': 'error',
        'no-array-constructor': 'error',
        'no-async-promise-executor': 'error',
        'no-await-in-loop': 'error',
        'no-bitwise': 'error',
        'no-buffer-constructor': 'error',
        'no-caller': 'error',
        'no-catch-shadow': 'error',
        'no-continue': 'error',
        'no-div-regex': 'error',
        'no-duplicate-imports': 'error',
        'no-else-return': 'error',
        'no-empty-function': 'error',
        'no-eq-null': 'off',
        'no-eval': 'error',
        'no-extend-native': 'error',
        'no-extra-bind': 'error',
        'no-extra-label': 'error',
        'no-extra-parens': 'off',
        'no-floating-decimal': 'error',
        'no-implicit-coercion': 'error',
        'no-implicit-globals': 'error',
        'no-implied-eval': 'error',
        'no-invalid-this': 'error',
        'no-iterator': 'error',
        'no-label-var': 'error',
        'no-labels': 'error',
        'no-lone-blocks': 'error',
        'no-lonely-if': 'error',
        'no-loop-func': 'error',
        'no-magic-numbers': 'off',
        'no-misleading-character-class': 'error',
        'no-mixed-operators': 'error',
        'no-mixed-requires': 'error',
        'no-multi-assign': 'error',
        'no-multi-spaces': 'error',
        'no-multi-str': 'error',
        'no-multiple-empty-lines': 'error',
        'no-native-reassign': 'error',
        'no-negated-in-lhs': 'error',
        'no-nested-ternary': 'error',
        'no-new': 'error',
        'no-new-func': 'error',
        'no-new-object': 'error',
        'no-new-require': 'error',
        'no-new-wrappers': 'error',
        'no-octal-escape': 'error',
        'no-param-reassign': 'error',
        'no-path-concat': 'error',
        'no-plusplus': 'error',
        'no-process-env': 'off',
        'no-proto': 'error',
        'no-prototype-builtins': 'error',
        'no-restricted-globals': 'error',
        'no-restricted-imports': 'error',
        'no-restricted-modules': 'error',
        'no-restricted-properties': 'error',
        'no-restricted-syntax': 'error',
        'no-return-assign': 'error',
        'no-return-await': 'error',
        'no-script-url': 'error',
        'no-self-compare': 'error',
        'no-sequences': 'error',
        'no-shadow': 'error',
        'no-shadow-restricted-names': 'error',
        'no-spaced-func': 'error',
        'no-tabs': 'error',
        'no-template-curly-in-string': 'error',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-underscore-dangle': 'error',
        'no-unmodified-loop-condition': 'error',
        'no-unneeded-ternary': 'error',
        'no-use-before-define': 'off',
        'no-useless-call': 'error',
        'no-useless-catch': 'error',
        'no-useless-computed-key': 'error',
        'no-useless-concat': 'error',
        'no-useless-constructor': 'error',
        'no-useless-rename': 'error',
        'no-useless-return': 'error',
        'no-var': 'error',
        'no-void': 'error',
        'no-whitespace-before-property': 'error',
        'no-with': 'error',
        'nonblock-statement-body-position': 'error',
        'object-curly-newline': 'error',
        'object-curly-spacing': [
            'error',
            'always'
        ],
        'object-shorthand': 'error',
        'one-var-declaration-per-line': 'error',
        'operator-assignment': 'error',
        'operator-linebreak': 'error',
        'padded-blocks': 'off',
        'padding-line-between-statements': 'error',
        'prefer-const': 'error',
        'prefer-destructuring': 'error',
        'prefer-numeric-literals': 'error',
        'prefer-object-spread': 'error',
        'prefer-promise-reject-errors': 'error',
        'prefer-reflect': 'error',
        'prefer-rest-params': 'error',
        'prefer-spread': 'error',
        'prefer-template': 'error',
        'radix': 'error',
        'require-atomic-updates': 'error',
        'require-await': 'error',
        'require-jsdoc': 'off',
        'require-unicode-regexp': 'off',
        'rest-spread-spacing': 'error',
        'semi-spacing': 'error',
        'semi-style': [
            'error',
            'last'
        ],
        'sort-vars': 'error',
        'space-before-blocks': 'error',
        'space-before-function-paren': 'off',
        'space-in-parens': [
            'error',
            'never'
        ],
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',
        'spaced-comment': [
            'error',
            'always'
        ],
        'strict': 'error',
        'switch-colon-spacing': 'error',
        'symbol-description': 'error',
        'template-curly-spacing': [
            'error',
            'never'
        ],
        'template-tag-spacing': 'error',
        'unicode-bom': [
            'error',
            'never'
        ],
        'vars-on-top': 'error',
        'wrap-iife': 'error',
        'wrap-regex': 'error',
        'yield-star-spacing': 'error',
        'yoda': [
            'error',
            'never'
        ]
    }
const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'redux-saga', 'react', 'jsx-a11y'],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    'arrow-body-style': [2, 'as-needed'],
    'class-methods-use-this': 0,
    'comma-dangle': [2, 'always-multiline'],
    'import/imports-first': 0,
    'import/newline-after-import': 0,
    'import/no-dynamic-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'import/no-unresolved': 2,
    'import/no-webpack-loader-syntax': 0,
    'import/prefer-default-export': 0,
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
    'jsx-a11y/aria-props': 2,
    'jsx-a11y/heading-has-content': 0,
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        // NOTE: If this error triggers, either disable it or add
        // your custom components, labels and attributes via these options
        // See https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/label-has-associated-control.md
        controlComponents: ['Input'],
      },
    ],
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/mouse-events-have-key-events': 2,
    'jsx-a11y/role-has-required-aria-props': 2,
    'jsx-a11y/role-supports-aria-props': 2,
    'max-len': 0,
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-console': 1,
    'no-unused-vars': 2,
    'no-use-before-define': 0,
    'prefer-template': 2,
    'react/destructuring-assignment': 0,
    'react/jsx-closing-tag-location': 0,
    'react/forbid-prop-types': 0,
    'react/jsx-first-prop-new-line': [2, 'multiline'],
    'react/jsx-filename-extension': 0,
    'react/jsx-no-target-blank': 0,
    'react/jsx-uses-vars': 2,
    'react/require-default-props': 0,
    'react/require-extension': 0,
    'react/self-closing-comp': 0,
    'react/sort-comp': 0,
    'redux-saga/no-yield-in-race': 2,
    'redux-saga/yield-effects': 2,
    'require-yield': 0,
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './internals/webpack/webpack.prod.babel.js',
      },
    },
  },
};
