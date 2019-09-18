import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import pkg from './package.json';

const extractPackagePeerDependencies = () =>
  Object.keys(pkg.peerDependencies) || [];

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  external: extractPackagePeerDependencies(),
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-flow',
      ],
    }),
    resolve({
      mainFields: ['module', 'main', 'jsnext', 'browser'],
    }),
    commonjs({
      sourceMap: true,
      namedExports: {
        react: ['isValidElement'],
      },
    }),
    globals(),
    builtins(),
  ],
};
