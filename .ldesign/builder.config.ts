import { defineConfig } from '@ldesign/builder'

export default defineConfig({
  // 多入口配置 - 构建所有源文件
  input: [
    'src/**/*.ts',
    'src/**/*.tsx',
  ],
  
  // 输出配置
  output: {
    esm: {
      dir: 'es',
      format: 'esm',
      preserveStructure: true,  // 保持目录结构
      sourcemap: true,
      dts: true,
    },
    cjs: {
      dir: 'lib',
      format: 'cjs',
      preserveStructure: true,  // 保持目录结构
      sourcemap: true,
      dts: true,
    },
  },
  
  // 外部依赖
  external: [
    'vue',
    'react',
    'react/jsx-runtime',
    'lit',
    'lit/decorators.js',
    '@ldesign/shared',
  ],
  
  // 清理输出目录
  clean: true,
  
  // 生产模式
  mode: 'production',
})
