import { defineConfig } from '@ldesign/builder'

/**
 * @ldesign/icons 构建配置
 * @description 优化后的构建配置，启用压缩、代码分割和 Tree-shaking
 */
export default defineConfig({
  // 入口文件
  input: 'src/index.ts',

  // 输出配置
  output: {
    // 输出格式：ESM (现代浏览器/打包工具), CJS (Node.js), UMD (浏览器直接引用)
    format: ['esm', 'cjs', 'umd'],

    // ESM 输出配置
    esm: {
      dir: 'es',
      preserveStructure: true, // 保持源码目录结构，支持按需导入
    },

    // CommonJS 输出配置
    cjs: {
      dir: 'lib',
      preserveStructure: true, // 保持源码目录结构，支持按需导入
    },

    // UMD 输出配置（用于 CDN 和浏览器直接引用）
    umd: {
      dir: 'dist',
      name: 'LDesignIcons', // 全局变量名
    },
  },

  // 生成 TypeScript 类型声明文件
  dts: true,

  // 生成 source map（方便调试）
  sourcemap: true,

  // 启用代码压缩（生产环境）
  // 注意：保留ESM和CJS的可读性，仅压缩UMD版本
  minify: process.env.NODE_ENV === 'production' ? 'umd' : false,

  // 构建前清理输出目录
  clean: true,

  // 外部依赖（不打包到bundle中）
  external: [
    'vue',
    'react',
    'react-dom',
    'react/jsx-runtime',
    'lit',
    'lit/decorators.js',
    /^@ldesign\//,  // 所有 @ldesign 包
    /^lodash/,      // Lodash 相关
    /^@vue\//,      // Vue 相关
  ],

  // 构建优化选项
  optimization: {
    // 启用 Tree-shaking
    treeshake: true,

    // 代码分割策略
    codeSplitting: {
      // 自动分割大型模块
      automaticChunks: true,
      // 最小chunk大小（KB）
      minSize: 20,
    },
  },
})
