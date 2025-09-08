/** @type {import('prettier').Config} */
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,
  arrowParens: 'avoid',
  endOfLine: 'lf',
  bracketSpacing: true,
  bracketSameLine: false,
  quoteProps: 'as-needed',
  proseWrap: 'preserve',
  plugins: ['prettier-plugin-tailwindcss'],
};