import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '@ldesign/icons',
  description: '统一图标系统 - 企业级 SVG 图标库',
  lang: 'zh-CN',
  base: '/icons/',

  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#3b82f6' }],
    ['meta', { property: 'og:title', content: '@ldesign/icons - 统一图标系统' }],
    ['meta', { property: 'og:description', content: '企业级 SVG 图标库，支持 React/Vue/Lit' }],
  ],

  themeConfig: {
    logo: '/logo.svg',

    nav: [
      { text: '指南', link: '/guide/getting-started' },
      { text: '组件', link: '/components/vue' },
      { text: '图标目录', link: '/catalog' },
      { text: '示例', link: '/examples/' },
      {
        text: '更多',
        items: [
          { text: '迁移指南', link: '/advanced/migration' },
          { text: 'API 参考', link: '/advanced/api' },
          { text: '开发指南', link: '/development/' },
        ]
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '开始',
          items: [
            { text: '介绍', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '安装', link: '/guide/installation' },
          ]
        },
        {
          text: '基础',
          items: [
            { text: '基础用法', link: '/guide/usage' },
            { text: '主题定制', link: '/guide/theming' },
            { text: '性能优化', link: '/guide/performance' },
          ]
        }
      ],
      '/components/': [
        {
          text: '组件',
          items: [
            { text: 'Vue 组件', link: '/components/vue' },
            { text: 'React 组件', link: '/components/react' },
            { text: 'Lit / Web Components', link: '/components/lit' },
          ]
        },
        {
          text: '类型和工具',
          items: [
            { text: 'TypeScript 类型', link: '/components/types' },
            { text: '工具函数', link: '/components/utils' },
          ]
        }
      ],
      '/advanced/': [
        {
          text: '高级用法',
          items: [
            { text: 'API 参考', link: '/advanced/api' },
            { text: '自定义图标', link: '/advanced/custom-icons' },
            { text: '图标字体', link: '/advanced/font-generation' },
            { text: '动态加载', link: '/advanced/dynamic-loading' },
            { text: 'SSR 支持', link: '/advanced/ssr' },
          ]
        },
        {
          text: '迁移和集成',
          items: [
            { text: '迁移指南', link: '/advanced/migration' },
            { text: '与其他库对比', link: '/advanced/comparison' },
          ]
        }
      ],
      '/examples/': [
        {
          text: '示例',
          items: [
            { text: '概览', link: '/examples/' },
            { text: 'Vue 示例', link: '/examples/vue' },
            { text: 'React 示例', link: '/examples/react' },
            { text: 'Lit 示例', link: '/examples/lit' },
            { text: '交互式演示', link: '/examples/interactive' },
          ]
        }
      ],
      '/development/': [
        {
          text: '开发',
          items: [
            { text: '开发指南', link: '/development/' },
            { text: '项目结构', link: '/development/structure' },
            { text: '构建流程', link: '/development/build' },
            { text: '添加图标', link: '/development/add-icons' },
            { text: '贡献指南', link: '/development/contributing' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ldesign/ldesign' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present LDesign Team'
    },

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/ldesign/ldesign/edit/main/packages/icons/:path',
      text: '在 GitHub 上编辑此页'
    },

    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    }
  },

  markdown: {
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    lineNumbers: true
  }
})

