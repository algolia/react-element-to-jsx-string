import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import flow from 'rollup-plugin-flow';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/cjs/bundle.js',
    format: 'cjs',
  },
  sourcemap: true,
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**', // only transpile our source code
      presets: [
        [
          'es2015',
          {
            modules: false,
          },
        ],
        'stage-2',
        'react',
        'flow',
      ],
      plugins: ['external-helpers'],
      externalHelpers: true,
    }),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs({
      sourceMap: true,
      namedExports: {
        react: ['isValidElement'],
      },
    }),
    globals(),
    builtins(),
    flow(),
  ],
};
