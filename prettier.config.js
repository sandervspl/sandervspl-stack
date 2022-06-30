module.exports = /** @type {import('prettier').Config} */ ({
  trailingComma: 'all',
  arrowParens: 'always',
  singleQuote: true,
  printWidth: 100,
  importOrder: [
    '^types$',
    '^(react|react-dom)$',
    '^next(.*)$',
    '<THIRD_PARTY_MODULES>',
    '<BLANK_LINE>',
    '^(vectors|services|hooks|queries|styles)(/.*|$)',
    '^(pages|layouts|modules|common)(/.*|$)',
    '<BLANK_LINE>',
    '^[./]',
  ],
  plugins: [require('@trivago/prettier-plugin-sort-imports')],
});
