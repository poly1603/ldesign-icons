import { defineConfig } from 'rollup'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'

// 为每个框架创建独立的构建配置
const frameworks = ['vue', 'react', 'lit']

const configs = frameworks.flatMap(framework => [
  // ESM 格式
  {
    input: `src/${framework}/index.ts`,
    output: {
      file: `es/${framework}/index.js`,
      format: 'es',
      sourcemap: true,
    },
    external: ['vue', 'react', 'lit', '../types', '../utils', './IconBase'],
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false, // 类型文件已由 builder 生成
        outDir: `es/${framework}`,
      }),
    ],
  },
  // CommonJS 格式
  {
    input: `src/${framework}/index.ts`,
    output: {
      file: `lib/${framework}/index.cjs`,
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    external: ['vue', 'react', 'lit', '../types', '../utils', './IconBase'],
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: false,
        outDir: `lib/${framework}`,
      }),
    ],
  },
])

export default defineConfig(configs)


