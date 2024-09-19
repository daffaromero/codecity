module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'unused-imports'],
  extends: ['eslint:recommended', 'next', 'next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    // default
    'no-unused-vars': 'off',
    'no-console': 'warn',
    semi: ['warn', 'never'],
    quotes: ['warn', 'single', { avoidEscape: true }],

    // react
    'react/display-name': 'off',
    'react/jsx-wrap-multilines': [
      'warn',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        condition: 'parens-new-line',
        prop: 'ignore',
      },
    ],
    'react/jsx-tag-spacing': ['warn', { beforeSelfClosing: 'always' }],
    'react/jsx-closing-bracket-location': 'warn',
    'react/jsx-closing-tag-location': 'warn',
    'react/jsx-pascal-case': ['warn', { allowAllCaps: false, allowNamespace: true, allowLeadingUnderscore: false }],
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
    'react/self-closing-comp': ['error', { component: true, html: true }],

    // react hooks
    'react-hooks/exhaustive-deps': 'off',

    // @next
    '@next/next/no-img-element': 'off',

    // @typescript
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars-experimental': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/semi': 'off',

    // simple import sort
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          // ext library & side effect imports
          ['^@?\\w', '^\\u0000'],
          // {s}css files
          ['^.+\\.s?css$'],
          // other imports
          ['^@/'],
          // relative paths up until 3 level
          [
            '^\\./?$',
            '^\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\./\\.\\.(?!/?$)',
          ],
          // public imports
          ['~/'],
          // other that didn't fit in
          ['^'],
        ],
      },
    ],

    // unused-imports
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
  overrides: [
    {
      files: ['*.{jsx,tsx}'],
      extends: [
        // @see https://github.com/francoismassart/eslint-plugin-tailwindcss,
        'plugin:tailwindcss/recommended',
      ],
      rules: {
        'tailwindcss/no-custom-classname': 'off',
      },
    },
  ],
  globals: {
    React: true,
    JSX: true,
  },
}
