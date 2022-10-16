module.exports = {
  ...require('@sungryeol/prettier-config'),
  plugins: [import('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
