import { defineConfig } from 'vitepress'

/**
 * 中文分词器：用于本地全文搜索的索引与查询。
 *
 * 说明：
 * - 使用 Intl.Segmenter 按中文词语切分，避免整段中文被当成一个词。
 * - 该函数会被 VitePress 序列化到浏览器端，因此不能引用外部变量。
 * - 旧浏览器不支持 Intl.Segmenter 时，退化为按标点/空白切分。
 */
function tokenize(text: string): string[] {
  const normalized = String(text).toLowerCase()

  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' })
    const tokens: string[] = []
    for (const part of segmenter.segment(normalized)) {
      if (part.isWordLike) tokens.push(part.segment)
    }
    return tokens
  }

  return normalized.split(/[^\p{L}\p{N}]+/u).filter(Boolean)
}

export default defineConfig({
  lang: 'zh-CN',
  title: 'BanLson 知识库',
  description: 'BanLson 的个人知识库，记录学习笔记、工具使用与实践案例。',
  base: '/',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ['meta', { name: 'author', content: 'BanLson' }],
    ['meta', { name: 'theme-color', content: '#2f6f5e' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'BanLson 知识库' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'BanLson 的个人知识库，记录学习笔记、工具使用与实践案例。'
      }
    ]
  ],

  lastUpdated: true,
  cleanUrls: false,
  sitemap: {
    hostname: 'https://banlson.github.io/'
  },

  markdown: {
    lineNumbers: false,
    image: {
      lazyLoading: true
    }
  },

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'BanLson 知识库',

    nav: [
      { text: '首页', link: '/' },
      { text: '学习笔记', link: '/notes/', activeMatch: '^/notes/' },
      { text: '工具使用', link: '/tools/', activeMatch: '^/tools/' },
      { text: '实践案例', link: '/cases/', activeMatch: '^/cases/' },
      { text: '维护指南', link: '/guide/maintenance', activeMatch: '^/guide/' }
    ],

    sidebar: {
      '/notes/': [
        {
          text: '学习笔记',
          items: [
            { text: '分类说明', link: '/notes/' },
            {
              text: 'Pi（命令行 AI 编程 Agent）教程整理 · Windows 版',
              link: '/notes/pi-agent-tutorial-windows'
            },
            {
              text: '示例：用四步法整理主题笔记',
              link: '/notes/example-study-note'
            }
          ]
        }
      ],
      '/tools/': [
        {
          text: '工具使用',
          items: [
            { text: '分类说明', link: '/tools/' },
            {
              text: '示例：启用本地全文搜索',
              link: '/tools/example-local-search'
            }
          ]
        }
      ],
      '/cases/': [
        {
          text: '实践案例',
          items: [
            { text: '分类说明', link: '/cases/' },
            {
              text: '示例：文档型知识库搭建流程',
              link: '/cases/example-knowledge-base'
            }
          ]
        }
      ],
      '/guide/': [
        {
          text: '维护指南',
          items: [{ text: '站点维护说明', link: '/guide/maintenance' }]
        }
      ]
    },

    outline: {
      level: [2, 3],
      label: '本页目录'
    },

    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索知识库'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '清除查询条件',
            backButtonTitle: '返回',
            noResultsText: '没有找到相关内容',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
              selectKeyAriaLabel: '回车键',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeKeyAriaLabel: 'Esc 键'
            }
          }
        },
        miniSearch: {
          options: {
            tokenize
          },
          searchOptions: {
            fuzzy: 0.15,
            prefix: true,
            boost: {
              title: 4,
              text: 2,
              titles: 1
            }
          }
        }
      }
    },

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/BanLson/BanLson.github.io',
        ariaLabel: 'BanLson 的 GitHub 仓库'
      }
    ],

    editLink: {
      pattern:
        'https://github.com/BanLson/BanLson.github.io/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最后更新'
    },

    darkModeSwitchLabel: '外观',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '目录',
    returnToTopLabel: '回到顶部',
    skipToContentLabel: '跳到正文',

    footer: {
      message: '以 Markdown 记录，持续整理，方便回看。',
      copyright: '© 2026 BanLson'
    }
  }
})
