import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

const extractExternals = () => [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  input: 'src/index.ts',
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
  external: extractExternals(),
  plugins: [
    typescript(),
    // babel({
    //   babelrc: false,
    //   exclude: 'node_modules/**',
    //   presets: [
    //     '@babel/preset-env',
    //     '@babel/preset-react',
    //     '@babel/preset-typescript',
    //   ],
    // }),
    resolve({
      mainFields: ['module', 'main', 'jsnext', 'browser'],
    }),
    globals(),
    builtins(),
  ],
};

export default config;
