function getVueAdminNextSidebar(groups = []) {
  return [
    {
      title: groups[0],
      collapsable: false,
      sidebarDepth: 0,
      children: ['intro', 'faq'],
    },
    {
      title: groups[1],
      collapsable: false,
      children: [
        'guide/start',
        'guide/dataflow',
        'guide/user',
        'guide/plugin',
        'guide/layout',
        'guide/navigation',
        'guide/router',
        'guide/module-files',
        'guide/form',
        'guide/table',
        'guide/practice',
        'guide/theme',
        'guide/deploy',
      ],
    },
    {
      title: groups[2],
      collapsable: false,
      children: ['api/component'],
    },
  ]
}

module.exports = {
  base: '/docs/',
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'FEXT Docs',
      description:
        'Next-generation front-end development technologies in action',
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'FEXT Docs',
      description: '下一代前端开发技术实战',
    },
  },

  themeConfig: {
    logo: '/images/logo.png',

    repo: 'https://github.com/openfext/docs',
    repoLabel: 'Github',
    docsDir: 'docs',
    lastUpdated: true,
    editLinks: true,
    smoothScroll: true,
    displayAllHeaders: true,

    locales: {
      '/': {
        editLinkText: 'Edit this page on GitHub',
        selectText: 'Languages',
        label: 'English',
        serviceWorker: {
          updatePopup: {
            message: 'New content is available.',
            buttonText: 'Refresh',
          },
        },
        nav: [
          {
            text: 'Vue Admin Next',
            link: '/vue-admin-next/intro.html',
          },
          { text: 'FEXT', link: 'https://github.com/openfext' },
        ],
        // sidebarDepth: 1,
        // sidebar: {
        //   '/vue-admin-next/': getVueAdminNextSidebar([
        //     'Introduction',
        //     'Guide',
        //     'API Reference',
        //   ]),
        // },
      },
      '/zh/': {
        editLinkText: '在 GitHub 上编辑此页',
        selectText: '选择语言',
        label: '简体中文',
        serviceWorker: {
          updatePopup: {
            message: '站点内容有更新',
            buttonText: '刷新',
          },
        },
        nav: [
          {
            text: 'Vue Admin Next',
            link: '/zh/vue-admin-next/intro.html',
          },
          { text: 'FEXT', link: 'https://github.com/openfext' },
        ],
        sidebarDepth: 1,
        sidebar: {
          '/zh/vue-admin-next/': getVueAdminNextSidebar([
            '介绍',
            '指南',
            'API Reference',
          ]),
        },
      },
    },
  },

  plugins: [
    ['@vuepress/active-header-links', true],
    ['@vuepress/back-to-top', true],
    ['@vuepress/medium-zoom', true],
    ['@vuepress/nprogress', true],
    ['@vuepress/register-components', true],
    [
      '@vuepress/search',
      {
        searchMaxSuggestions: 10,
      },
    ],
  ],
}
