import { defineConfig } from 'vitepress'

// GitHub 项目页部署在 https://fivewen.github.io/zan-docs/ 下，base 必须与仓库名一致。
// 若以后绑定自定义域名，把 base 改为 '/' 即可。
export default defineConfig({
  lang: 'zh-CN',
  title: 'Zan 前端文档',
  description: '直播小程序 SDK、H5 商城、App 对接文档与团队技术沉淀',
  base: '/zan-docs/',
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: 'local',
      options: {
        translations: {
          button: { buttonText: '搜索文档', buttonAriaLabel: '搜索文档' },
          modal: {
            noResultsText: '没有找到结果',
            resetButtonTitle: '清除查询条件',
            footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' }
          }
        }
      }
    },
    nav: [
      { text: '指南', link: '/guide/' },
      { text: '直播小程序 SDK', link: '/live-sdk/' },
      { text: 'H5 商城对接', link: '/h5-mall/' },
      { text: 'App 对接', link: '/app/' },
      { text: '团队技术', link: '/team/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [{ text: '总览', link: '/guide/' }]
        }
      ],
      '/live-sdk/': [
        {
          text: '直播小程序 SDK',
          items: [
            { text: '概述与快速开始', link: '/live-sdk/' },
            { text: 'API 说明', link: '/live-sdk/api' },
            { text: '常见问题', link: '/live-sdk/faq' },
            { text: '更新日志', link: '/live-sdk/changelog' }
          ]
        }
      ],
      '/h5-mall/': [
        {
          text: 'H5 商城对接',
          items: [
            { text: '概述与快速开始', link: '/h5-mall/' },
            { text: 'API 说明', link: '/h5-mall/api' },
            { text: '常见问题', link: '/h5-mall/faq' },
            { text: '更新日志', link: '/h5-mall/changelog' }
          ]
        }
      ],
      '/app/': [
        {
          text: 'App 对接',
          items: [
            { text: '概述与快速开始', link: '/app/' },
            { text: 'API 说明', link: '/app/api' },
            { text: '常见问题', link: '/app/faq' },
            { text: '更新日志', link: '/app/changelog' }
          ]
        }
      ],
      '/team/': [
        {
          text: '团队技术',
          items: [
            { text: '总览', link: '/team/' },
            { text: '工程规范', link: '/team/standards' },
            { text: '技术分享', link: '/team/sharing' },
            { text: '工具链', link: '/team/toolchain' }
          ]
        }
      ]
    },
    outline: { level: [2, 3], label: '本页目录' },
    docFooter: { prev: '上一篇', next: '下一篇' },
    lastUpdated: { text: '最后更新于' },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    socialLinks: [{ icon: 'github', link: 'https://github.com/FiveWen/zan-docs' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Sesun Frontend Team'
    }
  }
})
