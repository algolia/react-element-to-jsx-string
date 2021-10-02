module.exports = {
  extends: ['airbnb-typescript', 'prettier'],

  parserOptions: {
    project: './tsconfig.eslint.json',
  },

  // ecmaFeatures: {
  //   jsx: true,
  // },

  env: {
    es6: true,
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  // rules: {
  //   'max-params': ['error', 10],
  //   'no-warning-comments': 'error',

  //   'import/no-commonjs': 'off',
  // },

  overrides: [
    {
      files: ['*.spec.js'],
      env: {
        jest: true,
      },
    },
  ],
};
