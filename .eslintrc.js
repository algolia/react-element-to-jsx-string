module.exports = {
  extends: ['algolia', 'algolia/jest' /*, 'algolia/flow'*/],
  overrides: [
    {
      files: ['*.spec.js'],
      env: {
        jest: true,
      },
    },
  ],
};
