module.exports = {
  extends: ['airbnb', 'airbnb-typescript', 'prettier'],

  parserOptions: {
    project: './tsconfig.eslint.json',
  },

  env: {
    es6: true,
  },

  settings: {
    react: {
      version: 'detect',
    },
  },

  rules: {
    'import/no-cycle': 'off', // TODO: We have to fix our cycle issue before being able to activate it again
    'no-underscore-dangle': 'off',
    'prefer-destructuring': 'off',
    'react/jsx-fragments': 'off',
  },

  overrides: [
    {
      files: ['*.spec.js'],
      env: {
        jest: true,
      },
    },
  ],
};
