// 让 rollup 认识 ts
import typescript from "rollup-plugin-typescript"
// 让 rollup 认识 JSON
import json from '@rollup/plugin-json'

// 为了将引入的 npm 包，也打包进最终结果中
import resolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'


export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/bundle.cjs.js",
      format: "cjs",
    },
    {
      file: "dist/bundle.esm.js",
      format: "es",
    }
  ],
  plugins: [
    json(),
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript"),
    }),
    commonjs(),
    resolve()
  ],
};
