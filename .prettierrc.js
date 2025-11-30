module.exports = {
  // Basic formatting
  arrowParens: 'avoid',
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  semi: true,
  tabWidth: 2,
  useTabs: false,
  printWidth: 80,
  endOfLine: 'lf',

  // JSX specific
  jsxSingleQuote: false,
  jsxBracketSameLine: false,

  // File specific overrides
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 120,
      },
    },
    {
      files: '*.md',
      options: {
        printWidth: 100,
        proseWrap: 'always',
      },
    },
  ],
};
