/**
 * @type {import('prettier').Config}
 */
module.exports = {
  arrowParens: 'always',
  singleQuote: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  semi: false,
  printWidth: 120,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  singleAttributePerLine: true,
  endOfLine: 'lf',
  useTabs: false,
  plugins: [require('prettier-plugin-tailwindcss')],
}
